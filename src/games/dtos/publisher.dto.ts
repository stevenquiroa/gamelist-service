import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublisherDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;
}
