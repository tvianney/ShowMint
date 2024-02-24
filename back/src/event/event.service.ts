import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { IPFSMetadata } from './entities/event.entity';
import { promises as fs } from 'fs';
import { store } from 'aleph-sdk-ts/dist/messages';
import { ImportAccountFromPrivateKey } from 'aleph-sdk-ts/dist/accounts/ethereum';
import { ItemType } from 'aleph-sdk-ts/dist/messages/types';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import { createWalletClient, http } from 'viem';
import { polygonMumbai } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const exec = promisify(execCallback);

@Injectable()
export class EventService {
  walletClient: import('viem').WalletClient;
  account: import('viem').PrivateKeyAccount;

  constructor() {
    this.account = privateKeyToAccount(
      '0xb29dcdfd5b8e3bdf23d74227c72d4bc4c4b872266ea1bba6baecefb1f867c138',
    );
    this.walletClient = createWalletClient({
      account: this.account,
      chain: polygonMumbai,
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
      // TODO mettre dans .env
      const account = await ImportAccountFromPrivateKey(
        'b29dcdfd5b8e3bdf23d74227c72d4bc4c4b872266ea1bba6baecefb1f867c138',
      );

      await store.Publish({
        account: account,
        channel: 'ShowMint',
        fileHash: cid,
        storageEngine: ItemType.ipfs,
      });
    } catch (error) {
      console.error('Error during pin on aleph.im:', error);
      throw error;
    }
  }

  async deployContract(createEventDto: EventDto) {
    const hash = await this.walletClient.deployContract({
      abi,
      account: this.account.publicKey,
      args: [69420],
      bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
    });
    console.log(hash);
  }

  async create(createEventDto: EventDto) {
    this.createMetadatas(createEventDto);
    const cid = await this.publishMetadataOnIPFS(createEventDto.nbPlaces);
    this.pinOnAleph(cid);
    await this.deployContract(createEventDto);
  }

  remove(id: string) {
    return `This action removes a event`;
  }
}
