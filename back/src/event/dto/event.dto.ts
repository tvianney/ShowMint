import {IsBoolean, IsEmail, IsNotEmpty} from 'class-validator';

export class EventDto {
    @IsNotEmpty()
    nbPlaces: number

    @IsNotEmpty()
    imgUrl: string

    @IsNotEmpty()
    artistName: string

    description: string

    @IsNotEmpty()
    structureId: string

    @IsBoolean()
    isTransferable: boolean

    @IsBoolean()
    isRefundable: boolean
}
