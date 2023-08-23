import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BookStatus } from '../book.model';

export class BookStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    BookStatus.IN_REPROCESING,
    BookStatus.IN_REVIEW,
    BookStatus.NEW,
    BookStatus.REVIEWED,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);

    return idx !== -1;
  }
}
