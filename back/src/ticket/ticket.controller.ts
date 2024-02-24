import { Controller, Post, Body, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDto, DeleteTicketDto } from './dto/ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() ticketDto: TicketDto) {
    return this.ticketService.create(ticketDto);
  }

  @Delete()
  remove(@Body() ticketDto: DeleteTicketDto) {
    return this.ticketService.remove(ticketDto);
  }
}
