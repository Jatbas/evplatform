import { StationType } from '@stations/entities/station-type.entity';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';


export class StationTypeMinResDto
{
    public readonly id: string;
    public readonly name: string;


    constructor(stationType: StationType, hashids: HashidsLibInterface)
    {
        this.id = hashids.encode(stationType.id);
        this.name = stationType.name;
    }
}