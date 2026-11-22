/**
 * Seed script: Tạo dữ liệu khởi tạo cho database.
 * Chạy: npm run seed
 *
 * Thứ tự:
 * 1. Roles + Permissions (từ DEFAULT_ROLE_DEFINITIONS)
 * 2. Admin user mặc định
 */
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Role } from '../../modules/users/entities/role.entity';
import { User } from '../../modules/users/entities/user.entity';
import { DEFAULT_ROLE_DEFINITIONS, SYSTEM_ROLES } from '../../common/constants/role.constant';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'luatvanich',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  entities: [Role, User],
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: true, // Seed chạy synchronize để tạo bảng nếu chưa có
});

async function seed() {
  console.log('🌱 Bắt đầu seed dữ liệu...\n');

  await AppDataSource.initialize();
  const roleRepo = AppDataSource.getRepository(Role);
  const userRepo = AppDataSource.getRepository(User);

  // ── Roles ────────────────────────────────────────────────────────────────
  const savedRoles: Record<string, Role> = {};
  for (const roleDef of DEFAULT_ROLE_DEFINITIONS) {
    let role = await roleRepo.findOne({ where: { code: roleDef.code } });
    if (!role) {
      role = roleRepo.create(roleDef);
      await roleRepo.save(role);
      console.log(`  ✅ Tạo role: ${roleDef.name}`);
    } else {
      console.log(`  ⏭  Role đã tồn tại: ${roleDef.name}`);
    }
    savedRoles[roleDef.code] = role;
  }

  // ── Admin User ────────────────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@luatvanich.vn';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@2026!';

  let admin = await userRepo.findOne({ where: { email: adminEmail } });
  if (!admin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    admin = userRepo.create({
      email: adminEmail,
      fullName: 'Super Admin',
      passwordHash,
      roleId: savedRoles[SYSTEM_ROLES.SUPERADMIN].id,
      isActive: true,
    });
    await userRepo.save(admin);
    console.log(`\n  ✅ Tạo admin: ${adminEmail} / ${adminPassword}`);
    console.log('  ⚠️  Hãy đổi mật khẩu ngay sau khi đăng nhập lần đầu!\n');
  } else {
    console.log(`\n  ⏭  Admin đã tồn tại: ${adminEmail}`);
  }

  await AppDataSource.destroy();
  console.log('\n✅ Seed hoàn tất!');
}

seed().catch((err) => {
  console.error('❌ Seed thất bại:', err);
  process.exit(1);
});
