import { CompanyStationsDto } from '@companies/company/dtos/company.stations.dto';
import { HashidsLibInterface } from '@libs/hashids/hashids.interface';
import { Point } from 'geojson';


export class CompanyStationsResDto
{
    public readonly id: string;
    public readonly name: string;
    public readonly reference: string;
    public readonly location: Point;

    public readonly station_type: any;

    public readonly company: any;

    public readonly created_at: Date;
    public readonly updated_at: Date | null;


    constructor(companyStation: CompanyStationsDto, hashids: HashidsLibInterface)
    {
        this.id = hashids.encode(companyStation.stationId);

        this.name = companyStation.stationName;
        this.reference = companyStation.stationReference;

        this.location = companyStation.stationLocation;

        this.station_type = {
            id: hashids.encode(companyStation.stationTypeId),
            name: companyStation.stationTypeName,
            max_power: companyStation.stationTypeMaxPower
        };

        this.company = {
            id: hashids.encode(companyStation.stationCompanyId),
            name: companyStation.stationCompanyName,
            is_child_company: (companyStation.stationParentCompanyId !== null)
        };

        this.created_at = companyStation.stationCreatedAt;
        this.updated_at = companyStation.stationUpdatedAt;
    }
}