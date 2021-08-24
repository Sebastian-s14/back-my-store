import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserById(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user)
      throw new NotFoundException(`No se encontró al usuario con el id: ${id}`);

    return user;
  }

  async findEmail(email: string) {
    const existEmail = await this.userModel.findOne({ email: email }).exec();
    // console.log('email', existEmail);
    if (existEmail) {
      throw new BadRequestException(
        `Ya existe un usuario con el email: ${email}`,
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    await this.findEmail(createUserDto.email);
    const newUser = new this.userModel(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const user = await newUser.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restUserData } = user.toJSON();
    return {
      message: 'This action adds a new user',
      user: restUserData,
    };
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return {
      message: 'Lista de usuarios',
      users,
    };
  }

  async findOne(id: string) {
    const user = await this.findUserById(id);

    return {
      message: `This action returns a #${id} user`,
      user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findUserById(id);

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { $set: updateUserDto }, { new: true })
      .exec();
    return {
      message: `Usuario con el id ${id} actualizado correctamente`,
      user: updatedUser,
    };
  }

  async remove(id: string) {
    await this.findUserById(id);

    const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
    return {
      message: `This action removes a #${id} user`,
      user: deleteUser,
    };
  }
}
