import {IsBoolean, IsNotEmpty} from "class-validator";

export class Event {
    adress: string

    nbPlaces: number

    imgUrl: string

    artistName: string

    description: string

    structureId: string

    isTransferable: boolean

    isRefundable: boolean
}
