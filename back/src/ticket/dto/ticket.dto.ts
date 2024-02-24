import {IsBoolean, IsEmail, IsNotEmpty, IsOptional} from 'class-validator';

export class TicketDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    eventId: string
}

export class DeleteTicketDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    event: string

    @IsNotEmpty()
    nbPlaces: number
}
