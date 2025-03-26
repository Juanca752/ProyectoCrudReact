import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsurersService } from './insurers.service';
import { InsurersController } from './insurers.controller';
import { Insurer } from './insurer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Insurer])],
  controllers: [InsurersController],
  providers: [InsurersService],
  exports: [InsurersService],
})
export class InsurersModule {}
