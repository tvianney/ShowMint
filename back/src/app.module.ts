import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EventModule, TicketModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
