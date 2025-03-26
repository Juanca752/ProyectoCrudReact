import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './policy.entity';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { Client } from '../clients/client.entity';
import { Insurer } from '../insurers/insurer.entity';
import { PolicyType } from '../policy_types/policy-type.entity';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Insurer)
    private readonly insurerRepository: Repository<Insurer>,
    @InjectRepository(PolicyType)
    private readonly policyTypeRepository: Repository<PolicyType>,
  ) {}

  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const client = await this.clientRepository.findOne({ where: { id: createPolicyDto.clientId } });
    const insurer = await this.insurerRepository.findOne({ where: { id: createPolicyDto.insurerId } });
    const policyType = await this.policyTypeRepository.findOne({ where: { id: createPolicyDto.policyTypeId } });

    const policy = this.policyRepository.create({ 
      policyNumber: createPolicyDto.policyNumber, 
      client, 
      insurer, 
      policyType 
    });

    return await this.policyRepository.save(policy);
  }

  async findAll(): Promise<Policy[]> {
    return await this.policyRepository.find();
  }

  async findOne(id: number): Promise<Policy> {
    return await this.policyRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePolicyDto: UpdatePolicyDto): Promise<Policy> {
    await this.policyRepository.update(id, updatePolicyDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.policyRepository.delete(id);
  }
}
