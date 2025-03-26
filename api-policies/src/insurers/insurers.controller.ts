import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards,UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InsurersService } from './insurers.service';
import { CreateInsurerDto } from './dto/create-insurer.dto';
import { UpdateInsurerDto } from './dto/update-insurer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('insurers')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class InsurersController {
  constructor(private readonly insurersService: InsurersService) {}

  @Post()
  create(@Body() createInsurerDto: CreateInsurerDto) {
    return this.insurersService.create(createInsurerDto);
  }

  @Get()
  findAll() {
    return this.insurersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.insurersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateInsurerDto: UpdateInsurerDto) {
    return this.insurersService.update(id, updateInsurerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.insurersService.remove(id);
  }
}
