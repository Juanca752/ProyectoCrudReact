import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { User } from '../users/user.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async findByUserId(userId: number): Promise<UserProfile> {
    const profile = await this.userProfileRepository.findOne({ where: { user: { id: userId } }, relations: ['user'] });
    if (!profile) {
      throw new NotFoundException(`Profile for user ID ${userId} not found`);
    }
    return profile;
  }

  async createOrUpdate(userId: number, profileData: Partial<UserProfile>): Promise<UserProfile> {
    let profile = await this.userProfileRepository.findOne({ where: { user: { id: userId } } });

    if (profile) {
      await this.userProfileRepository.update(profile.id, profileData);
      return this.userProfileRepository.findOne({ where: { id: profile.id }, relations: ['user'] });
    }

    profile = this.userProfileRepository.create({ ...profileData, user: { id: userId } as User });
    return this.userProfileRepository.save(profile);
  }

  async remove(userId: number): Promise<void> {
    const profile = await this.findByUserId(userId);
    await this.userProfileRepository.delete(profile.id);
  }
}
