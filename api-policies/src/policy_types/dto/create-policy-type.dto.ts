import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePolicyTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
