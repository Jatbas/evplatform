import { SimulationReqDto } from '@simulation/dtos/simulation-req.dto';
import { SimulationSnapshotType } from '@simulation/types/simulation-snapshot.type';


export interface SimulationServiceInterface
{
    exec(dto: SimulationReqDto): Promise<SimulationSnapshotType[]>;
}