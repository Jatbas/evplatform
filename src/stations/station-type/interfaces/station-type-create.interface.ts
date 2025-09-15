import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';
import { StationTypeCreateDto } from '@stations/station-type/dtos/station-type-create.dto';


export interface StationTypeCreateInterface
{
    exec(stationTypeCreateDto: StationTypeCreateDto): Promise<StationTypeDto[]>;
}