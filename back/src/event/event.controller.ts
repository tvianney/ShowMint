import { Controller, Post, Body } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';
import { Result } from './entities/event.entity';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() eventData: EventDto): Promise<Result> {
    return await this.eventService.create(eventData);
  }
}
