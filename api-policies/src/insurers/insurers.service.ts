import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insurer } from './insurer.entity';
import { CreateInsurerDto } from './dto/create-insurer.dto';
import { UpdateInsurerDto } from './dto/update-insurer.dto';

@Injectable()
export class InsurersService {
  constructor(
    @InjectRepository(Insurer)
    private readonly insurerRepository: Repository<Insurer>,
  ) {}

  async create(createInsurerDto: CreateInsurerDto): Promise<Insurer> {
    const insurer = this.insurerRepository.create(createInsurerDto);
    return await this.insurerRepository.save(insurer);
  }

  async findAll(): Promise<Insurer[]> {
    return await this.insurerRepository.find();
  }

  async findOne(id: number): Promise<Insurer> {
    return await this.insurerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateInsurerDto: UpdateInsurerDto): Promise<Insurer> {
    await this.insurerRepository.update(id, updateInsurerDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.insurerRepository.delete(id);
  }
}
