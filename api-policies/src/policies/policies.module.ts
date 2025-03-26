import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { Policy } from './policy.entity';
import { Client } from '../clients/client.entity';
import { Insurer } from '../insurers/insurer.entity';
import { PolicyType } from '../policy_types/policy-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Policy, Client, Insurer, PolicyType])],
  controllers: [PoliciesController],
  providers: [PoliciesService],
  exports: [PoliciesService],
})
export class PoliciesModule {}
