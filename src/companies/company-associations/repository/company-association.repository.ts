import { Inject, Injectable } from '@nestjs/common';

import { CompanyAssociationsRepositoryInterface } from '@companies/company-associations/interfaces/company-associations-repository.interface';
import { CompanyGetChildrenInterface } from '@companies/company-associations/interfaces/company-get-children.interface';
import { CompanyGetParentInterface } from '@companies/company-associations/interfaces/company-get-parent.interface';
import { CompanyAssociationCreateInterface } from '@companies/company-associations/interfaces/company-association-create.interface';
import { DeleteInterface } from '@common/interfaces/delete.interface';

import { CompanyChildrenDto } from '@companies/company-associations/dtos/company-children.dto';
import { CompanyParentDto } from '@companies/company-associations/dtos/company-parent.dto';
import { CompanyAssociationDto } from '@companies/company-associations/dtos/company-association.dto';


@Injectable()
export class CompanyAssociationRepository implements CompanyAssociationsRepositoryInterface
{
    constructor(

        @Inject('CompanyGetChildren')
        private readonly companyGetChildren: CompanyGetChildrenInterface,

        @Inject('CompanyGetParent')
        private readonly companyGetParent: CompanyGetParentInterface,

        @Inject('CompanyAssociationCreate')
        private readonly companyAssociationCreate: CompanyAssociationCreateInterface,

        @Inject('CompanyAssociationDelete')
        private readonly companyAssociationDelete: DeleteInterface
    ) {}


    /***/


    // Get company children
    public async getCompanyChildren(id: number): Promise<CompanyChildrenDto[]>
    {
        return await this.companyGetChildren.exec(id);
    }


    // Get company parent
    public async getCompanyParent(id: number): Promise<CompanyParentDto[]>
    {
        return await this.companyGetParent.exec(id);
    }


    /***/


    // Create company association
    public async create(parentCompanyId: number, childCompanyId: number): Promise<CompanyAssociationDto[]>
    {
        return await this.companyAssociationCreate.exec(parentCompanyId, childCompanyId);
    }


    /***/


    // Delete company
    public async delete(id: number): Promise<boolean>
    {
        return await this.companyAssociationDelete.exec(id);
    }
}