import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventService {
  create(createEventDto: EventDto) {

  }

  remove(id: string) {
    return `This action removes a event`;
  }
}
