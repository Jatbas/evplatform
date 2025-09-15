import { StationNameVo } from '@stations/station/value-objects/station-name.vo';
import { StationCoordinatesVo } from '@stations/station/value-objects/station-coordinates.vo';


export class StationUpdateDto
{
    public readonly name?: StationNameVo;
    public readonly location?: StationCoordinatesVo;


    constructor(name: string, location: number[])
    {
        if (name !== undefined)
        {
            this.name = new StationNameVo(name);
        }


        if (location !== undefined)
        {
            this.location = new StationCoordinatesVo(location);
        }
    }
}