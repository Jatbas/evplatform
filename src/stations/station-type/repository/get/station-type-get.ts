import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StationTypeGetInterface } from '@stations/station-type/interfaces/station-type-get.interface';
import { StationTypeExistenceCheckerInterface } from '@stations/station-type/interfaces/station-type-existence-checker-interface';

import { StationType } from '@stations/entities/station-type.entity';

import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';


@Injectable()
export class StationTypeGet implements StationTypeGetInterface
{
    constructor(
        @InjectRepository(StationType, 'evplatform')
        private readonly evplatformRepository: Repository<StationType>,

        @Inject('StationTypeExistenceChecker')
        private readonly stationTypeExistenceChecker: StationTypeExistenceCheckerInterface
    ) {}


    /***/


    public async exec(id?: number): Promise<StationTypeDto[]>
    {
        // List station types
        let stationTypes: StationType[] = [];

        if (id !== undefined)
        {
            const stationType: StationType|null = await this.stationTypeExistenceChecker.exec(id);

            if (stationType)
            {
                stationTypes = [stationType];
            }
        }
        else
        {
            stationTypes = await this.evplatformRepository.find();
        }


        // Map to dto
        let res: StationTypeDto[] = stationTypes.map(stationType => new StationTypeDto(stationType));

        return res;
    }
}