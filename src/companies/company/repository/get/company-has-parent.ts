import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyHasChildrenParentInterface } from '@companies/company/interfaces/company-has-children-parent.interface';

import { CompanyAssociation } from '@companies/entities/company-association.entity';


@Injectable()
export class CompanyHasParent implements CompanyHasChildrenParentInterface
{
    constructor(
        @InjectRepository(CompanyAssociation, 'evplatform')
        private readonly evplatformRepository: Repository<CompanyAssociation>
    ) {}


    /***/


    public async exec(companyId: string): Promise<boolean>
    {
        const count = await this.evplatformRepository.count({
            where: {
                childCompanyId: companyId
            }
        });

        return count > 0;
    }
}