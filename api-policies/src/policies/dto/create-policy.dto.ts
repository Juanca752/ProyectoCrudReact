import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreatePolicyDto {
  @IsNotEmpty()
  @IsString()
  policyNumber: string; // policy_number

  @IsNotEmpty()
  @IsNumber()
  insurerId: number; // insurer_id

  @IsNotEmpty()
  @IsNumber()
  clientId: number; // client_id

  @IsNotEmpty()
  @IsNumber()
  policyTypeId: number; // policy_type_id

  @IsNotEmpty()
  @IsString()
  paymentFrequency: string; // payment_frequency

  @IsNotEmpty()
  @IsNumber()
  price: number; // price

  @IsNotEmpty()
  @IsDateString()
  startDate: string; // start_date

  @IsOptional()
  @IsDateString()
  endDate?: string; // end_date

  @IsOptional()
  @IsString()
  comments?: string; // comments

  @IsOptional()
  @IsString()
  filePath?: string; // file_path
}
