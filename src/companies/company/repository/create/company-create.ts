import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyCreateInterface } from '@companies/company/interfaces/company-create.interface';

import { Company } from '@companies/entities/company.entity';

import { CompanyCreateDto } from '@companies/company/dtos/company-create.dto';
import { CompanyDto } from '@companies/company/dtos/company.dto';


@Injectable()
export class CompanyCreate implements CompanyCreateInterface
{
    constructor(
        @InjectRepository(Company, 'evplatform')
        private readonly evplatformRepository: Repository<Company>
    ) {}


    /***/


    public async exec(companyCreateDto: CompanyCreateDto): Promise<CompanyDto[]>
    {
        // Create company
        let company: Company;

        try
        {
            company = this.evplatformRepository.create({

                name: companyCreateDto.name.value,
                website: companyCreateDto.website?.value ? companyCreateDto.website?.value : undefined,
                email: companyCreateDto.email?.value ? companyCreateDto.email?.value : undefined,
            });

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