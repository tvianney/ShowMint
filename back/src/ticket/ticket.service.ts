import { Injectable } from '@nestjs/common';
import { TicketDto, DeleteTicketDto } from './dto/ticket.dto';

@Injectable()
export class TicketService {
  create(createTicketDto: TicketDto) {
    return 'This action adds a new ticket';
  }

  remove(ticketDto: DeleteTicketDto) {
    return `This action removes a ticket`;
  }
}
