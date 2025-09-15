import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StationTypeCreateInterface } from '@stations/station-type/interfaces/station-type-create.interface';

import { StationType } from '@stations/entities/station-type.entity';

import { StationTypeCreateDto } from '@stations/station-type/dtos/station-type-create.dto';
import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';


@Injectable()
export class StationTypeCreate implements StationTypeCreateInterface
{
    constructor(
        @InjectRepository(StationType, 'evplatform')
        private readonly evplatformRepository: Repository<StationType>
    ) {}


    /***/


    public async exec(stationTypeCreateDto: StationTypeCreateDto): Promise<StationTypeDto[]>
    {
        // Create company
        let stationType: StationType;

        try
        {
            stationType = this.evplatformRepository.create({

                name: stationTypeCreateDto.name.value,
                maxPower: stationTypeCreateDto.maxPower
            });

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