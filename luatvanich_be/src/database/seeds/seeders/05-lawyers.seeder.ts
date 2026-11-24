import { DataSource } from 'typeorm';
import { Lawyer } from '../../../modules/lawyers/entities/lawyer.entity';
import { LawyerTranslation } from '../../../modules/lawyers/entities/lawyer-translation.entity';
import { LawyerPracticeArea } from '../../../modules/lawyers/entities/lawyer-practice-area.entity';
import { LawyerLanguage } from '../../../modules/lawyers/entities/lawyer-language.entity';
import { LawyerCredential } from '../../../modules/lawyers/entities/lawyer-credential.entity';
import { LawyerCredentialTranslation } from '../../../modules/lawyers/entities/lawyer-credential-translation.entity';
import { Office } from '../../../modules/offices/entities/office.entity';
import { PracticeArea } from '../../../modules/practice-areas/entities/practice-area.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { LAWYERS_SEED_DATA } from '../data/lawyers.data';
import { LangCode } from '../../../common/enums/lang.enum';

export async function seedLawyers(
  dataSource: DataSource,
  officesMap: Record<string, Office>,
  practiceAreasMap: Record<string, PracticeArea>,
  lawyerUsers: Record<string, User>,
): Promise<Record<string, Lawyer>> {
  console.log('  📌 [5/8] Bắt đầu seed Đội ngũ luật sư (Lawyers)...');
  const lawyerRepo = dataSource.getRepository(Lawyer);
  const transRepo = dataSource.getRepository(LawyerTranslation);
  const paRelRepo = dataSource.getRepository(LawyerPracticeArea);
  const langRelRepo = dataSource.getRepository(LawyerLanguage);
  const credRepo = dataSource.getRepository(LawyerCredential);
  const credTransRepo = dataSource.getRepository(LawyerCredentialTranslation);

  const lawyersMap: Record<string, Lawyer> = {};

  for (const item of LAWYERS_SEED_DATA) {
    const office = officesMap[item.officeCode];
    const linkedUser = item.email ? lawyerUsers[item.email] : undefined;

    // Tìm xem luật sư đã có chưa theo email hoặc slug tiếng Việt
    const viTrans = item.translations.find((t) => t.languageCode === LangCode.VI);
    let existingTrans = viTrans
      ? await transRepo.findOne({ where: { slug: viTrans.slug, languageCode: LangCode.VI } })
      : null;

    let lawyer: Lawyer | null = null;
    if (existingTrans) {
      lawyer = await lawyerRepo.findOne({ where: { id: existingTrans.lawyerId } });
    } else if (item.email) {
      lawyer = await lawyerRepo.findOne({ where: { email: item.email } });
    }

    if (lawyer) {
      lawyer.officeId = office?.id;
      lawyer.userId = linkedUser?.id || lawyer.userId;
      lawyer.teamGroup = item.teamGroup;
      lawyer.avatarUrl = item.avatarUrl;
      lawyer.licenseNumber = item.licenseNumber;
      lawyer.barAssociation = item.barAssociation;
      lawyer.email = item.email;
      lawyer.mobilePhone = item.mobilePhone;
      lawyer.wechatId = item.wechatId;
      lawyer.practiceStartDate = item.practiceStartDate;
      lawyer.displayOrder = item.displayOrder;
      lawyer.isFeatured = item.isFeatured;
      lawyer.status = item.status;
      await lawyerRepo.save(lawyer);
    } else {
      lawyer = lawyerRepo.create({
        officeId: office?.id,
        userId: linkedUser?.id,
        teamGroup: item.teamGroup,
        avatarUrl: item.avatarUrl,
        licenseNumber: item.licenseNumber,
        barAssociation: item.barAssociation,
        email: item.email,
        mobilePhone: item.mobilePhone,
        wechatId: item.wechatId,
        practiceStartDate: item.practiceStartDate,
        displayOrder: item.displayOrder,
        isFeatured: item.isFeatured,
        status: item.status,
      });
      await lawyerRepo.save(lawyer);
      console.log(`    + Đã tạo luật sư: ${viTrans?.fullName} (${item.slugKey})`);
    }

    // 1. Bản dịch song ngữ
    for (const t of item.translations) {
      let trans = await transRepo.findOne({
        where: { lawyerId: lawyer.id, languageCode: t.languageCode },
      });
      if (!trans) {
        trans = transRepo.create({
          lawyerId: lawyer.id,
          languageCode: t.languageCode,
          fullName: t.fullName,
          latinName: t.latinName,
          slug: t.slug,
          title: t.title,
          secondaryTitle: t.secondaryTitle,
          academicTitle: t.academicTitle,
          affiliatedOrganization: t.affiliatedOrganization,
          bio: t.bio,
          metaTitle: t.metaTitle,
          metaDescription: t.metaDescription,
          isComplete: true,
        });
      } else {
        trans.fullName = t.fullName;
        trans.latinName = t.latinName;
        trans.slug = t.slug;
        trans.title = t.title;
        trans.secondaryTitle = t.secondaryTitle;
        trans.academicTitle = t.academicTitle;
        trans.affiliatedOrganization = t.affiliatedOrganization;
        trans.bio = t.bio;
        trans.metaTitle = t.metaTitle;
        trans.metaDescription = t.metaDescription;
        trans.isComplete = true;
      }
      await transRepo.save(trans);
    }

    // 2. Lĩnh vực chuyên môn
    await paRelRepo.delete({ lawyerId: lawyer.id });
    for (const paCode of item.practiceAreaCodes) {
      const pa = practiceAreasMap[paCode];
      if (pa) {
        const paRel = paRelRepo.create({
          lawyerId: lawyer.id,
          practiceAreaId: pa.id,
          isPrimary: paCode === item.practiceAreaCodes[0],
        });
        await paRelRepo.save(paRel);
      }
    }

    // 3. Ngôn ngữ làm việc
    await langRelRepo.delete({ lawyerId: lawyer.id });
    for (const lang of item.languages) {
      const langRel = langRelRepo.create({
        lawyerId: lawyer.id,
        languageCode: lang.languageCode,
        isNative: lang.isNative,
      });
      await langRelRepo.save(langRel);
    }

    // 4. Lý lịch / Bằng cấp / Giải thưởng
    const existingCreds = await credRepo.find({ where: { lawyerId: lawyer.id } });
    if (existingCreds.length === 0) {
      for (const credData of item.credentials) {
        const cred = credRepo.create({
          lawyerId: lawyer.id,
          kind: credData.kind,
          yearStart: credData.yearStart,
          yearEnd: credData.yearEnd,
          displayOrder: credData.displayOrder,
        });
        await credRepo.save(cred);

        for (const ct of credData.translations) {
          const cTrans = credTransRepo.create({
            credentialId: cred.id,
            languageCode: ct.languageCode,
            title: ct.title,
            institution: ct.institution,
            description: ct.description,
          });
          await credTransRepo.save(cTrans);
        }
      }
    }

    lawyersMap[item.slugKey] = lawyer;
  }

  return lawyersMap;
}
