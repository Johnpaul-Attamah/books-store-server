import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { BookStatus } from '../book.model';

export class GetBooksFilterDto {
  @IsOptional()
  @IsIn([
    BookStatus.IN_REPROCESING,
    BookStatus.IN_REVIEW,
    BookStatus.NEW,
    BookStatus.REVIEWED,
  ])
  status: BookStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
