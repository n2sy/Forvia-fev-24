import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BookDTO } from './DTO/book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private bookSer: BookService) {}

  @Get('all')
  async chercherTousLesBooks(@Res() response: Response) {
    try {
      let result = await this.bookSer.getAllBooks();
      return response.json(result);
    } catch (err) {
      throw new ConflictException();
    }
  }
  @Post('add')
  async ajouterLivre(@Body() body: BookDTO, @Res() response: Response) {
    try {
      let result = await this.bookSer.addBook(body);
      return response.json(result);
    } catch (err) {
      throw new ConflictException();
    }
  }

  @Get(':id')
  async chercherLivre(@Param('id') id, @Res() response: Response) {
    let result = await this.bookSer.getBookById(id);
    if (!result) throw new NotFoundException();
    return response.json(result);
  }
  @Put('edit/:id')
  async editerLivre(
    @Body() body: BookDTO,
    @Param('id', ParseIntPipe) id,
    @Res() response: Response,
  ) {
    let result = await this.bookSer.updateBook(body, id);
    return response.json(result);
  }
}
