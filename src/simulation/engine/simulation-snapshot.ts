import { Injectable } from '@nestjs/common';

import { SimulationSnapshotInterface } from '@simulation/interfaces/simulation-snapshot.interface';
import { SimulationStateInterface } from '@simulation/interfaces/simulation-state.interface';

import { SimulationCommandType } from '@simulation/types/simulation-command.type';
import { SimulationSnapshotType } from '@simulation/types/simulation-snapshot.type';


@Injectable()
export class SimulationSnapshot implements SimulationSnapshotInterface
{
    public save(state: SimulationStateInterface, command: SimulationCommandType): SimulationSnapshotType
    {
        // Get stations charging info
        const chargingStationsInfo = state.getState();


        return {
            command: command.raw,
            timestamp: state.getTime(),
            companies: chargingStationsInfo.companies,
            totalChargingStations: chargingStationsInfo.totalChargingStations,
            totalChargingPower: chargingStationsInfo.totalChargingPower
        };
    }
}