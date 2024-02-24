import { Controller, Post, Body, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() eventData: EventDto) {
    return this.eventService.create(eventData);
  }

  @Delete()
  remove(@Body('eventId') id: string) {
    return this.eventService.remove(id);
  }
}
