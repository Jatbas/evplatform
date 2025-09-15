import { Injectable, Inject, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyUpdateInterface } from '@companies/company/interfaces/company-update.interface';
import { CompanyExistenceCheckerInterface } from '@companies/company/interfaces/company-existence-checker-interface';

import { Company } from '@companies/entities/company.entity';

import { CompanyUpdateDto } from '@companies/company/dtos/company-update.dto';
import { CompanyDto } from '@companies/company/dtos/company.dto';


@Injectable()
export class CompanyUpdate implements CompanyUpdateInterface
{
    constructor(
        @InjectRepository(Company, 'evplatform')
        private readonly evplatformRepository: Repository<Company>,

        @Inject('CompanyExistenceChecker')
        private readonly companyExistenceChecker: CompanyExistenceCheckerInterface,
    ) {}


    /***/


    public async exec(id: number, companyUpdateDto: CompanyUpdateDto): Promise<CompanyDto[]>
    {
        // Find the company
        let company: Company|null = await this.companyExistenceChecker.exec(id);

        if (!company)
        {
            throw new NotFoundException('Company not found');
        }


        // Update only fields that are set
        if (companyUpdateDto.name !== undefined)
        {
            company.name = companyUpdateDto.name.value;
        }


        if (companyUpdateDto.website !== undefined)
        {
            company.website = ((companyUpdateDto.website !== null) ? companyUpdateDto.website.value : null);
        }


        if (companyUpdateDto.email !== undefined)
        {
            company.email = ((companyUpdateDto.email !== null) ? companyUpdateDto.email.value : null);
        }


        // Update company
        try
        {
            company = await this.evplatformRepository.save(company);
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
        return [company].map(data => new CompanyDto(data));
    }
}