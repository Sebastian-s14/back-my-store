import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from 'src/brands/entities/brand.entity';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findBrandById(id: string) {
    const brand = await this.brandModel.findById(id).exec();

    if (!brand)
      throw new NotFoundException(`No se encontró la marca con el id: ${id}`);

    return brand;
  }

  async findBrand(brandName: string) {
    const existCategory = await this.brandModel
      .findOne({ name: brandName })
      .exec();

    if (existCategory) {
      throw new BadRequestException(
        `Ya existe una marca con el nombre: ${brandName}`,
      );
    }
  }

  async create(createBrandDto: CreateBrandDto) {
    await this.findBrand(createBrandDto.name);
    const newBrand = new this.brandModel(createBrandDto);
    const brand = await newBrand.save();
    return {
      message: 'This action adds a new brand',
      brand,
    };
  }

  async findAll() {
    const brands = await this.brandModel.find().exec();
    return {
      message: `This action returns all brands`,
      brands,
    };
  }

  async findOne(id: string) {
    const brand = await this.findBrandById(id);
    return {
      message: `This action returns a #${id} brand`,
      brand,
    };
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    await this.findBrandById(id);
    await this.findBrand(updateBrandDto.name);
    const updatedBrand = await this.brandModel
      .findByIdAndUpdate(id, { $set: updateBrandDto }, { new: true })
      .exec();
    return {
      message: `This action updates a #${id} brand`,
      brand: updatedBrand,
    };
  }

  async remove(id: string) {
    await this.findBrandById(id);
    const deletedBrand = await this.brandModel.findByIdAndDelete(id).exec();
    return {
      message: `This action removes a #${id} brand`,
      brand: deletedBrand,
    };
  }
}
