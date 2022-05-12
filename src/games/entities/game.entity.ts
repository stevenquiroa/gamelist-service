import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Publisher } from './publisher.entity';

@Schema()
export class Game extends Document {
  @Prop({ required: true, index: true })
  title: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: [{ type: String }] })
  tags: Types.Array<string>;

  @Prop({ type: Date })
  releaseDate: string;

  @Prop({ type: Types.ObjectId, ref: Publisher.name })
  publisher: Publisher | Types.ObjectId;
}

export const GameSchema = SchemaFactory.createForClass(Game);
