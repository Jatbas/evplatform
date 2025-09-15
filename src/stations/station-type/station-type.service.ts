import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { InvalidValueObjectError } from '@common/errors/invalid-value-object.error';

import { StationTypeServiceInterface } from '@stations/station-type/interfaces/station-type-service.interface';
import { StationTypeRepositoryInterface } from '@stations/station-type/interfaces/station-type-repository.interface';

import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';

import { StationTypeCreateReqDto } from '@stations/station-type/dtos/station-type-create-req.dto';
import { StationTypeCreateDto } from '@stations/station-type/dtos/station-type-create.dto';

import { StationTypeUpdateReqDto } from '@stations/station-type/dtos/station-type-update-req.dto';
import { StationTypeUpdateDto } from '@stations/station-type/dtos/station-type-update.dto';


@Injectable()
export class StationTypeService implements StationTypeServiceInterface
{
    constructor(

        @Inject('StationTypeRepository')
        private readonly stationTypeRepository: StationTypeRepositoryInterface
    ) {}


    /***/


    // Get station types
    public async get(id?: number): Promise<StationTypeDto[]>
    {
        return await this.stationTypeRepository.get(id);
    }


    /***/


    // Create station type
    public async create(stationTypeCreateReqDto: StationTypeCreateReqDto): Promise<StationTypeDto[]>
    {
        // Create dto
        let dto: StationTypeCreateDto;

        try
        {
            dto = new StationTypeCreateDto(stationTypeCreateReqDto.name, stationTypeCreateReqDto.max_power);
        }
        catch (error: any)
        {
            if (error instanceof InvalidValueObjectError)
            {
                throw new BadRequestException(error.message);
            }

            throw error;
        }


        return await this.stationTypeRepository.create(dto);
    }


    /***/


    // Update station type
    public async update(id: number, stationTypeUpdateReqDto: StationTypeUpdateReqDto): Promise<StationTypeDto[]>
    {
        // Create dto
        let dto: StationTypeUpdateDto;

        try
        {
            dto = new StationTypeUpdateDto(stationTypeUpdateReqDto.name, stationTypeUpdateReqDto.max_power);
        }
        catch (error: any)
        {
            if (error instanceof InvalidValueObjectError)
            {
                throw new BadRequestException(error.message);
            }

            throw error;
        }


        return await this.stationTypeRepository.update(id, dto);
    }


    /***/


    // Delete station type
    public async delete(id: number): Promise<boolean>
    {
        return await this.stationTypeRepository.delete(id);
    }
}