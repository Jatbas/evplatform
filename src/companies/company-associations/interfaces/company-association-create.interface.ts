import { CompanyAssociationDto } from '@companies/company-associations/dtos/company-association.dto';


export interface CompanyAssociationCreateInterface
{
    exec(parentCompanyId: number, childCompanyId: number): Promise<CompanyAssociationDto[]>
}