import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Transform, Type } from 'class-transformer';

@Schema({ timestamps: true, versionKey: false })
export class Brand extends Document {
  @Type(() => Types.ObjectId)
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
