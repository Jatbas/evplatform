import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';
import { StationTypeCreateDto } from '@stations/station-type/dtos/station-type-create.dto';
import { StationTypeUpdateDto } from '@stations/station-type/dtos/station-type-update.dto';


export interface StationTypeRepositoryInterface
{
     get(id?: number): Promise<StationTypeDto[]>;
     create(stationTypeCreateDto: StationTypeCreateDto): Promise<StationTypeDto[]>;
     update(id: number, stationTypeUpdateDto: StationTypeUpdateDto): Promise<StationTypeDto[]>;
     delete(id: number): Promise<boolean>;
}