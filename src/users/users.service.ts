import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    private rolesService: RolesService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findUserById(id: string) {
    const user = await this.userModel
      .findById(id)
      .populate('role', 'name')
      .exec();

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
    // ? find email
    await this.findEmail(createUserDto.email);
    // ? find role by id
    await this.rolesService.findRoleById(createUserDto.role);

    const newUser = new this.userModel(createUserDto);

    newUser.password = await bcrypt.hash(newUser.password, 10);
    newUser.role = Types.ObjectId(createUserDto.role);
    newUser.populate('role', 'name').execPopulate();
    const user = await newUser.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...restUserData } = user.toJSON();
    return {
      message: 'This action adds a new user',
      // user: restUserData,
      user,
    };
  }

  async findAll() {
    const users = await this.userModel.find().populate('role', 'name').exec();
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

    if (updateUserDto.role) {
      await this.rolesService.findRoleById(updateUserDto.role);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          $set: { ...updateUserDto, role: Types.ObjectId(updateUserDto.role) },
        },
        { new: true },
      )
      .populate('role', 'name')
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
