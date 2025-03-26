import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInsurerDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
