import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [EventModule, TicketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
