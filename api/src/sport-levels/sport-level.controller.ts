import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards,UseInterceptors, ClassSerializerInterceptor  } from '@nestjs/common';

import { SportLevelService } from './sport-level.service';
import { SportLevel } from './sport-level.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('sport-level')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class SportLevelController {
  constructor(private readonly sportLevelService: SportLevelService) {}

  @Get()
  findAll(): Promise<SportLevel[]> {
    return this.sportLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SportLevel> {
    return this.sportLevelService.findOne(id);
  }

  @Post()
  create(@Body() levelData: Partial<SportLevel>): Promise<SportLevel> {
    return this.sportLevelService.create(levelData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() levelData: Partial<SportLevel>): Promise<SportLevel> {
    return this.sportLevelService.update(id, levelData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.sportLevelService.remove(id);
  }
}
