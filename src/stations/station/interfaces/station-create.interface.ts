import { StationCreateDto } from '@stations/station/dtos/station-create.dto';
import { StationDto } from '@stations/station/dtos/station.dto';


export interface StationCreateInterface
{
    exec(stationCreateDto: StationCreateDto): Promise<StationDto[]>;
}