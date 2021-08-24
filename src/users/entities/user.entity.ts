import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Role } from 'src/roles/entities/role.entity';

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

  // @Prop({ default: 'user' })
  // role: string;

  @Prop({ type: Types.ObjectId, ref: Role.name })
  role: Role | Types.ObjectId;

  @Prop({ default: '' })
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...object } = this.toObject();
  return object;
});
