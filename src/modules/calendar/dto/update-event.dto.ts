import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsDateString()
  @IsOptional()
  start?: string;  

  @IsDateString()
  @IsOptional()
  end?: string;    

  @IsString()
  @IsOptional()
  color?: string;
  startDate: any;
  endDate: any;
}
