import { StationTypeNameVo } from '@stations/station-type/value-objects/station-type-name.vo';


export class StationTypeCreateDto
{
    public readonly name: StationTypeNameVo;
    public readonly maxPower: number;


    constructor(name: string, maxPower: number)
    {
        this.name = new StationTypeNameVo(name);
        this.maxPower = maxPower;
    }
}