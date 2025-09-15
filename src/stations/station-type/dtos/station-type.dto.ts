import { StationType } from '@stations/entities/station-type.entity';


export class StationTypeDto
{
    public readonly id: string;
    public readonly name: string;
    public readonly powerMax: number;
    public readonly createdAt: Date;
    public readonly updatedAt: Date | null;


    constructor(stationType: StationType)
    {
        this.id = stationType.id;
        this.name = stationType.name;
        this.powerMax = stationType.maxPower;
        this.createdAt = stationType.createdAt;
        this.updatedAt = stationType.updatedAt;
    }
}