import { CompanyChildrenDto } from '@companies/company-associations/dtos/company-children.dto';
import { CompanyParentDto } from '@companies/company-associations/dtos/company-parent.dto';
import { CompanyAssociationDto } from '@companies/company-associations/dtos/company-association.dto';


export interface CompanyAssociationsServiceInterface
{
    getCompanyChildren(id: number): Promise<CompanyChildrenDto[]>;
    getCompanyParent(id: number): Promise<CompanyParentDto[]>;
    create(parentCompanyId: number, childCompanyId: number): Promise<CompanyAssociationDto[]>;
    delete(id: number): Promise<boolean>;
}