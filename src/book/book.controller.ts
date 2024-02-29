import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { AdminGuard } from 'src/admin/admin.guard';
import { BookDTO } from './DTO/book.dto';
import { QmDTO } from './DTO/qm.dto';
import { BookService } from './book.service';

@Controller('book')
//@UseGuards(JwtAuthGuard)
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
  @UseGuards(AdminGuard)
  @Post('add')
  async ajouterLivre(@Body() body, @Res() response: Response) {
    try {
      let result = await this.bookSer.addBook(body);
      return response.json(result);
    } catch (err) {
      throw new ConflictException();
    }
  }
  @Get('stat')
  async nbLivresParAnnee(@Res() response: Response) {
    let result = await this.bookSer.nbBooksPerYear();
    return response.json(result);
  }
  @Get('stat2')
  async nbLivresParAnnees(@Query() qp: QmDTO, @Res() response: Response) {
    let result = await this.bookSer.nbBooksBetweenYears(
      qp.startYear,
      qp.endYear,
    );
    return response.json(result);
  }

  @Get(':id')
  async chercherLivre(@Param('id') id, @Res() response: Response) {
    let result = await this.bookSer.getBookById(id);
    console.log(result);

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

  @Delete('delete/:id')
  async supprimerLivre(@Param('id') id, @Res() response: Response) {
    let result = await this.bookSer.deleteBook(id);
    return response.json(result);
  }
  @Delete('softdelete/:id')
  async softSupprimerLivre(@Param('id') id, @Res() response: Response) {
    let result = await this.bookSer.softDeleteBook(id);
    return response.json(result);
  }

  @Delete('remove/:id')
  async supprimerLivreV2(@Param('id') id, @Res() response: Response) {
    let result = await this.bookSer.removeBook(id);
    return response.json(result);
  }

  @Delete('softremove/:id')
  async softsupprimerLivreV2(@Param('id') id, @Res() response: Response) {
    let result = await this.bookSer.softremoveBook(id);
    return response.json(result);
  }

  @Delete('restore/:id')
  async RestaurerLivre(@Param('id') id, @Res() response: Response) {
    let result = await this.bookSer.restoreBook(id);
    return response.json(result);
  }

  @Delete('restore/:id')
  async RestoreLivre(@Param('id') id, @Res() response: Response) {
    let result = await this.bookSer.restoreBook(id);
    return response.json(result);
  }

  @Delete('recover/:id')
  async RecoverLivre(@Param('id') id, @Res() response: Response) {
    let result = await this.bookSer.recoverBook(id);
    return response.json(result);
  }

  // @Post('uploads')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }
  @Post('uploads')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('uploads/images/:filename')
  loadImage(@Res() response: Response, @Param('filename') param) {
    response.sendFile(param, { root: 'images' });
  }
}
