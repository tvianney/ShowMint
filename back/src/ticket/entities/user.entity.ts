import { Ticket } from './ticket.entity';

export class User {
  publicAddress: string;
  privateAddress: string;
  tickets: Ticket[];
}
