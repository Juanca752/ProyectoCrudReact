import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message:string) {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      message,
      error:message
    }, HttpStatus.NOT_FOUND);
  }
}
