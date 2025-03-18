import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportLevel } from './sport-level.entity';

@Injectable()
export class SportLevelService {
  constructor(
    @InjectRepository(SportLevel)
    private readonly sportLevelsRepository: Repository<SportLevel>,
  ) {}

  async findAll(): Promise<SportLevel[]> {
    return this.sportLevelsRepository.find();
  }

  async findOne(id: number): Promise<SportLevel> {
    const sportLevel = await this.sportLevelsRepository.findOne({ where: { id } });
    if (!sportLevel) {
      throw new NotFoundException(`Sport Level with ID ${id} not found`);
    }
    return sportLevel;
  }

  async create(levelData: Partial<SportLevel>): Promise<SportLevel> {
    const sportLevel = this.sportLevelsRepository.create(levelData);
    return this.sportLevelsRepository.save(sportLevel);
  }

  async update(id: number, levelData: Partial<SportLevel>): Promise<SportLevel> {
    const sportLevel=await this.findOne(id);
    if (!sportLevel) {
      throw new NotFoundException(`Sport Level with ID ${id} not found`);
    }
    await this.sportLevelsRepository.update(id, levelData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const sportLevel = await this.findOne(id);
    await this.sportLevelsRepository.delete(sportLevel.id);
  }
}
