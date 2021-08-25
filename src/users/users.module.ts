import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'src/users/entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Types } from 'mongoose';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function (next) {
            this.set('role', Types.ObjectId(this.role.toString()));
            console.log('===object save===');
            console.log(this.toObject());
            next();
          });
          schema.method('toJSON', function () {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...object } = this.toObject();
            // object.role = Types.ObjectId(object.role.toString());
            return object;
          });
          return schema;
        },
      },
    ]),
    RolesModule,
  ],
})
export class UsersModule {}
