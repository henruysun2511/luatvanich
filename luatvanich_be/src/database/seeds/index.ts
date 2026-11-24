/**
 * Script điều phối Seed dữ liệu tổng thể cho toàn bộ các module trong hệ thống Luật Vạn Ích.
 * Chạy lệnh: npm run seed
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Import Entities
import { Role } from '../../modules/roles/entities/role.entity';
import { User } from '../../modules/users/entities/user.entity';
import { Office } from '../../modules/offices/entities/office.entity';
import { OfficeTranslation } from '../../modules/offices/entities/office-translation.entity';
import { PracticeArea } from '../../modules/practice-areas/entities/practice-area.entity';
import { PracticeAreaTranslation } from '../../modules/practice-areas/entities/practice-area-translation.entity';
import { LegalService } from '../../modules/legal-services/entities/legal-service.entity';
import { LegalServiceTranslation } from '../../modules/legal-services/entities/legal-service-translation.entity';
import { Lawyer } from '../../modules/lawyers/entities/lawyer.entity';
import { LawyerTranslation } from '../../modules/lawyers/entities/lawyer-translation.entity';
import { LawyerPracticeArea } from '../../modules/lawyers/entities/lawyer-practice-area.entity';
import { LawyerLanguage } from '../../modules/lawyers/entities/lawyer-language.entity';
import { LawyerCredential } from '../../modules/lawyers/entities/lawyer-credential.entity';
import { LawyerCredentialTranslation } from '../../modules/lawyers/entities/lawyer-credential-translation.entity';
import { PostCategory } from '../../modules/posts/entities/post-category.entity';
import { PostCategoryTranslation } from '../../modules/posts/entities/post-category-translation.entity';
import { Post } from '../../modules/posts/entities/post.entity';
import { PostTranslation } from '../../modules/posts/entities/post-translation.entity';
import { Tag } from '../../modules/posts/entities/tag.entity';
import { TagTranslation } from '../../modules/posts/entities/tag-translation.entity';
import { PostTag } from '../../modules/posts/entities/post-tag.entity';
import { PostService } from '../../modules/posts/entities/post-service.entity';
import { ConsultationRequest } from '../../modules/consultations/entities/consultation-request.entity';
import { ConsultationAttachment } from '../../modules/consultations/entities/consultation-attachment.entity';
import { ConsultationNote } from '../../modules/consultations/entities/consultation-note.entity';
import { Notification } from '../../modules/notifications/entities/notification.entity';

// Import Seeders
import { seedRolesAndUsers } from './seeders/01-roles-users.seeder';
import { seedOffices } from './seeders/02-offices.seeder';
import { seedPracticeAreas } from './seeders/03-practice-areas.seeder';
import { seedLegalServices } from './seeders/04-services.seeder';
import { seedLawyers } from './seeders/05-lawyers.seeder';
import { seedPostsAndCategories } from './seeders/06-posts.seeder';
import { seedConsultations } from './seeders/07-consultations.seeder';
import { seedNotifications } from './seeders/08-notifications.seeder';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'luatvanich',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  entities: [
    Role,
    User,
    Office,
    OfficeTranslation,
    PracticeArea,
    PracticeAreaTranslation,
    LegalService,
    LegalServiceTranslation,
    Lawyer,
    LawyerTranslation,
    LawyerPracticeArea,
    LawyerLanguage,
    LawyerCredential,
    LawyerCredentialTranslation,
    PostCategory,
    PostCategoryTranslation,
    Post,
    PostTranslation,
    Tag,
    TagTranslation,
    PostTag,
    PostService,
    ConsultationRequest,
    ConsultationAttachment,
    ConsultationNote,
    Notification,
  ],
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: false, // Dùng false trên production/cloud để bảo toàn schema
});

async function main() {
  console.log('================================================================');
  console.log('🚀 Bắt đầu quá trình Migrate & Seed dữ liệu Hệ thống Luật Vạn Ích');
  console.log('================================================================\n');

  const startTime = Date.now();
  await AppDataSource.initialize();
  console.log('✅ Đã kết nối cơ sở dữ liệu thành công.\n');

  try {
    // 1. Roles & Users
    const { savedRoles, adminUser, lawyerUsers } = await seedRolesAndUsers(AppDataSource);

    // 2. Offices
    const officesMap = await seedOffices(AppDataSource);

    // 3. Practice Areas
    const practiceAreasMap = await seedPracticeAreas(AppDataSource);

    // 4. Legal Services
    const servicesMap = await seedLegalServices(AppDataSource, practiceAreasMap);

    // 5. Lawyers
    const lawyersMap = await seedLawyers(AppDataSource, officesMap, practiceAreasMap, lawyerUsers);

    // 6. Posts, Categories & Tags
    await seedPostsAndCategories(AppDataSource, lawyersMap);

    // 7. Consultations
    await seedConsultations(AppDataSource, practiceAreasMap, lawyersMap, adminUser);

    // 8. Notifications
    await seedNotifications(AppDataSource);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('\n================================================================');
    console.log(`🎉 Quá trình Migrate & Seed dữ liệu hoàn tất xuất sắc trong ${elapsed}s!`);
    console.log('================================================================\n');
  } catch (error) {
    console.error('\n❌ Có lỗi xảy ra trong quá trình seed:', error);
    process.exitCode = 1;
  } finally {
    await AppDataSource.destroy();
  }
}

main();
