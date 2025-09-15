import { StationNameVo } from '@stations/station/value-objects/station-name.vo';
import { StationCoordinatesVo } from '@stations/station/value-objects/station-coordinates.vo';


export class StationCreateDto
{
    public readonly companyId: number;
    public readonly stationTypeId: number;
    public readonly name: StationNameVo;
    public readonly location: StationCoordinatesVo;


    constructor(companyId: number, stationTypeId: number, name: string, location: number[])
    {
        this.companyId = companyId;
        this.stationTypeId = stationTypeId;

        this.name = new StationNameVo(name);

        this.location = new StationCoordinatesVo(location);
    }
}