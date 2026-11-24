import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../../common/errors/app.error';
import { POST_ERROR_CODE } from '../constants/posts.constant';

export class PostNotFoundException extends AppError {
  constructor(id: string) {
    super({ code: POST_ERROR_CODE.NOT_FOUND, message: `Không tìm thấy bài viết: ${id}`, statusCode: HttpStatus.NOT_FOUND });
  }
}

export class PostCategoryNotFoundException extends AppError {
  constructor(id: string) {
    super({ code: POST_ERROR_CODE.CATEGORY_NOT_FOUND, message: `Không tìm thấy chuyên mục: ${id}`, statusCode: HttpStatus.NOT_FOUND });
  }
}

export class PostSlugAlreadyExistsException extends AppError {
  constructor(slug: string) {
    super({ code: POST_ERROR_CODE.SLUG_ALREADY_EXISTS, message: `Slug "${slug}" đã được sử dụng hoặc được dành riêng`, statusCode: HttpStatus.CONFLICT });
  }
}

export class PostCategoryHasPostsException extends AppError {
  constructor(count: number) {
    super({ code: POST_ERROR_CODE.CATEGORY_HAS_POSTS, message: `Không thể xóa chuyên mục vì đang chứa ${count} bài viết`, statusCode: HttpStatus.BAD_REQUEST });
  }
}

export class PostCategoryHasChildrenException extends AppError {
  constructor() {
    super({ code: POST_ERROR_CODE.CATEGORY_HAS_CHILDREN, message: 'Không thể xóa chuyên mục vì còn chuyên mục con trực thuộc', statusCode: HttpStatus.BAD_REQUEST });
  }
}

export class PostCategoryHierarchyException extends AppError {
  constructor(message: string) {
    super({ code: POST_ERROR_CODE.CATEGORY_HIERARCHY_INVALID, message, statusCode: HttpStatus.BAD_REQUEST });
  }
}

export class TagNotFoundException extends AppError {
  constructor(id: string) {
    super({ code: POST_ERROR_CODE.TAG_NOT_FOUND, message: `Không tìm thấy thẻ: ${id}`, statusCode: HttpStatus.NOT_FOUND });
  }
}

export class PostRelationException extends AppError {
  constructor(message: string) {
    super({ code: POST_ERROR_CODE.RELATION_INVALID, message, statusCode: HttpStatus.BAD_REQUEST });
  }
}

export class PostPublicationException extends AppError {
  constructor(message: string) {
    super({ code: POST_ERROR_CODE.PUBLICATION_INVALID, message, statusCode: HttpStatus.BAD_REQUEST });
  }
}

export class PostThumbnailException extends AppError {
  constructor() {
    super({ code: POST_ERROR_CODE.THUMBNAIL_INVALID, message: 'Ảnh bìa phải là tệp ảnh công khai từ kho media của dự án', statusCode: HttpStatus.BAD_REQUEST });
  }
}
