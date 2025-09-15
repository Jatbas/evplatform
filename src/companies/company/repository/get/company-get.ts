import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyGetInterface } from '@companies/company/interfaces/company-get.interface';
import { CompanyExistenceCheckerInterface } from '@companies/company/interfaces/company-existence-checker-interface';
import { CompanyHasChildrenParentInterface } from '@companies/company/interfaces/company-has-children-parent.interface';

import { Company } from '@companies/entities/company.entity';

import { CompanyDto } from '@companies/company/dtos/company.dto';


@Injectable()
export class CompanyGet implements CompanyGetInterface
{
    constructor(
        @InjectRepository(Company, 'evplatform')
        private readonly evplatformRepository: Repository<Company>,

        @Inject('CompanyExistenceChecker')
        private readonly companyExistenceChecker: CompanyExistenceCheckerInterface,

        @Inject('CompanyHasChildren')
        private readonly companyHasChildren: CompanyHasChildrenParentInterface,

        @Inject('CompanyHasParent')
        private readonly CompanyHasParent: CompanyHasChildrenParentInterface
    ) {}


    /***/


    public async exec(id?: number): Promise<CompanyDto[]>
    {
        // List companies
        let companies: Company[] = [];

        if (id !== undefined)
        {
            const company: Company|null = await this.companyExistenceChecker.exec(id);

            if (company)
            {
                companies = [company];
            }
        }
        else
        {
            companies = await this.evplatformRepository.find();
        }


        // Map to dto
        let res: CompanyDto[] = companies.map(company => new CompanyDto(company));


        // Find if company has child companies and/or parent companies
        res = await Promise.all(res.map(async (company) => {

            company.hasSubCompanies = await this.companyHasChildren.exec(company.id);
            company.hasParentCompany = await this.CompanyHasParent.exec(company.id);

            return company;

        }));


        return res;
    }
}