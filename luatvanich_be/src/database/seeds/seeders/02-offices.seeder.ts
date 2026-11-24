import { DataSource } from 'typeorm';
import { Office } from '../../../modules/offices/entities/office.entity';
import { OfficeTranslation } from '../../../modules/offices/entities/office-translation.entity';
import { OFFICES_SEED_DATA } from '../data/offices.data';

export async function seedOffices(dataSource: DataSource): Promise<Record<string, Office>> {
  console.log('  📌 [2/8] Bắt đầu seed Văn phòng đại diện (Offices)...');
  const officeRepo = dataSource.getRepository(Office);
  const translationRepo = dataSource.getRepository(OfficeTranslation);

  const officesMap: Record<string, Office> = {};

  for (const item of OFFICES_SEED_DATA) {
    let office = await officeRepo.findOne({ where: { code: item.code } });
    if (!office) {
      office = officeRepo.create({
        code: item.code,
        phone: item.phone,
        fax: item.fax,
        email: item.email,
        wechatId: item.wechatId,
        wechatQrUrl: item.wechatQrUrl,
        imageUrl: item.imageUrl,
        latitude: item.latitude,
        longitude: item.longitude,
        mapEmbedUrl: item.mapEmbedUrl,
        isHeadquarters: item.isHeadquarters,
        displayOrder: item.displayOrder,
      });
      await officeRepo.save(office);
      console.log(`    + Đã tạo văn phòng: ${item.code}`);
    } else {
      office.phone = item.phone;
      office.fax = item.fax;
      office.email = item.email;
      office.wechatId = item.wechatId;
      office.wechatQrUrl = item.wechatQrUrl;
      office.imageUrl = item.imageUrl;
      office.latitude = item.latitude;
      office.longitude = item.longitude;
      office.mapEmbedUrl = item.mapEmbedUrl;
      office.isHeadquarters = item.isHeadquarters;
      office.displayOrder = item.displayOrder;
      await officeRepo.save(office);
    }

    // Bản dịch song ngữ
    for (const t of item.translations) {
      let trans = await translationRepo.findOne({
        where: { officeId: office.id, languageCode: t.languageCode },
      });
      if (!trans) {
        trans = translationRepo.create({
          officeId: office.id,
          languageCode: t.languageCode,
          name: t.name,
          address: t.address,
          workingHours: t.workingHours,
          description: t.description,
          isComplete: true,
        });
      } else {
        trans.name = t.name;
        trans.address = t.address;
        trans.workingHours = t.workingHours;
        trans.description = t.description;
        trans.isComplete = true;
      }
      await translationRepo.save(trans);
    }

    officesMap[item.code] = office;
  }

  return officesMap;
}
