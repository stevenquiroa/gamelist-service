import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Game extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Array })
  tags: string[];

  @Prop({ type: Date })
  releaseDate: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
