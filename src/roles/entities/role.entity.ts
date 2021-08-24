import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Role extends Document {
  @Prop({ required: true, unique: true })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
