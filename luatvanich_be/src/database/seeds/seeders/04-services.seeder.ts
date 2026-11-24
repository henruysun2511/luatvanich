import { DataSource } from 'typeorm';
import { LegalService } from '../../../modules/legal-services/entities/legal-service.entity';
import { LegalServiceTranslation } from '../../../modules/legal-services/entities/legal-service-translation.entity';
import { PracticeArea } from '../../../modules/practice-areas/entities/practice-area.entity';
import { SERVICES_SEED_DATA } from '../data/services.data';
import { LangCode } from '../../../common/enums/lang.enum';

export async function seedLegalServices(
  dataSource: DataSource,
  practiceAreasMap: Record<string, PracticeArea>,
): Promise<Record<string, LegalService>> {
  console.log('  📌 [4/8] Bắt đầu seed Dịch vụ pháp lý (Legal Services)...');
  const serviceRepo = dataSource.getRepository(LegalService);
  const transRepo = dataSource.getRepository(LegalServiceTranslation);

  const servicesMap: Record<string, LegalService> = {};

  for (const item of SERVICES_SEED_DATA) {
    const parentArea = practiceAreasMap[item.practiceAreaCode];
    const viTrans = item.translations.find((t) => t.languageCode === LangCode.VI);

    let existingTrans = viTrans
      ? await transRepo.findOne({ where: { slug: viTrans.slug, languageCode: LangCode.VI } })
      : null;

    let service: LegalService;
    if (existingTrans) {
      service = (await serviceRepo.findOne({ where: { id: existingTrans.serviceId } }))!;
      service.practiceAreaId = parentArea?.id;
      service.displayOrder = item.displayOrder;
      service.status = item.status;
      service.isFeatured = item.isFeatured;
      service.coverImageUrl = item.coverImageUrl;
      await serviceRepo.save(service);
    } else {
      service = serviceRepo.create({
        practiceAreaId: parentArea?.id,
        displayOrder: item.displayOrder,
        status: item.status,
        isFeatured: item.isFeatured,
        coverImageUrl: item.coverImageUrl,
      });
      await serviceRepo.save(service);
      console.log(`    + Đã tạo dịch vụ: ${item.code} (${viTrans?.title})`);
    }

    // Bản dịch song ngữ
    for (const t of item.translations) {
      let trans = await transRepo.findOne({
        where: { serviceId: service.id, languageCode: t.languageCode },
      });
      if (!trans) {
        const slugExist = await transRepo.findOne({ where: { slug: t.slug } });
        if (slugExist && slugExist.serviceId !== service.id) {
          trans = slugExist;
          trans.serviceId = service.id;
        } else {
          trans = transRepo.create({
            serviceId: service.id,
            languageCode: t.languageCode,
            title: t.title,
            slug: t.slug,
            excerpt: t.excerpt,
            contentHtml: t.contentHtml,
            metaTitle: t.metaTitle,
            metaDescription: t.metaDescription,
            isComplete: true,
          });
        }
      }

      trans.title = t.title;
      trans.slug = t.slug;
      trans.excerpt = t.excerpt;
      trans.contentHtml = t.contentHtml;
      trans.metaTitle = t.metaTitle;
      trans.metaDescription = t.metaDescription;
      trans.isComplete = true;

      await transRepo.save(trans);
    }

    servicesMap[item.code] = service;
  }

  return servicesMap;
}
