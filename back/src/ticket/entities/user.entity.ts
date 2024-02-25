import { Ticket } from './ticket.entity';

export class User {
  publicKey: string;
  privateKey: string;
  tickets: Ticket[];
}
