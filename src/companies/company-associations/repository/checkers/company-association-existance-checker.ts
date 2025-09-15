import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyAssociationExistanceCheckerInterface } from '@companies/company-associations/interfaces/company-association-existance-checker.interface';

import { CompanyAssociation } from '@companies/entities/company-association.entity';


@Injectable()
export class CompanyAssociationExistanceChecker implements CompanyAssociationExistanceCheckerInterface
{
    constructor(
        @InjectRepository(CompanyAssociation, 'evplatform')
        private readonly evplatformRepository: Repository<CompanyAssociation>
    ) {}


    /***/


    public async exec(parentCompanyId: number, childCompanyId: number): Promise<CompanyAssociation|null>
    {
        // Get company association
        const association: CompanyAssociation|null = await this.evplatformRepository.findOne({
            where: {
                parentCompanyId: parentCompanyId.toString(),
                childCompanyId: childCompanyId.toString()
            }
        });


        if (!association)
        {
            return null;
        }

        return association;
    }
}