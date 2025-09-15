import { Injectable, Inject, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StationTypeUpdateInterface } from '@stations/station-type/interfaces/station-type-update.interface';
import { StationTypeExistenceCheckerInterface } from '@stations/station-type/interfaces/station-type-existence-checker-interface';

import { StationType } from '@stations/entities/station-type.entity';

import { StationTypeUpdateDto } from '@stations/station-type/dtos/station-type-update.dto';
import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';


@Injectable()
export class StationTypeUpdate implements StationTypeUpdateInterface
{
    constructor(
        @InjectRepository(StationType, 'evplatform')
        private readonly evplatformRepository: Repository<StationType>,

        @Inject('StationTypeExistenceChecker')
        private readonly stationTypeExistenceChecker: StationTypeExistenceCheckerInterface
    ) {}


    /***/


    public async exec(id: number, stationTypeUpdateDto: StationTypeUpdateDto): Promise<StationTypeDto[]>
    {
        // Find the company
        let stationType: StationType|null = await this.stationTypeExistenceChecker.exec(id);

        if (!stationType)
        {
            throw new NotFoundException('Station type not found');
        }


        // Update only fields that are set
        if (stationTypeUpdateDto.name !== undefined)
        {
            stationType.name = stationTypeUpdateDto.name.value;
        }


        if (stationTypeUpdateDto.maxPower !== undefined)
        {
            stationType.maxPower = stationTypeUpdateDto.maxPower;
        }


        // Update company
        try
        {
            stationType = await this.evplatformRepository.save(stationType);
        }
        catch (error: any)
        {
            if (error.code === 'ER_DUP_ENTRY')
            {
                throw new ConflictException(error.sqlMessage);
            }

            throw new BadRequestException(error.sqlMessage);
        }


        // Map to dto
        return [stationType].map(data => new StationTypeDto(data));
    }
}