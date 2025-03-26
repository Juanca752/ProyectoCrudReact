import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolicyType } from './policy-type.entity';
import { CreatePolicyTypeDto } from './dto/create-policy-type.dto';
import { UpdatePolicyTypeDto } from './dto/update-policy-type.dto';

@Injectable()
export class PolicyTypesService {
  constructor(
    @InjectRepository(PolicyType)
    private readonly policyTypeRepository: Repository<PolicyType>,
  ) {}

  async create(createPolicyTypeDto: CreatePolicyTypeDto): Promise<PolicyType> {
    const policyType = this.policyTypeRepository.create(createPolicyTypeDto);
    return await this.policyTypeRepository.save(policyType);
  }

  async findAll(): Promise<PolicyType[]> {
    return await this.policyTypeRepository.find();
  }

  async findOne(id: number): Promise<PolicyType> {
    return await this.policyTypeRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePolicyTypeDto: UpdatePolicyTypeDto): Promise<PolicyType> {
    await this.policyTypeRepository.update(id, updatePolicyTypeDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.policyTypeRepository.delete(id);
  }
}
