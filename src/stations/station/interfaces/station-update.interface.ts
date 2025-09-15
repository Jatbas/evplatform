import { StationUpdateDto } from '@stations/station/dtos/station-update.dto';
import { StationDto } from '@stations/station/dtos/station.dto';


export interface StationUpdateInterface
{
    exec(id: number, stationUpdateDto: StationUpdateDto): Promise<StationDto[]>;
}