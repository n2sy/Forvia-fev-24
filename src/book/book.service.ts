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
    return this.bookRepo.find({
      withDeleted: true,
      loadRelationIds: true,
      // relations: {
      //   author: true,
      // },
    });
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

  deleteBook(id) {
    return this.bookRepo.delete(id);
  }
  async removeBook(id) {
    let b = await this.getBookById(id);
    if (!b) throw new NotFoundException();
    return this.bookRepo.remove(b);
  }

  softDeleteBook(id) {
    return this.bookRepo.softDelete(id);
  }

  async softremoveBook(id) {
    let b = await this.getBookById(id);
    if (!b) throw new NotFoundException();
    return this.bookRepo.softRemove(b);
  }

  restoreBook(id) {
    return this.bookRepo.restore(id);
  }
  async recoverBook(id) {
    let b = await this.bookRepo.find({
      where: {
        id: id,
      },
      withDeleted: true,
    });
    return this.bookRepo.recover(b);
  }

  nbBooksPerYear() {
    const qb = this.bookRepo.createQueryBuilder('book');
    return qb
      .select('book.year, count(book.id) as nbreDeBooks')
      .groupBy('book.year')
      .getRawMany();
  }

  nbBooksBetweenYears(startYear, endYear) {
    const qb = this.bookRepo.createQueryBuilder('book');
    return qb
      .select('book.year, count(book.id) as nbreDeBooks')
      .where('book.year >= :y1 AND book.year <= :y2')
      .setParameters({ y1: startYear, y2: endYear })
      .groupBy('book.year')
      .getRawMany();
  }
}
