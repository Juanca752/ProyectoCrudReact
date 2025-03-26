import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsNumber()
  policyId: number; // policy_id

  @IsNotEmpty()
  @IsNumber()
  userId: number; // user_id

  @IsNotEmpty()
  @IsNumber()
  clientId: number; // client_id

  @IsNotEmpty()
  @IsNumber()
  total: number; // total

  @IsNotEmpty()
  @IsDateString()
  issueDate: string; // issue_date
}
