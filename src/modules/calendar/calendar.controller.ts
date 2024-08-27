import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Event as PrismaEvent } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  findAll(): Promise<PrismaEvent[]> {
    return this.calendarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PrismaEvent | null> {
    return this.calendarService.findOne(id);
  }
  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<PrismaEvent> {
    return this.calendarService.create(createEventDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<PrismaEvent> {
    return this.calendarService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<PrismaEvent> {
    return this.calendarService.delete(id);
  }
}
