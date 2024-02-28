import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class QmDTO {
  @Type(() => Number)
  @Min(2000)
  @Max(2030)
  startYear;

  @Type(() => Number)
  @Min(2000)
  @Max(2030)
  endYear;
}
