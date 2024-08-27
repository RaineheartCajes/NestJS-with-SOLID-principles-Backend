import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Event as PrismaEvent } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class CalendarService {
  private readonly logger = new Logger(CalendarService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PrismaEvent[]> {
    try {
      return await this.prisma.event.findMany();
    } catch (error) {
      this.logger.error('Failed to fetch events', error.stack);
      throw new Error('Failed to fetch events');
    }
  }

  async findOne(id: number): Promise<PrismaEvent | null> {
    try {
      return await this.prisma.event.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to find event with ID ${id}`, error.stack);
      throw new Error(`Failed to find event with ID ${id}`);
    }
  }

  async create(createEventDto: CreateEventDto): Promise<PrismaEvent> {
    this.logger.log('Creating event with data:', createEventDto);
    try {
      const { title, startDate, endDate, color } = createEventDto;

      if (!startDate || !endDate) {
        throw new Error('startDate and endDate are required');
      }

      return await this.prisma.event.create({
        data: {
          title,
          startDate: new Date(startDate),  
          endDate: new Date(endDate),      
          color,
        },
      });
    } catch (error) {
      this.logger.error('Error creating event:', error.stack);
      throw new Error('Failed to create event');
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<PrismaEvent> {
    try {
      return await this.prisma.event.update({
        where: { id },
        data: {
          ...updateEventDto,
          startDate: updateEventDto.startDate ? new Date(updateEventDto.startDate) : undefined,
          endDate: updateEventDto.endDate ? new Date(updateEventDto.endDate) : undefined,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to update event with ID ${id}`, error.stack);
      throw new Error(`Failed to update event with ID ${id}`);
    }
  }

  async delete(id: number): Promise<PrismaEvent> {
    try {
      return await this.prisma.event.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete event with ID ${id}`, error.stack);
      throw new Error(`Failed to delete event with ID ${id}`);
    }
  }
}
