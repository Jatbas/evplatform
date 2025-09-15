import { Injectable, Inject, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyAssociationCreateInterface } from '@companies/company-associations/interfaces/company-association-create.interface';
import { CompanyExistenceCheckerInterface } from '@companies/company/interfaces/company-existence-checker-interface';
import { CompanyAssociationExistanceCheckerInterface } from '@companies/company-associations/interfaces/company-association-existance-checker.interface';

import { CompanyAssociation } from '@companies/entities/company-association.entity';
import { Company } from '@companies/entities/company.entity';

import { CompanyAssociationDto } from '@companies/company-associations/dtos/company-association.dto';


@Injectable()
export class CompanyAssociationCreate implements CompanyAssociationCreateInterface
{
    constructor(
        @InjectRepository(CompanyAssociation, 'evplatform')
        private readonly evplatformRepository: Repository<CompanyAssociation>,

        @Inject('CompanyExistenceChecker')
        private readonly companyExistenceChecker: CompanyExistenceCheckerInterface,

        @Inject('CompanyAssociationExistanceChecker')
        private readonly companyAssociationExistanceChecker: CompanyAssociationExistanceCheckerInterface
    ) {}


    /***/


    public async exec(parentCompanyId: number, childCompanyId: number): Promise<CompanyAssociationDto[]>
    {
        // Prevent loop associations
        if (parentCompanyId == childCompanyId)
        {
            throw new NotFoundException('Parent and child company ids are the same');
        }


        // Let us validate if parent company exists
        const parentCompany:Company|null = await this.companyExistenceChecker.exec(parentCompanyId);

        if (!parentCompany)
        {
            throw new NotFoundException('Parent company not found');
        }


        // Let us validate if child company exists
        const childCompany:Company|null = await this.companyExistenceChecker.exec(childCompanyId);

        if (!childCompany)
        {
            throw new NotFoundException('Child company not found');
        }


        // Prevent reverse associations
        const reverseAssociation: CompanyAssociation|null = await this.companyAssociationExistanceChecker.exec(childCompanyId, parentCompanyId);

        if (reverseAssociation)
        {
            throw new NotFoundException('Reverse company association detected');
        }


        // Create company association
        let companyAssociation: CompanyAssociation;

        try
        {
            companyAssociation = this.evplatformRepository.create({

                parentCompanyId: parentCompanyId.toString(),
                childCompanyId: childCompanyId.toString()
            });

            companyAssociation = await this.evplatformRepository.save(companyAssociation);
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
        return [companyAssociation].map(data => new CompanyAssociationDto(data));
    }
}