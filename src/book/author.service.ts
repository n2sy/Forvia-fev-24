import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepo: Repository<AuthorEntity>,
  ) {}

  getAllAuthors() {
    return this.authorRepo.find({
      withDeleted: true,
      relations: {
        listeLivres: true,
      },
    });
  }

  addAuthor(newAuthor) {
    //this.authorRepo.create;
    return this.authorRepo.save(newAuthor);
  }

  getAuthorById(id) {
    //this.authorRepo.create;
    return this.authorRepo.findOneBy({
      id: id,
    });
  }

  async updateAuthor(uAuthor, id) {
    let b = await this.authorRepo.preload({
      id: id,
      ...uAuthor,
    });
    if (!b) throw new NotFoundException();

    return this.authorRepo.save(b);
  }

  deleteBook(id) {
    return this.authorRepo.delete(id);
  }
}
