import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Hashids from 'hashids';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';


@Injectable()
export class HashidsLib implements HashidsLibInterface
{
    private hashids: Hashids;

    constructor(private readonly configService: ConfigService)
    {
        this.hashids = new Hashids(this.configService.get('HASHID_SECRET'), 20);
    }


    /***/


    public encode(id: number | string): string
    {
        const num = +id;

        if (isNaN(num) === true)
        {
            throw new Error('Invalid id: not a number');
        }


        return this.hashids.encode(+id);
    }

    public decode(hash: string): number | null
    {
        if (isNaN(Number(hash)) === false)
        {
            return Number(hash);
        }
        const [id] = this.hashids.decode(hash);

        return ((typeof id === 'number') ? id : null);
    }
}