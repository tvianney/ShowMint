import { Injectable } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { Result, TicketUser } from 'src/ticket/entities/ticket.entity';
import { Get as getAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import {
  ETHAccount,
  ImportAccountFromPrivateKey,
  NewAccount,
} from 'aleph-sdk-ts/dist/accounts/ethereum';
import { User } from './entities/user.entity';
import { Publish as publishAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';
import { ticketContract } from '../abi/Ticket';
import { Event } from 'src/event/entities/event.entity';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execCallback);

@Injectable()
export class TicketService {
  accountAleph: ETHAccount;
  accountViem: import('viem').PrivateKeyAccount;
  walletClient: import('viem').WalletClient;
  publicClient: import('viem').PublicClient;
  tokenId: number = 0;

  constructor() {
    this.accountAleph = ImportAccountFromPrivateKey(process.env.PRIVATE_KEY);
    this.accountViem = privateKeyToAccount(
      process.env.PRIVATE_KEY as `0x${string}`,
    );
    this.walletClient = createWalletClient({
      account: this.accountViem,
      chain: sepolia,
      transport: http(),
    });
    this.publicClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    }) as any;
  }

  async findUser(email: string): Promise<string> {
    const data = (await getAggregate({
      key: email,
      address: this.accountAleph.address,
      APIServer: 'https://api2.aleph.im',
    })) as User[];

    if (!data[email]) {
      const address = NewAccount().account.address;
      await publishAggregate({
        account: this.accountAleph,
        key: email,
        content: { publicKey: address },
        channel: 'ShowMint',
      });
      return address;
    } else {
      return data[email].publicKey;
    }
  }

  async getContractAddress(eventId: string): Promise<string> {
    const data = (await getAggregate({
      address: this.accountAleph.address,
      APIServer: 'https://api2.aleph.im',
    })) as Event[];
    return data[eventId].contractAddress;
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

  async addTickets(email: string, eventId: string, address: string) {
    await publishAggregate({
      account: this.accountAleph,
      key: email,
      content: {
        publicKey: address,
        tickets: { eventId: eventId, tokenId: this.tokenId },
      },
      channel: 'ShowMint',
    });
    this.tokenId++;
  }

  async create(createTicketDto: TicketDto): Promise<Result> {
    const userAddress = await this.findUser(createTicketDto.email);
    const contractAddress = await this.getContractAddress(
      createTicketDto.eventId,
    );
    this.mintTicket(userAddress, contractAddress as `0x${string}`);
    this.addTickets(
      createTicketDto.email,
      createTicketDto.eventId,
      userAddress,
    );

    return { message: 'The ticket was created succesfully' };
  }

  async getTokenURI(
    contractAddress: `0x${string}`,
    tokenId: number,
  ): Promise<TicketUser> {
    const data = (await this.publicClient.readContract({
      account: this.accountViem,
      address: contractAddress,
      abi: ticketContract.abi,
      functionName: 'tokenURI',
      args: [tokenId],
    })) as string;

    const { stdout } = await exec(`ipfs cat ${data.substring(7)}`);

    return JSON.parse(stdout) as TicketUser;
  }

  async getUserTickets(email: string): Promise<TicketUser[]> {
    const data = (await getAggregate({
      key: email,
      address: this.accountAleph.address,
      APIServer: 'https://api2.aleph.im',
    })) as User[];

    const contractAddress = await this.getContractAddress(
      data[email].tickets.eventId,
    );

    return [
      await this.getTokenURI(
        contractAddress as `0x${string}`,
        data[email].tickets.tokenId,
      ),
    ];
  }
}
