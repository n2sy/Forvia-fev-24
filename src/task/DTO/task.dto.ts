import {
  IsIn,
  IsNotEmpty,
  IsPositive,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Le title doit dépasser 6 caractères',
  })
  title: string;

  @IsPositive()
  @Min(2000)
  @Max(2050)
  year: number;

  @IsIn(['in progress', 'done'])
  statut: string;
}
