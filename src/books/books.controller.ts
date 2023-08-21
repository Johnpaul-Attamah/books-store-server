import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './book.model';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Book {
    console.log(createBookDto);
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks();
  }
}
