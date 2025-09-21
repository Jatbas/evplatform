import { Injectable, Inject  } from '@nestjs/common';

import { SimulationCommandInterface } from '@simulation/interfaces/simulation-command.interface';
import { SimulationSnapshotInterface } from '@simulation/interfaces/simulation-snapshot.interface';
import { SimulationStateInterface } from '@simulation/interfaces/simulation-state.interface';

import { SimulationCommandResType } from '@simulation/types/simulation-command-res.type';
import { SimulationCommandType } from '@simulation/types/simulation-command.type';
import { SimulationSnapshotType } from '@simulation/types/simulation-snapshot.type';


@Injectable()
export class Wait implements SimulationCommandInterface
{
    constructor(

        @Inject('SimulationSnapshot')
        private readonly simulationSnapshot: SimulationSnapshotInterface
    ) {}


    /***/


    public exec(state: SimulationStateInterface, command: SimulationCommandType, snapshots: SimulationSnapshotType[], registerWaitCommand: boolean): SimulationCommandResType
    {
        state.setTime(state.getTime() + (command.waitSeconds ?? 0));

        if (registerWaitCommand === true)
        {
            snapshots.push(this.simulationSnapshot.save(state, command));
        }


        return {
            state: state,
            snapshots: snapshots
        } as SimulationCommandResType;
    }
}