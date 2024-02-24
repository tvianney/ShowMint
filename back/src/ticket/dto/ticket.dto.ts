import { IsEmail, IsNotEmpty } from 'class-validator';

export class TicketDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  eventId: string;
}

export class DeleteTicketDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  event: string;

  @IsNotEmpty()
  nbPlaces: number;
}
