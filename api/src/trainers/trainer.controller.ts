import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards,UseInterceptors, ClassSerializerInterceptor  } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { Trainer } from './trainer.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('trainers')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class TrainerController {
    constructor(private readonly trainerService: TrainerService) {}

    @Get()
    findAll(): Promise<Trainer[]> {
        return this.trainerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Trainer> {
        return this.trainerService.findOne(id);
    }

    @Post()
    create(@Body() trainerData: Partial<Trainer>): Promise<Trainer> {
        return this.trainerService.create(trainerData);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() trainerData: Partial<Trainer>): Promise<Trainer> {
        return this.trainerService.update(id, trainerData);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.trainerService.remove(id);
    }
}