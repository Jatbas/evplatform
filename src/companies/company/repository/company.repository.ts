import { Inject, Injectable } from '@nestjs/common';

import { CompanyRepositoryInterface } from '@companies/company/interfaces/company-repository.interface';
import { CompanyGetInterface } from '@companies/company/interfaces/company-get.interface';
import { CompanyGetStationsInterface } from '@companies/company/interfaces/company-get-stations.interface';
import { CompanyCreateInterface } from '@companies/company/interfaces/company-create.interface';
import { CompanyUpdateInterface } from '@companies/company/interfaces/company-update.interface';
import { DeleteInterface } from '@common/interfaces/delete.interface';

import { CompanyDto } from '@companies/company/dtos/company.dto';
import { CompanyStationsDto } from '@companies/company/dtos/company.stations.dto';
import { CompanyCreateDto } from '@companies/company/dtos/company-create.dto';
import { CompanyUpdateDto } from '@companies/company/dtos/company-update.dto';


@Injectable()
export class CompanyRepository implements CompanyRepositoryInterface
{
    constructor(

        @Inject('CompanyGet')
        private readonly companyGet: CompanyGetInterface,

        @Inject('CompanyGetStations')
        private readonly companyGetStations: CompanyGetStationsInterface,

        @Inject('CompanyCreate')
        private readonly companyCreate: CompanyCreateInterface,

        @Inject('CompanyUpdate')
        private readonly companyUpdate: CompanyUpdateInterface,

        @Inject('CompanyDelete')
        private readonly companyDelete: DeleteInterface
    ) {}


    /***/


    // Get companies
    public async get(id?: number): Promise<CompanyDto[]>
    {
        return await this.companyGet.exec(id);
    }


    /***/


    // Get company stations
    public async getCompanyStations(id: number): Promise<CompanyStationsDto[]>
    {
        return await this.companyGetStations.exec(id);
    }


    /***/


    // Create company
    public async create(companyCreateDto: CompanyCreateDto): Promise<CompanyDto[]>
    {
        return await this.companyCreate.exec(companyCreateDto);
    }


    /***/


    // Update company
    public async update(id: number, companyUpdateDto: CompanyUpdateDto): Promise<CompanyDto[]>
    {
        return await this.companyUpdate.exec(id, companyUpdateDto);
    }


    /***/


    // Delete company
    public async delete(id: number): Promise<boolean>
    {
        return await this.companyDelete.exec(id);
    }
}