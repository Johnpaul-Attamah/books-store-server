import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule],
  providers: [],
})
export class AppModule {}