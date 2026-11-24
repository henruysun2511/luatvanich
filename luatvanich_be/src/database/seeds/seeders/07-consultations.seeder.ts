import { DataSource } from 'typeorm';
import { ConsultationRequest } from '../../../modules/consultations/entities/consultation-request.entity';
import { ConsultationNote } from '../../../modules/consultations/entities/consultation-note.entity';
import { PracticeArea } from '../../../modules/practice-areas/entities/practice-area.entity';
import { Lawyer } from '../../../modules/lawyers/entities/lawyer.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { CONSULTATIONS_SEED_DATA } from '../data/consultations.data';

export async function seedConsultations(
  dataSource: DataSource,
  practiceAreasMap: Record<string, PracticeArea>,
  lawyersMap: Record<string, Lawyer>,
  adminUser: User,
): Promise<void> {
  console.log('  📌 [7/8] Bắt đầu seed Yêu cầu tư vấn (Consultations)...');
  const crRepo = dataSource.getRepository(ConsultationRequest);
  const noteRepo = dataSource.getRepository(ConsultationNote);

  for (const item of CONSULTATIONS_SEED_DATA) {
    const pa = item.practiceAreaCode ? practiceAreasMap[item.practiceAreaCode] : null;
    const lawyer = item.lawyerSlugKey ? lawyersMap[item.lawyerSlugKey] : null;

    let lead = await crRepo.findOne({
      where: { phone: item.phone, title: item.title },
    });

    if (!lead) {
      lead = crRepo.create({
        fullName: item.fullName,
        companyName: item.companyName,
        phone: item.phone,
        email: item.email,
        contactChannel: item.contactChannel,
        contactChannelId: item.contactChannelId,
        preferredContactTime: item.preferredContactTime,
        practiceAreaId: pa?.id,
        lawyerId: lawyer?.id,
        assignedUserId: adminUser.id,
        title: item.title,
        content: item.content,
        status: item.status,
      });
      await crRepo.save(lead);
      console.log(`    + Đã tạo lead tư vấn: ${item.fullName} (${item.title})`);

      if (item.notes && item.notes.length > 0) {
        for (const n of item.notes) {
          const noteEntity = noteRepo.create({
            consultationRequestId: lead.id,
            authorId: adminUser.id,
            authorName: adminUser.fullName,
            note: n.note,
          });
          await noteRepo.save(noteEntity);
        }
      }
    }
  }
}
