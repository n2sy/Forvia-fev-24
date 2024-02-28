import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDTO } from './DTO/book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
  ) {}

  getAllBooks() {
    return this.bookRepo.find();
  }

  addBook(newBook: BookDTO) {
    //this.bookRepo.create;
    return this.bookRepo.save(newBook);
  }

  getBookById(id) {
    //this.bookRepo.create;
    return this.bookRepo.findOneBy({
      id: id,
    });
  }

  async updateBook(uBook: BookDTO, id) {
    let b = await this.bookRepo.preload({
      id: id,
      ...uBook,
    });
    if (!b) throw new NotFoundException();

    return this.bookRepo.save(b);
  }
}
