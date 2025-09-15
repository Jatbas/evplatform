import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';
import { StationTypeCreateReqDto } from '@stations/station-type/dtos/station-type-create-req.dto';
import { StationTypeUpdateReqDto } from '@stations/station-type/dtos/station-type-update-req.dto';


export interface StationTypeServiceInterface
{
     get(id?: number): Promise<StationTypeDto[]>;
     create(stationTypeCreateResDto: StationTypeCreateReqDto): Promise<StationTypeDto[]>
     update(id: number, stationTypeUpdateReqDto: StationTypeUpdateReqDto): Promise<StationTypeDto[]>;
     delete(id: number): Promise<boolean>;
}