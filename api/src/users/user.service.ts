import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User|null> {
    return this.usersRepository.findOne({ 
        where: { id }
    })||null;
  }

  async findByEmail(email: string): Promise<User|null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User|null> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOne({ where: { id }})||null;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  
}
