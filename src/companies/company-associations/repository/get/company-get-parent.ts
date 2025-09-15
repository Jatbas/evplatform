import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyGetParentInterface } from '@companies/company-associations/interfaces/company-get-parent.interface';
import { CompanyGetInterface } from '@companies/company/interfaces/company-get.interface';

import { CompanyAssociation } from '@companies/entities/company-association.entity';

import { CompanyParentDto } from '@companies/company-associations/dtos/company-parent.dto';
import { CompanyDto } from '@companies/company/dtos/company.dto';


@Injectable()
export class CompanyGetParent implements CompanyGetParentInterface
{
    constructor(
        @InjectRepository(CompanyAssociation, 'evplatform')
        private readonly evplatformRepository: Repository<CompanyAssociation>,

        @Inject('CompanyGet')
        private readonly companyGet: CompanyGetInterface,
    ) {}


    /***/


    public async exec(id: number): Promise<CompanyParentDto[]>
    {
        // Get company childrens
        let associations: CompanyAssociation[] = await this.evplatformRepository.find({
            where: {
                childCompanyId: id.toString()
            }
        });


        // Map to dto
        let res: CompanyParentDto[] = associations.map(company => new CompanyParentDto(company));


        // Retrieve children company information
        res = await Promise.all(res.map(async (association) => {

            const parentCompany: CompanyDto[] = await this.companyGet.exec(+association.parentCompanyId);

            if (parentCompany)
            {

                association.parentCompany = parentCompany[0];
            }

            return association;

        }));


        return res;
    }
}