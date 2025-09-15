import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';


export class StationTypeResDto
{
    public readonly id: string;
    public readonly name: string;
    public readonly power_max: number;
    public readonly created_at: Date;
    public readonly updated_at: Date | null;


    constructor(stationType: StationTypeDto, hashids: HashidsLibInterface)
    {
        this.id = hashids.encode(stationType.id);

        this.name = stationType.name;
        this.power_max = stationType.powerMax;

        this.created_at = stationType.createdAt;
        this.updated_at = stationType.updatedAt;
    }
}