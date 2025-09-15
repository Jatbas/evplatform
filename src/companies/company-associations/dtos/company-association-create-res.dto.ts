import { CompanyAssociationDto } from '@companies/company-associations/dtos/company-association.dto';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';


export class CompanyAssociationCreateResDto
{
    public readonly id: string;
    public readonly parent_company_id: string;
    public readonly child_company_id: string;
    public readonly created_at: Date;
    public readonly updated_at: Date | null;


    constructor(association: CompanyAssociationDto, hashids: HashidsLibInterface)
    {
        this.id = hashids.encode(association.id);

        this.parent_company_id = hashids.encode(association.parentCompanyId);
        this.child_company_id = hashids.encode(association.childCompanyId);

        this.created_at = association.createdAt;
        this.updated_at = association.updatedAt;
    }
}