import { StationTypeNameVo } from '@stations/station-type/value-objects/station-type-name.vo';


export class StationTypeUpdateDto
{
    public readonly name?: StationTypeNameVo;
    public readonly maxPower?: number;


    constructor(name: string, maxPower: number)
    {
        if (name !== undefined)
        {
            this.name = new StationTypeNameVo(name);
        }


        if (maxPower !== undefined)
        {
            this.maxPower = maxPower;
        }
    }
}