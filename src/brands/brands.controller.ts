import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from 'src/common/mongo-id.pipe';

import { BrandsService } from './brands.service';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @ApiOperation({ summary: 'Create brand' })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: 'List of brands' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get brand by id' })
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update brand by id' })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete brand by id' })
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.remove(id);
  }
}
