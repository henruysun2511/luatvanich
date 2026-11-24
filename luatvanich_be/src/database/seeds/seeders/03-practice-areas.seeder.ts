import { DataSource } from 'typeorm';
import { PracticeArea } from '../../../modules/practice-areas/entities/practice-area.entity';
import { PracticeAreaTranslation } from '../../../modules/practice-areas/entities/practice-area-translation.entity';
import { PRACTICE_AREAS_SEED_DATA } from '../data/practice-areas.data';
import { LangCode } from '../../../common/enums/lang.enum';

export async function seedPracticeAreas(dataSource: DataSource): Promise<Record<string, PracticeArea>> {
  console.log('  📌 [3/8] Bắt đầu seed Lĩnh vực hoạt động (Practice Areas)...');
  const paRepo = dataSource.getRepository(PracticeArea);
  const transRepo = dataSource.getRepository(PracticeAreaTranslation);

  const practiceAreasMap: Record<string, PracticeArea> = {};

  for (const item of PRACTICE_AREAS_SEED_DATA) {
    // Tìm theo slug bản dịch tiếng Việt
    const viTrans = item.translations.find((t) => t.languageCode === LangCode.VI);
    let existingTrans = viTrans
      ? await transRepo.findOne({ where: { slug: viTrans.slug, languageCode: LangCode.VI } })
      : null;

    let practiceArea: PracticeArea;
    if (existingTrans) {
      practiceArea = (await paRepo.findOne({ where: { id: existingTrans.practiceAreaId } }))!;
      practiceArea.iconUrl = item.iconUrl;
      practiceArea.displayOrder = item.displayOrder;
      practiceArea.status = item.status;
      practiceArea.isFeatured = item.isFeatured;
      await paRepo.save(practiceArea);
    } else {
      practiceArea = paRepo.create({
        iconUrl: item.iconUrl,
        displayOrder: item.displayOrder,
        status: item.status,
        isFeatured: item.isFeatured,
      });
      await paRepo.save(practiceArea);
      console.log(`    + Đã tạo lĩnh vực: ${item.code} (${viTrans?.name})`);
    }

    // Cập nhật bản dịch song ngữ
    for (const t of item.translations) {
      let trans = await transRepo.findOne({
        where: { practiceAreaId: practiceArea.id, languageCode: t.languageCode },
      });
      if (!trans) {
        // Kiểm tra xem slug có bị trùng không (nếu có entity cũ khác id)
        const slugExist = await transRepo.findOne({ where: { slug: t.slug } });
        if (slugExist && slugExist.practiceAreaId !== practiceArea.id) {
          trans = slugExist;
          trans.practiceAreaId = practiceArea.id;
        } else {
          trans = transRepo.create({
            practiceAreaId: practiceArea.id,
            languageCode: t.languageCode,
            name: t.name,
            slug: t.slug,
            description: t.description,
            metaTitle: t.metaTitle,
            metaDescription: t.metaDescription,
            isComplete: true,
          });
        }
      }

      trans.name = t.name;
      trans.slug = t.slug;
      trans.description = t.description;
      trans.metaTitle = t.metaTitle;
      trans.metaDescription = t.metaDescription;
      trans.isComplete = true;

      await transRepo.save(trans);
    }

    practiceAreasMap[item.code] = practiceArea;
  }

  return practiceAreasMap;
}
