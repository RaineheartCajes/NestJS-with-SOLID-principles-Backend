import { IsString, IsDateString } from 'class-validator';

export class CreateEventDto {
    @IsString()
    title: string;

    @IsDateString()
    startDate: string;  

    @IsDateString()
    endDate: string;   

    @IsString()
    color?: string;
}