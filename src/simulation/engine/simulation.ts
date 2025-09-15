import { Injectable, Inject  } from '@nestjs/common';

import { SimulationInterface } from '@simulation/interfaces/simulation.interface';
import { SimulationSnapshotInterface } from '@simulation/interfaces/simulation-snapshot.interface';
import { SimulationCommandMapInterface } from '@simulation/interfaces/simulation-command.map.interface';
import { SimulationCommandInterface } from '@simulation/interfaces/simulation-command.interface';
import { SimulationStateInterface } from '@simulation/interfaces/simulation-state.interface';

import { SimulationCommandType } from '@simulation/types/simulation-command.type';
import { SimulationSnapshotType } from '@simulation/types/simulation-snapshot.type';
import { SimulationCommandResType } from '@simulation/types/simulation-command-res.type';


@Injectable()
export class Simulation implements SimulationInterface
{
    constructor(

        @Inject('SimulationSnapshot')
        private readonly simulationSnapshot: SimulationSnapshotInterface,

        @Inject('Simulation-SimulationCommandMap')
        private readonly simulationCommandMap: SimulationCommandMapInterface
    ) {}


    /***/


    public exec(state: SimulationStateInterface, commands: SimulationCommandType[], registerWaitCommand?: Boolean): SimulationSnapshotType[]
    {
        registerWaitCommand = registerWaitCommand ?? false;


        let snapshots: SimulationSnapshotType[] = [];


        // Generate command map
        const simulationCommandMap: Record<string, SimulationCommandInterface> = this.simulationCommandMap.exec();


        for (const command of commands)
        {
            const commandRes: SimulationCommandResType = simulationCommandMap[command.type].exec(state, command, snapshots, registerWaitCommand);

            state = commandRes.state;
            snapshots = commandRes.snapshots;
        }


        return snapshots;
    }
}