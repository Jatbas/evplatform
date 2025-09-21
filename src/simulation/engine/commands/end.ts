import { Injectable, Inject  } from '@nestjs/common';

import { SimulationCommandInterface } from '@simulation/interfaces/simulation-command.interface';
import { SimulationSnapshotInterface } from '@simulation/interfaces/simulation-snapshot.interface';
import { SimulationStateInterface } from '@simulation/interfaces/simulation-state.interface';

import { SimulationCommandResType } from '@simulation/types/simulation-command-res.type';
import { SimulationCommandType } from '@simulation/types/simulation-command.type';
import { SimulationSnapshotType } from '@simulation/types/simulation-snapshot.type';


@Injectable()
export class End implements SimulationCommandInterface
{
    constructor(

        @Inject('SimulationSnapshot')
        private readonly simulationSnapshot: SimulationSnapshotInterface
    ) {}


    /***/


    public exec(state: SimulationStateInterface, command: SimulationCommandType, snapshots: SimulationSnapshotType[], registerWaitCommand: boolean): SimulationCommandResType
    {
        return {
            state: state,
            snapshots: snapshots
        } as SimulationCommandResType;
    }
}