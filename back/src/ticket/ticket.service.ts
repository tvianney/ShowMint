import { Injectable } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { Result } from 'src/ticket/entities/ticket.entity';
import { Get as getAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import {
  ETHAccount,
  ImportAccountFromPrivateKey,
  NewAccount,
} from 'aleph-sdk-ts/dist/accounts/ethereum';
import { User } from './entities/user.entity';
import { Publish as publishAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';
import { ticketContract } from '../abi/Ticket';

@Injectable()
export class TicketService {
  accountAleph: ETHAccount;
  accountViem: import('viem').PrivateKeyAccount;
  walletClient: import('viem').WalletClient;

  constructor() {
    // TODO faire .env
    this.accountAleph = ImportAccountFromPrivateKey(
      '0xb29dcdfd5b8e3bdf23d74227c72d4bc4c4b872266ea1bba6baecefb1f867c138',
    );
    this.accountViem = privateKeyToAccount(
      '0xb29dcdfd5b8e3bdf23d74227c72d4bc4c4b872266ea1bba6baecefb1f867c138',
    );
    this.walletClient = createWalletClient({
      account: this.accountViem,
      chain: sepolia,
      transport: http(),
    });
  }

  async findUser(email: string): Promise<string> {
    const user = (await getAggregate({
      key: email,
      address: this.accountAleph.address,
      APIServer: 'https://api2.aleph.im',
    })) as User | null;

    if (!user) {
      const address = NewAccount().account.address;
      await publishAggregate({
        account: this.accountAleph,
        key: email,
        content: { publicKey: address },
        channel: 'ShowMint',
      });
      return address;
    } else {
      return user.publicAddress;
    }
  }

  async mintTicket(userAddress: string, contractAddress: `0x${string}`) {
    await this.walletClient.writeContract({
      account: this.accountViem,
      chain: sepolia,
      address: contractAddress,
      abi: ticketContract.abi,
      functionName: 'mint',
      args: [userAddress],
    });
  }

  async create(createTicketDto: TicketDto): Promise<Result> {
    const userAddress = await this.findUser(createTicketDto.email);
    // const contractAddress;
    this.mintTicket(userAddress, '0x1234567890');

    return { message: 'The ticket was created succesfully' };
  }
}