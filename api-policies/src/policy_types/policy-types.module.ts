import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicyTypesService } from './policy-types.service';
import { PolicyTypesController } from './policy-types.controller';
import { PolicyType } from './policy-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PolicyType])],
  controllers: [PolicyTypesController],
  providers: [PolicyTypesService],
  exports: [PolicyTypesService],
})
export class PolicyTypesModule {}
