import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportLevelService } from './sport-level.service';
import { SportLevelController } from './sport-level.controller';
import { SportLevel } from './sport-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SportLevel])],
  controllers: [SportLevelController],
  providers: [SportLevelService],
  exports: [SportLevelService],
})
export class SportLevelModule {}
