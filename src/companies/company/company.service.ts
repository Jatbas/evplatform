import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { InvalidValueObjectError } from '@common/errors/invalid-value-object.error';

import { CompanyServiceInterface } from '@companies/company/interfaces/company-service.interface';
import { CompanyRepositoryInterface } from '@companies/company/interfaces/company-repository.interface';

import { CompanyDto } from '@companies/company/dtos/company.dto';

import { CompanyStationsDto } from '@companies/company/dtos/company.stations.dto';

import { CompanyCreateReqDto } from '@companies/company/dtos/company-create-req.dto';
import { CompanyCreateDto } from '@companies/company/dtos/company-create.dto';

import { CompanyUpdateReqDto } from '@companies/company/dtos/company-update-req.dto';
import { CompanyUpdateDto } from '@companies/company/dtos/company-update.dto';


@Injectable()
export class CompanyService implements CompanyServiceInterface
{
    constructor(

        @Inject('CompanyRepository')
        private readonly companyRepository: CompanyRepositoryInterface
    ) {}


    /***/


    // Get companies
    public async get(id?: number): Promise<CompanyDto[]>
    {
        return await this.companyRepository.get(id);
    }


    /***/


    // Get company stations
    public async getCompanyStations(id: number): Promise<CompanyStationsDto[]>
    {
        return await this.companyRepository.getCompanyStations(id);
    }


    /***/


    // Create company
    public async create(companyCreateReqDto: CompanyCreateReqDto): Promise<CompanyDto[]>
    {
        // Create dto
        let dto: CompanyCreateDto;

        try
        {
            dto = new CompanyCreateDto(companyCreateReqDto.name, companyCreateReqDto.website, companyCreateReqDto.email);
        }
        catch (error: any)
        {
            if (error instanceof InvalidValueObjectError)
            {
                throw new BadRequestException(error.message);
            }

            throw error;
        }


        return await this.companyRepository.create(dto);
    }


    /***/


    // Update company
    public async update(id: number, companyUpdateReqDto: CompanyUpdateReqDto): Promise<CompanyDto[]>
    {
        // Create dto
        let dto: CompanyUpdateDto;

        try
        {
            dto = new CompanyUpdateDto(companyUpdateReqDto.name, companyUpdateReqDto.website, companyUpdateReqDto.email);
        }
        catch (error: any)
        {
            if (error instanceof InvalidValueObjectError)
            {
                throw new BadRequestException(error.message);
            }

            throw error;
        }


        return await this.companyRepository.update(id, dto);
    }


    /***/


    // Delete company
    public async delete(id: number): Promise<boolean>
    {
        return await this.companyRepository.delete(id);
    }
}