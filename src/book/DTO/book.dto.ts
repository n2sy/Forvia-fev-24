import { IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class BookDTO {
  @IsNotEmpty()
  @MinLength(10)
  title: string;

  @IsNotEmpty()
  editor: string;

  @IsInt()
  year: number;
}
