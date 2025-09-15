import { Inject, Injectable } from '@nestjs/common';

import { StationRepositoryInterface } from '@stations/station/interfaces/station-repository.interface';
import { StationGetInterface } from '@stations/station/interfaces/station-get.interface';
import { StationCreateInterface } from '@stations/station/interfaces/station-create.interface';
import { StationUpdateInterface } from '@stations/station/interfaces/station-update.interface';
import { DeleteInterface } from '@common/interfaces/delete.interface';

import { StationDto } from '@stations/station/dtos/station.dto';
import { StationCreateDto } from '@stations/station/dtos/station-create.dto';
import { StationUpdateDto } from '@stations/station/dtos/station-update.dto';


@Injectable()
export class StationRepository implements StationRepositoryInterface
{
    constructor(

        @Inject('StationGet')
        private readonly stationGet: StationGetInterface,

        @Inject('StationCreate')
        private readonly stationCreate: StationCreateInterface,

        @Inject('StationUpdate')
        private readonly stationUpdate: StationUpdateInterface,

        @Inject('StationDelete')
        private readonly stationDelete: DeleteInterface
    ) {}


    /***/


    // Get stations
    public async get(id?: number): Promise<StationDto[]>
    {
        return await this.stationGet.exec(id);
    }


    /***/


    // Create station
    public async create(stationCreateDto: StationCreateDto): Promise<StationDto[]>
    {
        return await this.stationCreate.exec(stationCreateDto);
    }


    /***/


    // Update company
    public async update(id: number, stationUpdateDto: StationUpdateDto): Promise<StationDto[]>
    {
        return await this.stationUpdate.exec(id, stationUpdateDto);
    }


    /***/


    // Delete company
    public async delete(id: number): Promise<boolean>
    {
        return await this.stationDelete.exec(id);
    }
}