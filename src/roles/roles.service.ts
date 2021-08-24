import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role } from 'src/roles/entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async findRoleById(id: string) {
    const role = await this.roleModel.findById(id).exec();

    if (!role)
      throw new NotFoundException(`No se encontró el rol con el id: ${id}`);

    return role;
  }

  async findRole(roleName: string) {
    const existRole = await this.roleModel.findOne({ name: roleName }).exec();

    if (existRole) {
      throw new BadRequestException(
        `Ya existe un rol con el nombre: ${roleName}`,
      );
    }
  }

  async create(createRoleDto: CreateRoleDto) {
    await this.findRole(createRoleDto.name);
    const newRole = new this.roleModel(createRoleDto);
    const role = await newRole.save();

    return {
      message: 'This action adds a new role',
      role,
    };
  }

  async findAll() {
    const roles = await this.roleModel.find().exec();
    return {
      message: `This action returns all roles`,
      roles,
    };
  }

  async findOne(id: string) {
    const role = await this.findRoleById(id);
    return {
      message: `This action returns a #${id} role`,
      role,
    };
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.findRoleById(id);
    await this.findRole(updateRoleDto.name);
    const updateRole = await this.roleModel
      .findByIdAndUpdate(id, { $set: updateRoleDto }, { new: true })
      .exec();
    return {
      message: `This action updates a #${id} role`,
      role: updateRole,
    };
  }

  async remove(id: string) {
    await this.findRoleById(id);
    const deleteRole = await this.roleModel.findByIdAndDelete(id).exec();
    return {
      message: `This action removes a #${id} role`,
      role: deleteRole,
    };
  }
}
