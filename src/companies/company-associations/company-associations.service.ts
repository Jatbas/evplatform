import { Injectable, Inject } from '@nestjs/common';

import { CompanyAssociationsServiceInterface } from '@companies/company-associations/interfaces/company-associations-service.interface';
import { CompanyAssociationsRepositoryInterface } from '@companies/company-associations/interfaces/company-associations-repository.interface';

import { CompanyChildrenDto } from '@companies/company-associations/dtos/company-children.dto';
import { CompanyParentDto } from '@companies/company-associations/dtos/company-parent.dto';
import { CompanyAssociationDto } from '@companies/company-associations/dtos/company-association.dto';


@Injectable()
export class CompanyAssociationsService implements CompanyAssociationsServiceInterface
{
    constructor(

        @Inject('CompanyAssociationRepository')
        private readonly companyAssociationRepository: CompanyAssociationsRepositoryInterface
    ) {}


    /***/


    // Get company children
    public async getCompanyChildren(id: number): Promise<CompanyChildrenDto[]>
    {
        return await this.companyAssociationRepository.getCompanyChildren(id);
    }


    // Get company parent
    public async getCompanyParent(id: number): Promise<CompanyParentDto[]>
    {
        return await this.companyAssociationRepository.getCompanyParent(id);
    }


    /***/


    // Create company association
    public async create(parentCompanyId: number, childCompanyId: number): Promise<CompanyAssociationDto[]>
    {
        return await this.companyAssociationRepository.create(parentCompanyId, childCompanyId);
    }


    /***/


    // Delete company
    public async delete(id: number): Promise<boolean>
    {
        return await this.companyAssociationRepository.delete(id);
    }
}