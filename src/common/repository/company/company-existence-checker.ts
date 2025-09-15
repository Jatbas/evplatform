import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyExistenceCheckerInterface } from '@companies/company/interfaces/company-existence-checker-interface';

import { Company } from '@companies/entities/company.entity';


@Injectable()
export class CompanyExistenceChecker implements CompanyExistenceCheckerInterface
{
    constructor(
        @InjectRepository(Company, 'evplatform')
        private readonly evplatformRepository: Repository<Company>
    ) {}


    /***/


    public async exec(id: number): Promise<Company|null>
    {
        // Find the company
        const company: Company|null = await this.evplatformRepository.findOne({
            where: { id: id.toString() }
        });


        if (!company)
        {
            return null;
        }

        return company;
    }
}