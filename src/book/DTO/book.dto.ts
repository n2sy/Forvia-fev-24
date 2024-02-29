import { IsInt, IsNotEmpty, MinLength } from 'class-validator';
import { AuthorEntity } from '../entities/author.entity';

export class BookDTO {
  @IsNotEmpty()
  @MinLength(10)
  title: string;

  @IsNotEmpty()
  editor: string;

  @IsInt()
  year: number;

  @IsNotEmpty()
  author: AuthorEntity;
}
