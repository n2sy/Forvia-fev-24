import { IsString } from 'class-validator';

export class QmDTO {
  @IsString()
  startYear;

  @IsString()
  endYear;
}
