import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StationExistenceCheckerInterface } from '@stations/station/interfaces/station-existence-checker-interface';

import { Station } from '@stations/entities/station.entity';


@Injectable()
export class StationExistenceChecker implements StationExistenceCheckerInterface
{
    constructor(
        @InjectRepository(Station, 'evplatform')
        private readonly evplatformRepository: Repository<Station>
    ) {}


    /***/


    public async exec(id: number): Promise<Station|null>
    {
        // Find the station
        const station: Station|null = await this.evplatformRepository.findOne({
            where: { id: id.toString() }
        });


        if (!station)
        {
            return null;
        }

        return station;
    }
}