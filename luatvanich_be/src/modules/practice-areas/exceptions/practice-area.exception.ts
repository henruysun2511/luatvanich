import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';

export class PracticeAreaNotFoundException extends NotFoundException {
  constructor(idOrSlug: string) {
    super(`Không tìm thấy lĩnh vực pháp lý: ${idOrSlug}`);
  }
}

export class PracticeAreaSlugAlreadyExistsException extends ConflictException {
  constructor(slug: string) {
    super(`Đường dẫn slug "${slug}" đã tồn tại trên hệ thống`);
  }
}

export class PracticeAreaHasServicesException extends BadRequestException {
  constructor(count: number) {
    super(`Không thể xóa lĩnh vực này vì đang có ${count} dịch vụ pháp lý trực thuộc`);
  }
}

export class PracticeAreaHasLawyersException extends BadRequestException {
  constructor() {
    super('Không thể xóa lĩnh vực này vì vẫn còn luật sư đang liên kết');
  }
}
