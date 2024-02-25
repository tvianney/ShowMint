import { Controller, Post, Body } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDto } from './dto/ticket.dto';
import { Result } from 'src/ticket/entities/ticket.entity';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(@Body() ticketDto: TicketDto): Promise<Result> {
    return await this.ticketService.create(ticketDto);
  }
}
