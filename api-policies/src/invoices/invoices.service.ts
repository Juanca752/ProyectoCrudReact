import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Policy } from '../policies/policy.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const policy = await this.policyRepository.findOne({ where: { id: createInvoiceDto.policyId } });

    if (!policy) {
      throw new Error('Policy not found');
    }

    const invoice = this.invoiceRepository.create({ 
      policy, 
      total: createInvoiceDto.total, 
      issueDate: new Date(createInvoiceDto.issueDate) 
    });

    return await this.invoiceRepository.save(invoice);
  }

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepository.find();
  }

  async findOne(id: number): Promise<Invoice> {
    return await this.invoiceRepository.findOne({ where: { id } });
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    await this.invoiceRepository.update(id, updateInvoiceDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.invoiceRepository.delete(id);
  }
}
