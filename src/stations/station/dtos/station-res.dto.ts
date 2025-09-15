import { Point } from 'geojson';
import { StationDto } from '@stations/station/dtos/station.dto';
import { CompanyMinResDto } from '@companies/company-associations/dtos/company-min-res.dto';
import { StationTypeMinResDto } from '@stations/station-type/dtos/station-type-min-res.dto';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';


export class StationResDto
{
    public readonly id: string;
    public readonly name: string;
    public readonly reference: string;
    public readonly location: Point;
    public readonly company: CompanyMinResDto;
    public readonly station_type: StationTypeMinResDto;
    public readonly created_at: Date;
    public readonly updated_at: Date | null;


    constructor(station: StationDto, company: CompanyMinResDto, stationType: StationTypeMinResDto, hashids: HashidsLibInterface)
    {
        this.id = hashids.encode(station.id);

        this.name = station.name;
        this.reference = station.reference;

        this.location = station.location;

        this.company = company;

        this.station_type = stationType;

        this.created_at = station.createdAt;
        this.updated_at = station.updatedAt;
    }
}