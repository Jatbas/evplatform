import { StationTypeUpdateDto } from '@stations/station-type/dtos/station-type-update.dto';
import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';


export interface StationTypeUpdateInterface
{
    exec(id: number, stationTypeUpdateDto: StationTypeUpdateDto): Promise<StationTypeDto[]>;
}