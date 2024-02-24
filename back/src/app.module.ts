import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EventModule, TicketModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
