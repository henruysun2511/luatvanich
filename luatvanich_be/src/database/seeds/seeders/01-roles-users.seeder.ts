import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../../modules/roles/entities/role.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { DEFAULT_ROLE_DEFINITIONS, SYSTEM_ROLES } from '../../../common/constants/role.constant';

export async function seedRolesAndUsers(dataSource: DataSource): Promise<{
  savedRoles: Record<string, Role>;
  adminUser: User;
  lawyerUsers: Record<string, User>;
}> {
  console.log('  📌 [1/8] Bắt đầu seed Roles và Users...');
  const roleRepo = dataSource.getRepository(Role);
  const userRepo = dataSource.getRepository(User);

  // 1. Roles
  const savedRoles: Record<string, Role> = {};
  for (const roleDef of DEFAULT_ROLE_DEFINITIONS) {
    let role = await roleRepo.findOne({ where: { code: roleDef.code } });
    if (!role) {
      role = roleRepo.create(roleDef);
      await roleRepo.save(role);
      console.log(`    + Đã tạo role: ${roleDef.name} (${roleDef.code})`);
    } else {
      // Cập nhật lại permissions nếu có thay đổi
      role.name = roleDef.name;
      role.permissions = roleDef.permissions;
      await roleRepo.save(role);
    }
    savedRoles[roleDef.code] = role;
  }

  // 2. Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@luatvanich.vn';
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@2026!';

  let admin = await userRepo.findOne({ where: { email: adminEmail } });
  if (!admin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    admin = userRepo.create({
      email: adminEmail,
      username: adminUsername,
      fullName: 'Super Admin',
      passwordHash,
      roleId: savedRoles[SYSTEM_ROLES.SUPERADMIN].id,
      isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    });
    await userRepo.save(admin);
    console.log(`    + Đã tạo admin: ${adminUsername} (${adminEmail})`);
  } else {
    admin.username = adminUsername;
    if (!admin.avatarUrl) {
      admin.avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
    }
    await userRepo.save(admin);
    console.log(`    = Admin đã tồn tại: ${admin.username} (${admin.email})`);
  }

  // 3. Tài khoản luật sư để liên kết đăng bài / xử lý lead
  const lawyerUsers: Record<string, User> = {};
  const lawyerAccounts = [
    { email: 'lingchen@wanyimail.com', username: 'lingchen', fullName: 'Lăng Thần (Ling Chen)' },
    { email: 'liuai@wanyimail.com', username: 'liuai', fullName: 'Liễu Ái (Liu Ai)' },
    { email: 'chinh.le@luatvanich.vn', username: 'lechinh', fullName: 'Lê Chí Chinh' },
  ];

  for (const acc of lawyerAccounts) {
    let user = await userRepo.findOne({ where: { email: acc.email } });
    if (!user) {
      const passwordHash = await bcrypt.hash('Lawyer@2026!', 12);
      user = userRepo.create({
        email: acc.email,
        username: acc.username,
        fullName: acc.fullName,
        passwordHash,
        roleId: savedRoles[SYSTEM_ROLES.EDITOR]?.id || savedRoles[SYSTEM_ROLES.ADMIN]?.id,
        isActive: true,
      });
      await userRepo.save(user);
      console.log(`    + Đã tạo tài khoản chuyên viên/luật sư: ${acc.username}`);
    }
    lawyerUsers[acc.email] = user;
  }

  return { savedRoles, adminUser: admin, lawyerUsers };
}
