import { NotFoundException, ConflictException } from '@nestjs/common';

export class LawyerNotFoundException extends NotFoundException {
  constructor(idOrSlug: string) {
    super(`Không tìm thấy hồ sơ luật sư: ${idOrSlug}`);
  }
}

export class LawyerSlugAlreadyExistsException extends ConflictException {
  constructor(slug: string) {
    super(`Đường dẫn slug "${slug}" đã tồn tại trên hệ thống`);
  }
}
