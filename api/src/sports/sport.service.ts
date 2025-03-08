// src/services/sports.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './sport.entity';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
  ) {}

  async findAll(): Promise<Sport[]> {
    return this.sportRepository.find();
  }

  async findOne(id: number): Promise<Sport> {
    return this.sportRepository.findOne({ where: { id } });
  }

  async create(sportData: Partial<Sport>): Promise<Sport> {
    const sport = this.sportRepository.create(sportData);
    return this.sportRepository.save(sport);
  }

  async update(id: number, sportData: Partial<Sport>): Promise<Sport> {
    await this.sportRepository.update(id, sportData);
    return this.sportRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.sportRepository.delete(id);
  }
}