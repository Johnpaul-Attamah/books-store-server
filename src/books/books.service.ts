import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookStatus } from './book.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  getAllBooks(): Book[] {
    return this.books;
  }

  getBooksWithFilters(filterDto: GetBooksFilterDto): Book[] {
    const { status, search } = filterDto;

    let books = this.getAllBooks();

    if (status) {
      books = books.filter((book) => book.status === status);
    }

    if (search) {
      books = books.filter(
        (book) =>
          book.title.includes(search) || book.description.includes(search),
      );
    }

    return books;
  }

  getBookById(id: string): Book {
    const found = this.books.find((book) => book.id === id);

    if (!found) {
      throw new NotFoundException(`Book with id:${id} is Not Found`);
    }

    return found;
  }

  deleteBook(id: string): string {
    const book = this.getBookById(id);
    this.books = this.books.filter((b) => b.id !== book.id);
    return 'Book deleted Successfully';
  }

  updateBookDetails(id: string, updateBookDto: UpdateBookDto): Book {
    const { title, description, numberOfPages, publishedYear } = updateBookDto;

    const book = this.getBookById(id);
    book.title = title || book.title;
    book.description = description || book.description;
    book.numberOfPages = numberOfPages || book.numberOfPages;
    book.publishedYear = publishedYear || book.publishedYear;

    return book;
  }

  updateStatus(id: string, status: BookStatus): Book {
    const book = this.getBookById(id);

    book.status = status;

    return book;
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
