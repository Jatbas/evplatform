import { Injectable, Inject  } from '@nestjs/common';

import { SimulationCommandMapInterface } from '@simulation/interfaces/simulation-command.map.interface';
import { SimulationCommandInterface } from '@simulation/interfaces/simulation-command.interface';


@Injectable()
export class SimulationCommandMap implements SimulationCommandMapInterface
{
    constructor(

        @Inject('Simulation-Command-Begin')
        private readonly commandBegin: SimulationCommandInterface,

        @Inject('Simulation-Command-End')
        private readonly commandEnd: SimulationCommandInterface,

        @Inject('Simulation-Command-Start')
        private readonly commandStart: SimulationCommandInterface,

        @Inject('Simulation-Command-Stop')
        private readonly commandStop: SimulationCommandInterface,

        @Inject('Simulation-Command-Wait')
        private readonly commandWait: SimulationCommandInterface
    ) {}


    /***/


    public exec(): Record<string, SimulationCommandInterface>
    {
        return {
            BEGIN: this.commandBegin,
            END: this.commandEnd,
            START: this.commandStart,
            STOP: this.commandStop,
            WAIT: this.commandWait
        } as Record<string, SimulationCommandInterface>;
    }
}