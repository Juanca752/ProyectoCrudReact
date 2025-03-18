import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/user.module';
import { User } from './users/user.entity';

import { Trainer } from './trainers/trainer.entity';
import { TrainerModule } from './trainers/trainer.module';

import { Sport } from './sports/sport.entity';
import { SportModule } from './sports/sport.module';

import { AuthModule } from './auth/auth.module';

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
        entities: [User, Trainer, Sport],
        synchronize: false,
    }),
    UsersModule,
    AuthModule,
    TrainerModule,
    SportModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
