import { CompanyAssociation } from '@companies/entities/company-association.entity';


export interface CompanyAssociationExistanceCheckerInterface
{
   exec(parentCompanyId: number, childCompanyId: number): Promise<CompanyAssociation|null>;
}