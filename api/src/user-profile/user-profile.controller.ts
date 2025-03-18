import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards,UseInterceptors, ClassSerializerInterceptor  } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users/:user_id/profile')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class UserProfileController {
  constructor(private readonly userProfilesService: UserProfileService) {}

  @Get()
  findOne(@Param('user_id') userId: number): Promise<UserProfile> {
    return this.userProfilesService.findByUserId(userId);
  }

  @Post()
  @Put() 
  createOrUpdate(@Param('user_id') userId: number, @Body() profileData: Partial<UserProfile>): Promise<UserProfile> {
    return this.userProfilesService.createOrUpdate(userId, profileData);
  }

  @Delete()
  remove(@Param('user_id') userId: number): Promise<void> {
    return this.userProfilesService.remove(userId);
  }
}
