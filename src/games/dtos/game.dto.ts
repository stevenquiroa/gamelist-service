import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateGameDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsMongoId()
  @IsNotEmpty()
  readonly publisher: string;

  @IsString({ each: true })
  readonly tags: string[];

  @IsDateString()
  readonly releaseDate: string;
}

export class UpdateGameDTO extends PartialType(CreateGameDTO) {}
