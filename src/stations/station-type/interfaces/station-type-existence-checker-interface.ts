import { StationType } from '@stations/entities/station-type.entity';


export interface StationTypeExistenceCheckerInterface
{
    exec(id: number): Promise<StationType|null>;
}