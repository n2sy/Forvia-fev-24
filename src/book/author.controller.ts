import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private authSer: AuthorService) {}
  @Get('all')
  async chercherAuteurs(@Res() response: Response) {
    try {
      let result = await this.authSer.getAllAuthors();
      return response.json(result);
    } catch (err) {
      throw new ConflictException();
    }
  }
  @Post('add')
  async ajouterLivre(@Body() body, @Res() response: Response) {
    try {
      let result = await this.authSer.addAuthor(body);
      return response.json(result);
    } catch (err) {
      throw new ConflictException();
    }
  }
}
