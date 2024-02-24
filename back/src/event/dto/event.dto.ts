import { IsBoolean, IsNotEmpty } from 'class-validator';

export class EventDto {
  @IsNotEmpty()
  nbPlaces: number;

  @IsNotEmpty()
  imgUrl: string;

  @IsNotEmpty()
  metadataName: string;

  metadataDescription: string;

  @IsNotEmpty()
  eventId: string;

  @IsBoolean()
  isTransferable: boolean;

  @IsBoolean()
  isRefundable: boolean;
}
