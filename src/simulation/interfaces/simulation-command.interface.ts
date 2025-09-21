import { SimulationStateInterface } from '@simulation/interfaces/simulation-state.interface';

import { SimulationCommandType } from '@simulation/types/simulation-command.type';
import { SimulationSnapshotType } from '@simulation/types/simulation-snapshot.type';
import { SimulationCommandResType } from '@simulation/types/simulation-command-res.type';


export interface SimulationCommandInterface
{
    exec(state: SimulationStateInterface, command: SimulationCommandType, snapshots: SimulationSnapshotType[], registerWaitCommand: boolean): SimulationCommandResType;
}