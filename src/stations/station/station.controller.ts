import { Controller, Inject, UsePipes, BadRequestException, Param, Body, Get, Post, Patch, Delete } from '@nestjs/common';

import { StationService } from '@stations/station/station.service';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';

import { NotEmptyBodyPipe } from '@common/pipes/not-empty-body.pipe';
import { ParseAndDecodeIdPipe } from '@common/pipes/parse-and-decode-id.pipe';

import { StationDto } from '@stations/station/dtos/station.dto';
import { StationResDto } from '@stations/station/dtos/station-res.dto';
import { StationCreateReqDto } from '@stations/station/dtos/station-create-req.dto';
import { StationUpdateReqDto } from '@stations/station/dtos/station-update-req.dto';

import { StationTypeMinResDto } from '@stations/station-type/dtos/station-type-min-res.dto';
import { CompanyMinResDto } from '@companies/company-associations/dtos/company-min-res.dto';


@Controller()
export class StationController
{
    constructor(
        private readonly stationService: StationService,

        @Inject('HashidsLib')
        private readonly hashidsLib: HashidsLibInterface
    ) {}


    /***/


    @Get('stations')
    public async getAll(): Promise<StationResDto[]>
    {
        const stations: StationDto[] = await this.stationService.get();


        return stations.map(
            station => new StationResDto(
                station,
                new CompanyMinResDto(station.company, this.hashidsLib),
                new StationTypeMinResDto(station.stationType, this.hashidsLib),
                this.hashidsLib
            )
        );
    }


    @Get('stations/:id')
    public async getCompanyById(@Param('id', ParseAndDecodeIdPipe) id: any): Promise<StationResDto[]>
    {
        const stations: StationDto[] = await this.stationService.get(id);

        return stations.map(
            station => new StationResDto(
                station,
                new CompanyMinResDto(station.company, this.hashidsLib),
                new StationTypeMinResDto(station.stationType, this.hashidsLib),
                this.hashidsLib
            )
        );
    }


    /***/


    @Post('stations')
    @UsePipes(NotEmptyBodyPipe)
    async create(@Body() dto: StationCreateReqDto): Promise<StationResDto[]>
    {
        // Decode ids
        const decodedCompanyId: number|null = this.hashidsLib.decode(dto.company_id);

        if (decodedCompanyId === null || isNaN(decodedCompanyId) === true)
        {
            throw new BadRequestException('Invalid company id format');
        }


        const decodedStationTypeId: number|null = this.hashidsLib.decode(dto.station_type_id);

        if (decodedStationTypeId === null || isNaN(decodedStationTypeId) === true)
        {
            throw new BadRequestException('Invalid station type id format');
        }


        const newStation: StationDto[] = await this.stationService.create(decodedCompanyId, decodedStationTypeId, dto);


        return newStation.map(
            station => new StationResDto(
                station,
                new CompanyMinResDto(station.company, this.hashidsLib),
                new StationTypeMinResDto(station.stationType, this.hashidsLib),
                this.hashidsLib
            )
        );
    }


    /***/


    @Patch('stations/:id')
    @UsePipes(NotEmptyBodyPipe)
    async update(@Param('id', ParseAndDecodeIdPipe) id: any, @Body() dto: StationUpdateReqDto): Promise<StationResDto[]>
    {
        const updateStation: StationDto[] = await this.stationService.update(id, dto);

        return updateStation.map(
            station => new StationResDto(
                station,
                new CompanyMinResDto(station.company, this.hashidsLib),
                new StationTypeMinResDto(station.stationType, this.hashidsLib),
                this.hashidsLib
            )
        );
    }


    /***/


    @Delete('stations/:id')
    async delete(@Param('id', ParseAndDecodeIdPipe) id: any): Promise<void>
    {
        await this.stationService.delete(id);
    }
}