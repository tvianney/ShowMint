import {IsBoolean, IsEmail, IsNotEmpty} from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
}
