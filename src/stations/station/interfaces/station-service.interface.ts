import { StationDto } from '@stations/station/dtos/station.dto';
import { StationCreateReqDto } from '@stations/station/dtos/station-create-req.dto';
import { StationUpdateReqDto } from '@stations/station/dtos/station-update-req.dto';


export interface StationServiceInterface
{
     get(id?: number): Promise<StationDto[]>;
     create(companyId: number, stationTypeId: number, stationCreateReqDto: StationCreateReqDto): Promise<StationDto[]>;
     update(id: number, stationUpdateReqDto: StationUpdateReqDto): Promise<StationDto[]>;
     delete(id: number): Promise<boolean>;
}