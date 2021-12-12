import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import { Transform, Type } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entity';

@Schema({ timestamps: true, versionKey: false })
export class Brand extends Document {
  // @Type(() => Types.ObjectId)
  // @Transform(({ value }) => value.toString())
  // @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  category: Category | Types.ObjectId;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
