import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './trainer.entity';

@Injectable()
export class TrainerService {
    constructor(
        @InjectRepository(Trainer)
        private readonly trainerRepository: Repository<Trainer>,
    ) {}

    findAll(): Promise<Trainer[]> {
        return this.trainerRepository.find();
    }

    findOne(id: number): Promise<Trainer> {
        return this.trainerRepository.findOne({ where: { id } });
    }

    create(trainerData: Partial<Trainer>): Promise<Trainer> {
        const trainer = this.trainerRepository.create(trainerData);
        return this.trainerRepository.save(trainer);
    }

    async update(id: number, trainerData: Partial<Trainer>): Promise<Trainer> {
        await this.trainerRepository.update(id, trainerData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.trainerRepository.delete(id);
    }
}