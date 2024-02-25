import { Controller, Post, Body } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() eventData: EventDto) {
    return this.eventService.create(eventData);
  }
}
