import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book, BookStatus } from './book.model';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookStatusValidationPipe } from './pipes/book-status-validation.pipes';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() createBookDto: CreateBookDto): Book {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  getBooks(@Query(ValidationPipe) filterDto: GetBooksFilterDto): Book[] {
    if (Object.keys(filterDto).length) {
      return this.booksService.getBooksWithFilters(filterDto);
    } else {
      return this.booksService.getAllBooks();
    }
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Book {
    return this.booksService.getBookById(id);
  }

  @Put(':id')
  updateBookDetails(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Book {
    return this.booksService.updateBookDetails(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string): string {
    return this.booksService.deleteBook(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status', BookStatusValidationPipe) status: BookStatus,
  ) {
    return this.booksService.updateStatus(id, status);
  }
}
