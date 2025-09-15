import { Controller, Inject, UsePipes, Param, Body, Get, Post, Patch, Delete } from '@nestjs/common';

import { CompanyService } from '@companies/company/company.service';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';

import { NotEmptyBodyPipe } from '@common/pipes/not-empty-body.pipe';
import { ParseAndDecodeIdPipe } from '@common/pipes/parse-and-decode-id.pipe';

import { CompanyDto } from '@companies/company/dtos/company.dto';
import { CompanyResDto } from '@companies/company/dtos/company-res.dto';

import { CompanyStationsDto } from '@companies/company/dtos/company.stations.dto';
import { CompanyStationsResDto } from '@companies/company/dtos/company.stations-res.dto';

import { CompanyCreateReqDto } from '@companies/company/dtos/company-create-req.dto';
import { CompanyUpdateReqDto } from '@companies/company/dtos/company-update-req.dto';


@Controller()
export class CompanyController
{
    constructor(
        private readonly companyService: CompanyService,

        @Inject('HashidsLib')
        private readonly hashidsLib: HashidsLibInterface
    ) {}


    /***/


    @Get('companies')
    public async getAll(): Promise<CompanyResDto[]>
    {
        const companies: CompanyDto[] = await this.companyService.get();

        return companies.map(company => new CompanyResDto(company, this.hashidsLib));
    }


    @Get('companies/:id')
    public async getCompanyById(@Param('id', ParseAndDecodeIdPipe) id: any): Promise<CompanyResDto[]>
    {
        const companies: CompanyDto[] = await this.companyService.get(id);

        return companies.map(company => new CompanyResDto(company, this.hashidsLib));
    }


    /***/


    @Get('companies/:id/stations')
    public async getCompanyStations(@Param('id', ParseAndDecodeIdPipe) id: any): Promise<CompanyStationsResDto[]>
    {
        const stations: CompanyStationsDto[] = await this.companyService.getCompanyStations(id);

        return stations.map(station => new CompanyStationsResDto(station, this.hashidsLib));
    }


    /***/


    @Post('companies')
    @UsePipes(NotEmptyBodyPipe)
    async create(@Body() dto: CompanyCreateReqDto): Promise<CompanyResDto[]>
    {
        const newCompany: CompanyDto[] = await this.companyService.create(dto);

        return newCompany.map(company => new CompanyResDto(company, this.hashidsLib));
    }


    /***/


    @Patch('companies/:id')
    @UsePipes(NotEmptyBodyPipe)
    async update(@Param('id', ParseAndDecodeIdPipe) id: any, @Body() dto: CompanyUpdateReqDto): Promise<CompanyResDto[]>
    {
        const updateCompany: CompanyDto[] = await this.companyService.update(id, dto);

        return updateCompany.map(company => new CompanyResDto(company, this.hashidsLib));
    }


    /***/


    @Delete('companies/:id')
    async delete(@Param('id', ParseAndDecodeIdPipe) id: any): Promise<void>
    {
        await this.companyService.delete(id);
    }
}