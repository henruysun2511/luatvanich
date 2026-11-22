import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';

export class OfficeNotFoundException extends NotFoundException {
  constructor(idOrCode: string) {
    super(`Không tìm thấy văn phòng đại diện: ${idOrCode}`);
  }
}

export class OfficeCodeAlreadyExistsException extends ConflictException {
  constructor(code: string) {
    super(`Mã văn phòng "${code}" đã tồn tại trên hệ thống`);
  }
}

export class OfficeHasLawyersException extends BadRequestException {
  constructor(count: number) {
    super(`Không thể xóa văn phòng này vì đang có ${count} luật sư trực thuộc`);
  }
}
