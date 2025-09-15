import { Point } from 'geojson';


export class CompanyStationsDto
{
    public readonly stationCompanyId: string;
    public readonly stationCompanyName: string;

    public readonly stationParentCompanyId: string | null;

    public readonly stationId: string;
    public readonly stationName: string;
    public readonly stationReference: string;
    public stationLocation: Point;

    public readonly stationTypeId: string;
    public readonly stationTypeName: string;
    public readonly stationTypeMaxPower: number;

    public readonly stationCreatedAt: Date;
    public readonly stationUpdatedAt: Date | null;


    constructor(station: any)
    {
        this.stationCompanyId = station.company_id;
        this.stationCompanyName = station.company_name;

        this.stationParentCompanyId = station.parent_company_id;

        this.stationId = station.stations_id;
        this.stationName = station.stations_name;
        this.stationReference = station.stations_reference;
        this.stationLocation = station.stations_location;

        this.stationTypeId = station.station_type_id;
        this.stationTypeName = station.station_type_name;
        this.stationTypeMaxPower = station.max_power;

        this.stationCreatedAt = station.created_at;
        this.stationUpdatedAt = station.updated_at;
    }
}