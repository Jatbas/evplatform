import { CompanyAssociation } from '@companies/entities/company-association.entity';
import { CompanyDto } from '@companies/company/dtos/company.dto';


export class CompanyParentDto
{
    public readonly id: string;
    public readonly parentCompanyId: string;
    public readonly childCompanyId: string;

    public readonly createdAt: Date;
    public readonly updatedAt: Date | null;

    public parentCompany: CompanyDto;


    constructor(companyAssociation: CompanyAssociation)
    {
        this.id = companyAssociation.id;
        this.parentCompanyId = companyAssociation.parentCompanyId;
        this.childCompanyId = companyAssociation.childCompanyId;
        this.createdAt = companyAssociation.createdAt;
        this.updatedAt = companyAssociation.updatedAt;
    }
}