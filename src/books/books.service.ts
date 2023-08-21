import { Injectable } from '@nestjs/common';
import { Book, BookStatus } from './book.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  getAllBooks(): Book[] {
    return this.books;
  }

  createBook(createBookDto: CreateBookDto): Book {
    const { title, description, numberOfPages, publishedYear } = createBookDto;
    const book: Book = {
      id: uuidv4(),
      title,
      description,
      numberOfPages,
      publishedYear,
      status: BookStatus.NEW,
    };

    this.books.push(book);
    return book;
  }
}
