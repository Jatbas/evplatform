import { SimulationStateInterface } from '@simulation/interfaces/simulation-state.interface';

import { SimulationCommandType } from '@simulation/types/simulation-command.type';
import { SimulationSnapshotType } from '@simulation/types/simulation-snapshot.type';


export interface SimulationInterface
{
    exec(state: SimulationStateInterface, commands: SimulationCommandType[],  registerWaitCommand?: boolean): SimulationSnapshotType[];
}