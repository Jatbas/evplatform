import { SimulationCommandTypeEnum } from '@simulation/parser/simulation-command-type.enum';


export type SimulationCommandType = {

    type: SimulationCommandTypeEnum;
    stationId?: number | 'all';
    waitSeconds?: number;
    raw: string;
    line: number;
}