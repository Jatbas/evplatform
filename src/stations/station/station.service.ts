import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { InvalidValueObjectError } from '@common/errors/invalid-value-object.error';

import { StationServiceInterface } from '@stations/station/interfaces/station-service.interface';
import { StationRepositoryInterface } from '@stations/station/interfaces/station-repository.interface';

import { StationDto } from '@stations/station/dtos/station.dto';

import { StationCreateReqDto } from '@stations/station/dtos/station-create-req.dto';
import { StationCreateDto } from '@stations/station/dtos/station-create.dto';

import { StationUpdateReqDto } from '@stations/station/dtos/station-update-req.dto';
import { StationUpdateDto } from '@stations/station/dtos/station-update.dto';


@Injectable()
export class StationService implements StationServiceInterface
{
    constructor(

        @Inject('StationRepository')
        private readonly stationRepository: StationRepositoryInterface
    ) {}


    /***/


    // Get stations
    public async get(id?: number): Promise<StationDto[]>
    {
        return await this.stationRepository.get(id);
    }


    /***/


    // Create station
    public async create(companyId: number, stationTypeId: number, stationCreateReqDto: StationCreateReqDto): Promise<StationDto[]>
    {
        // Create dto
        let dto: StationCreateDto;

        try
        {
            dto = new StationCreateDto(companyId, stationTypeId, stationCreateReqDto.name, stationCreateReqDto.location);
        }
        catch (error: any)
        {
            if (error instanceof InvalidValueObjectError)
            {
                throw new BadRequestException(error.message);
            }

            throw error;
        }


        return await this.stationRepository.create(dto);
    }


    /***/


    // Update station
    public async update(id: number, stationUpdateReqDto: StationUpdateReqDto): Promise<StationDto[]>
    {
        // Create dto
        let dto: StationUpdateDto;

        try
        {
            dto = new StationUpdateDto(stationUpdateReqDto.name, stationUpdateReqDto.location);
        }
        catch (error: any)
        {
            if (error instanceof InvalidValueObjectError)
            {
                throw new BadRequestException(error.message);
            }

            throw error;
        }


        return await this.stationRepository.update(id, dto);
    }


    /***/


    // Delete station
    public async delete(id: number): Promise<boolean>
    {
        return await this.stationRepository.delete(id);
    }
}