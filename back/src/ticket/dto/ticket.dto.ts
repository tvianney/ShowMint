import { IsEmail, IsNotEmpty } from 'class-validator';

export class TicketDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  eventId: string;
}
