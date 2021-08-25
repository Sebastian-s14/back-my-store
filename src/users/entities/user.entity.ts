import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, ObjectId, Types } from 'mongoose';

import { Role } from 'src/roles/entities/role.entity';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  @Exclude()
  password: string;

  @Prop({ type: Types.ObjectId, ref: Role.name })
  role: Role | Types.ObjectId;

  @Prop({ default: '' })
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
