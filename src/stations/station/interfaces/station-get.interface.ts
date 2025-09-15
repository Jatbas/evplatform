import { StationDto } from '@stations/station/dtos/station.dto';


export interface StationGetInterface
{
    exec(id?: number): Promise<StationDto[]>;
}