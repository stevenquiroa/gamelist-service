import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Publisher extends Document {
  @Prop({ required: true, index: true })
  title: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
