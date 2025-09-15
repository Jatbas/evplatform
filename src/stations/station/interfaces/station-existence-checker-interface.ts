import { Station } from '@stations/entities/station.entity';


export interface StationExistenceCheckerInterface
{
    exec(id: number): Promise<Station|null>;
}