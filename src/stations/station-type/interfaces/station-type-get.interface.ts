import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';


export interface StationTypeGetInterface
{
    exec(id?: number): Promise<StationTypeDto[]>;
}