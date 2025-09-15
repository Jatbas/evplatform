import { StationDto } from '@stations/station/dtos/station.dto';
import { StationCreateDto } from '@stations/station/dtos/station-create.dto';
import { StationUpdateDto } from '@stations/station/dtos/station-update.dto';


export interface StationRepositoryInterface
{
    get(id?: number): Promise<StationDto[]>;
    create(stationCreateDto: StationCreateDto): Promise<StationDto[]>;
    update(id: number, stationUpdateDto: StationUpdateDto): Promise<StationDto[]>;
    delete(id: number): Promise<boolean>;
}