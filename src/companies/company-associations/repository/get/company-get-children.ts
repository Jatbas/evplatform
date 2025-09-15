import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyGetChildrenInterface } from '@companies/company-associations/interfaces/company-get-children.interface';
import { CompanyGetInterface } from '@companies/company/interfaces/company-get.interface';

import { CompanyAssociation } from '@companies/entities/company-association.entity';

import { CompanyChildrenDto } from '@companies/company-associations/dtos/company-children.dto';
import { CompanyDto } from '@companies/company/dtos/company.dto';


@Injectable()
export class CompanyGetChildren implements CompanyGetChildrenInterface
{
    constructor(
        @InjectRepository(CompanyAssociation, 'evplatform')
        private readonly evplatformRepository: Repository<CompanyAssociation>,

        @Inject('CompanyGet')
        private readonly companyGet: CompanyGetInterface
    ) {}


    /***/


    public async exec(id: number): Promise<CompanyChildrenDto[]>
    {
        // Get company childrens
        let associations: CompanyAssociation[] = await this.evplatformRepository.find({
            where: {
                parentCompanyId: id.toString()
            }
        });


        // Map to dto
        let res: CompanyChildrenDto[] = associations.map(company => new CompanyChildrenDto(company));


        // Retrieve children company information
        res = await Promise.all(res.map(async (association) => {

            const childCompany: CompanyDto[] = await this.companyGet.exec(+association.childCompanyId);

            if (childCompany)
            {
                association.childCompany = childCompany[0];
            }

            return association;

        }));


        return res;
    }
}