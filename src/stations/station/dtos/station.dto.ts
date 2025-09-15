import { Point } from 'geojson';
import { Station } from '@stations/entities/station.entity';
import { StationType } from '@stations/entities/station-type.entity';
import { Company } from '@companies/entities/company.entity';


export class StationDto
{
    public readonly id: string;
    public readonly companyId: string;
    public readonly stationTypeId: string;
    public readonly name: string;
    public location: Point;
    public readonly reference: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date|null;

    public company: Company;
    public stationType: StationType;


    constructor(station: Station)
    {
        this.id = station.id;
        this.companyId = station.companyId;
        this.stationTypeId = station.stationTypeId;
        this.name = station.name;
        this.location = station.location;
        this.reference = station.reference;
        this.createdAt = station.createdAt;
        this.updatedAt = station.updatedAt;
    }
}