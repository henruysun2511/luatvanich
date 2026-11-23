import { NotFoundException, ForbiddenException } from '@nestjs/common';

export class ConsultationNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Yêu cầu tư vấn với ID '${id}' không tồn tại hoặc đã bị xóa.`);
  }
}

export class ConsultationNoteNotFoundException extends NotFoundException {
  constructor(noteId: string) {
    super(`Ghi chú với ID '${noteId}' không tồn tại hoặc đã bị xóa.`);
  }
}

export class ConsultationCannotDeleteNoteException extends ForbiddenException {
  constructor() {
    super('Bạn không có quyền xóa ghi chú do người khác tạo.');
  }
}
