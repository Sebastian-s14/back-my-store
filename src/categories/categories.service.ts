import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from 'src/categories/entities/category.entity';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findCategoryById(id: string) {
    const category = await this.categoryModel.findById(id).exec();

    if (!category)
      throw new NotFoundException(
        `No se encontró la categoría con el id: ${id}`,
      );

    return category;
  }

  async findCategory(categoryName: string) {
    const existCategory = await this.categoryModel
      .findOne({ name: categoryName })
      .exec();

    if (existCategory) {
      throw new BadRequestException(
        `Ya existe una categoría con el nombre: ${categoryName}`,
      );
    }
  }

  async create(createCategoryDto: CreateCategoryDto) {
    await this.findCategory(createCategoryDto.name);
    const newCategory = new this.categoryModel(createCategoryDto);
    const category = await newCategory.save();
    return {
      message: 'This action adds a new category',
      category,
    };
  }

  async findAll() {
    const categories = await this.categoryModel.find().exec();
    return {
      message: `This action returns all categories`,
      categories,
    };
  }

  async findOne(id: string) {
    const category = await this.findCategoryById(id);
    return {
      message: `This action returns a #${id} category`,
      category,
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findCategoryById(id);
    await this.findCategory(updateCategoryDto.name);
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, { $set: updateCategoryDto }, { new: true })
      .exec();
    return {
      message: `This action updates a #${id} category`,
      category: updatedCategory,
    };
  }

  async remove(id: string) {
    await this.findCategoryById(id);
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .exec();
    return {
      message: `This action removes a #${id} category`,
      role: deletedCategory,
    };
  }
}
