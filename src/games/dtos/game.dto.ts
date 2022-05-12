import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateGameDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  readonly publisher: string;

  @IsDateString()
  @ApiProperty()
  readonly releaseDate: string;

  @ApiProperty()
  @IsString({ each: true })
  readonly tags: string[];
}

export class UpdateGameDTO extends PartialType(CreateGameDTO) {}

export class FilterGamesDTO {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  publisher: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  s: string;
}
