import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { SimulationServiceInterface } from '@simulation/interfaces/simulation-service.interface';
import { SimulationScriptParserInterface } from '@simulation/interfaces/simulation-script-parser.interface';
import { SimulationInterface } from '@simulation/interfaces/simulation.interface';
import { StationGetInterface } from '@stations/station/interfaces/station-get.interface';

import { SimulationCommandType } from '@simulation/types/simulation-command.type';
import { SimulationSnapshotType } from '@simulation/types/simulation-snapshot.type';

import { SimulationState } from '@simulation/engine/simulation-state';

import { SimulationReqDto } from '@simulation/dtos/simulation-req.dto';
import { StationDto } from '@stations/station/dtos/station.dto';


@Injectable()
export class SimulationService implements SimulationServiceInterface
{
    constructor(

        @Inject('SimulationScriptParser')
        private readonly simulationScriptParser: SimulationScriptParserInterface,

        @Inject('Simulation')
        private readonly simulation: SimulationInterface,

        @Inject('StationGet')
        private readonly stationGet: StationGetInterface,
    ) {}


    /***/


    // Execute script
    public async exec(dto: SimulationReqDto): Promise<SimulationSnapshotType[]>
    {
        // Parse script commands
        const commands: SimulationCommandType[] = await this.simulationScriptParser.exec(dto.script);

        if (!commands)
        {
            throw new BadRequestException('No script commands');
        }


        // Collect stations data
        const stations: StationDto[] = await this.stationGet.exec();


        // Init Simulation state
        const simulationState = new SimulationState(stations);


        // Run simulation
        return this.simulation.exec(simulationState, commands);
    }
}