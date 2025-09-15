import { SimulationStateInterface } from '@simulation/interfaces/simulation-state.interface';

import { SimulationSnapshotType } from '@simulation/types/simulation-snapshot.type';


export type SimulationCommandResType = {

    state: SimulationStateInterface;
    snapshots: SimulationSnapshotType[];
}