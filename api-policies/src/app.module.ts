import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';

import { User } from './users/user.entity';
import { UsersModule } from './users/user.module';

import { Client } from './clients/client.entity';
import { ClientsModule } from './clients/clients.module';

import { Insurer } from './insurers/insurer.entity';
import { InsurersModule } from './insurers/insurers.module';

import { PolicyType } from './policy_types/policy-type.entity';
import { PolicyTypesModule } from './policy_types/policy-types.module';

import { Invoice } from './invoices/invoice.entity';
import { InvoicesModule } from './invoices/invoices.module';

import { Policy } from './policies/policy.entity';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: 
  [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User,Client, Insurer, PolicyType, Policy, Invoice],
        synchronize: false,
    }),
    UsersModule,
    AuthModule,
    ClientsModule, InsurersModule, PolicyTypesModule, PoliciesModule, InvoicesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
