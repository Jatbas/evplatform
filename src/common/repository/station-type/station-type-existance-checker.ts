import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StationTypeExistenceCheckerInterface } from '@stations/station-type/interfaces/station-type-existence-checker-interface';

import { StationType } from '@stations/entities/station-type.entity';


@Injectable()
export class StationTypeExistenceChecker implements  StationTypeExistenceCheckerInterface
{
    constructor(
        @InjectRepository(StationType, 'evplatform')
        private readonly evplatformRepository: Repository<StationType>
    ) {}


    /***/


    public async exec(id: number): Promise<StationType|null>
    {
        // Find the company
        const stationType: StationType|null = await this.evplatformRepository.findOne({
            where: { id: id.toString() }
        });


        if (!stationType)
        {
            return null;
        }

        return stationType;
    }
}