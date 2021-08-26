import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Brand extends Document {
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
