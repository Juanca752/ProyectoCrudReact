// src/controllers/sports.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards,UseInterceptors, ClassSerializerInterceptor  } from '@nestjs/common';

import { SportService } from './sport.service';
import { Sport } from './sport.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('sports')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class SportController {
  constructor(private readonly sportsService: SportService) {}

  @Get()
  async findAll(): Promise<Sport[]> {
    return this.sportsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Sport> {
    return this.sportsService.findOne(id);
  }

  @Post()
  async create(@Body() sportData: Partial<Sport>): Promise<Sport> {
    return this.sportsService.create(sportData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() sportData: Partial<Sport>): Promise<Sport> {
    return this.sportsService.update(id, sportData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.sportsService.remove(id);
  }
}