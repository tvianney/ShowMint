import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { IPFSMetadata, Result } from './entities/event.entity';
import { promises as fs } from 'fs';
import { store } from 'aleph-sdk-ts/dist/messages';
import {
  ETHAccount,
  ImportAccountFromPrivateKey,
} from 'aleph-sdk-ts/dist/accounts/ethereum';
import { ItemType } from 'aleph-sdk-ts/dist/messages/types';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import { createPublicClient, createWalletClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { ticketContract } from '../abi/Ticket';
import { Publish as publishAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';

const exec = promisify(execCallback);

@Injectable()
export class EventService {
  publicClient: import('viem').PublicClient;
  walletClient: import('viem').WalletClient;
  accountAleph: ETHAccount;
  accountViem: import('viem').PrivateKeyAccount;

  constructor() {
    // TODO faire .env
    this.accountAleph = ImportAccountFromPrivateKey(
      '0xb29dcdfd5b8e3bdf23d74227c72d4bc4c4b872266ea1bba6baecefb1f867c138',
    );
    this.accountViem = privateKeyToAccount(
      '0xb29dcdfd5b8e3bdf23d74227c72d4bc4c4b872266ea1bba6baecefb1f867c138',
    );
    this.publicClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    }) as any;
    this.walletClient = createWalletClient({
      account: this.accountViem,
      chain: sepolia,
      transport: http(),
    });
  }

  async createMetadatas(createEventDto: EventDto) {
    const metadatas: IPFSMetadata[] = [];

    try {
      await fs.rm('metadatas', { recursive: true });
    } catch {}

    await fs.mkdir('metadatas');

    for (let i = 0; i < createEventDto.nbPlaces; i++) {
      metadatas.push({
        image: createEventDto.imgUrl,
        name: createEventDto.metadataName + ` #${i}`,
        description: createEventDto.metadataDescription,
      });
      await fs.writeFile('metadatas/' + i, JSON.stringify(metadatas[i]));
    }
  }

  async publishMetadataOnIPFS(nbPlaces: number): Promise<string> {
    try {
      // Faire un ipfs daemon pour que ça publish
      const { stdout } = await exec('ipfs add -r metadatas');
      return stdout.split('\n')[nbPlaces].split(' ')[1];
    } catch (error) {
      console.error('Error during publish on IPFS:', error);
      throw error;
    }
  }

  async pinOnAleph(cid: string) {
    try {
      await store.Publish({
        account: this.accountAleph,
        channel: 'ShowMint',
        fileHash: cid,
        storageEngine: ItemType.ipfs,
      });
    } catch (error) {
      console.error('Error during pin on aleph.im:', error);
      throw error;
    }
  }

  async deployContract(createEventDto: EventDto, cid: string): Promise<string> {
    const hash = await this.walletClient.deployContract({
      abi: ticketContract.abi,
      account: this.accountViem,
      args: [
        createEventDto.metadataName,
        createEventDto.metadataDescription.slice(0, 3),
        createEventDto.nbPlaces,
        createEventDto.isTransferable,
        createEventDto.isRefundable,
        'ipfs://' + cid + '/',
      ] as any[],
      bytecode: ticketContract.bytecode.object as `0x${string}`,
      chain: sepolia,
    });
    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
    return receipt.contractAddress;
  }

  async aggregateOnAleph(eventId: string, contractAddress: string) {
    await publishAggregate({
      account: this.accountAleph,
      key: eventId,
      content: { contractAddress },
      channel: 'ShowMint',
    });
  }

  async create(createEventDto: EventDto): Promise<Result> {
    this.createMetadatas(createEventDto);
    const cid = await this.publishMetadataOnIPFS(createEventDto.nbPlaces);
    this.pinOnAleph(cid);
    const contractAddress = await this.deployContract(createEventDto, cid);
    await this.aggregateOnAleph(createEventDto.eventId, contractAddress);
    console.log('Contract Deployed:', contractAddress);
    return {
      message: 'The event was created succesfully',
      contractAddress: contractAddress,
    };
  }
}
