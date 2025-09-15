import { Controller, Inject, UsePipes, Param, Body, Get, Post, Patch, Delete } from '@nestjs/common';

import { StationTypeService } from '@stations/station-type/station-type.service';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';

import { NotEmptyBodyPipe } from '@common/pipes/not-empty-body.pipe';
import { ParseAndDecodeIdPipe } from '@common/pipes/parse-and-decode-id.pipe';

import { StationTypeDto } from '@stations/station-type/dtos/station-type.dto';
import { StationTypeCreateReqDto } from '@stations/station-type/dtos/station-type-create-req.dto';
import { StationTypeResDto } from '@stations/station-type/dtos/station-type-res.dto';

import { StationTypeUpdateReqDto } from '@stations/station-type/dtos/station-type-update-req.dto';


@Controller()
export class StationTypeController
{
    constructor(
        private readonly stationTypeService: StationTypeService,

        @Inject('HashidsLib')
        private readonly hashidsLib: HashidsLibInterface
    ) {}


    /***/


    @Get('station-types')
    public async getAll(): Promise<StationTypeResDto[]>
    {
        const stationTypes: StationTypeDto[] = await this.stationTypeService.get();

        return stationTypes.map(stationType => new StationTypeResDto(stationType, this.hashidsLib));
    }


    @Get('station-types/:id')
    public async getCompanyById(@Param('id', ParseAndDecodeIdPipe) id: any): Promise<StationTypeResDto[]>
    {
        const stationTypes: StationTypeDto[] = await this.stationTypeService.get(id);

        return stationTypes.map(stationType => new StationTypeResDto(stationType, this.hashidsLib));
    }


    /***/


    @Post('station-types')
    @UsePipes(NotEmptyBodyPipe)
    async create(@Body() dto: StationTypeCreateReqDto): Promise<StationTypeResDto[]>
    {
        const newStationType: StationTypeDto[] = await this.stationTypeService.create(dto);

        return newStationType.map(stationType => new StationTypeResDto(stationType, this.hashidsLib));
    }


    /***/


    @Patch('station-types/:id')
    @UsePipes(NotEmptyBodyPipe)
    async update(@Param('id', ParseAndDecodeIdPipe) id: any, @Body() dto: StationTypeUpdateReqDto): Promise<StationTypeResDto[]>
    {
        const updateStationType: StationTypeDto[] = await this.stationTypeService.update(id, dto);

        return updateStationType.map(stationType => new StationTypeResDto(stationType, this.hashidsLib));
    }


    /***/


    @Delete('station-types/:id')
    async delete(@Param('id', ParseAndDecodeIdPipe) id: any): Promise<void>
    {
        await this.stationTypeService.delete(id);
    }
}