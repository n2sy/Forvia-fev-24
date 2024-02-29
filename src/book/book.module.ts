import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthorEntity } from './entities/author.entity';
import { BookEntity } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  controllers: [BookController, AuthorController],
  providers: [BookService, AuthorService],
})
export class BookModule {}
