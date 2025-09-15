import { Controller, Post, Body } from '@nestjs/common';

import { SimulationService } from '@simulation/simulation.service';

import { SimulationReqDto } from '@simulation/dtos/simulation-req.dto';

import { SimulationSnapshotType } from '@simulation/types/simulation-snapshot.type';


@Controller()
export class SimulationController
{
    constructor(
        private readonly simulationService: SimulationService
    ) {}


    /***/


    @Post('simulation')
    async create(@Body() dto: SimulationReqDto): Promise<SimulationSnapshotType[]>
    {
        return await this.simulationService.exec(dto);
    }
}