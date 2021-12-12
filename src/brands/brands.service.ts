import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from 'src/brands/entities/brand.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @Inject(CloudinaryService)
    private readonly _cloudinaryService: CloudinaryService,
    private categoryService: CategoriesService,
  ) {}

  async findBrandById(id: string) {
    const brand = await this.brandModel.findById(id).exec();

    if (!brand)
      throw new NotFoundException(`No se encontró la marca con el id: ${id}`);

    return brand;
  }

  async findBrand(brandName: string) {
    const existBrand = await this.brandModel
      .findOne({ name: brandName })
      .exec();
    if (existBrand) {
      throw new BadRequestException(
        `Ya existe una marca con el nombre: ${brandName}`,
      );
    }
  }

  async create(createBrandDto: CreateBrandDto, file: Express.Multer.File) {
    await this.findBrand(createBrandDto.name);
    await this.categoryService.findCategoryById(createBrandDto.category);

    const newBrand = new this.brandModel(createBrandDto);
    // newBrand.category = new Types.ObjectId(createBrandDto.category);

    if (!file) throw new BadRequestException('file is required.');

    const { secure_url } = await this._cloudinaryService
      .uploadImage(file)
      .catch((e) => {
        console.log('error', e);
        throw new BadRequestException('Invalid file type.');
      });
    newBrand.image = secure_url;

    await newBrand.populate('category', 'name');

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

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
    file: Express.Multer.File,
  ) {
    const brand = await this.findBrandById(id);
    await this.findBrand(UpdateBrandDto.name);
    updateBrandDto.image = brand.image;
    if (file) {
      const { secure_url } = await this._cloudinaryService.updateImage(
        file,
        brand.image,
      );
      updateBrandDto.image = secure_url;
    }

    const updatedBrand = await this.brandModel
      .findByIdAndUpdate(id, { $set: updateBrandDto }, { new: true })
      .exec();
    return {
      message: `This action updates a #${id} brand`,
      brand: updatedBrand,
    };
  }

  async remove(id: string) {
    const brand = await this.findBrandById(id);
    if (brand.image) await this._cloudinaryService.deleteImage(brand.image);
    const deletedBrand = await this.brandModel.findByIdAndDelete(id).exec();
    return {
      message: `This action removes a #${id} brand`,
      brand: deletedBrand,
    };
  }
}
