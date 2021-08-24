import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: '' })
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
