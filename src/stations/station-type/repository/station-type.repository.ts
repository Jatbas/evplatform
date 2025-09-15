import { Inject, Injectable } from '@nestjs/common';

import { StationTypeRepositoryInterface } from '@stations/station-type/interfaces/station-type-repository.interface';
import { StationTypeGetInterface } from '@stations/station-type/interfaces/station-type-get.interface';
import { StationTypeCreateInterface } from '@stations/station-type/interfaces/station-type-create.interface';
import { StationTypeUpdateInterface } from '@stations/station-type/interfaces/station-type-update.interface';
import { DeleteInterface } from '@common/interfaces/delete.interface';

import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';
import { StationTypeCreateDto } from '@stations/station-type/dtos/station-type-create.dto';
import { StationTypeUpdateDto } from '@stations/station-type/dtos/station-type-update.dto';


@Injectable()
export class StationTypeRepository implements StationTypeRepositoryInterface
{
    constructor(

        @Inject('StationTypeGet')
        private readonly stationTypeGet: StationTypeGetInterface,

        @Inject('StationTypeCreate')
        private readonly stationTypeCreate: StationTypeCreateInterface,

        @Inject('StationTypeUpdate')
        private readonly stationTypeUpdate: StationTypeUpdateInterface,

        @Inject('StationTypeDelete')
        private readonly stationTypeDelete: DeleteInterface
    ) {}


    /***/


    // Get station types
    public async get(id?: number): Promise<StationTypeDto[]>
    {
        return await this.stationTypeGet.exec(id);
    }


    /***/


    // Create company
    public async create(stationTypeCreateDto: StationTypeCreateDto): Promise<StationTypeDto[]>
    {
        return await this.stationTypeCreate.exec(stationTypeCreateDto);
    }


    /***/


    // Update company
    public async update(id: number, stationTypeUpdateDto: StationTypeUpdateDto): Promise<StationTypeDto[]>
    {
        return await this.stationTypeUpdate.exec(id, stationTypeUpdateDto);
    }


    /***/


    // Delete company
    public async delete(id: number): Promise<boolean>
    {
        return await this.stationTypeDelete.exec(id);
    }
}