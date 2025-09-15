import { CompanyParentDto } from '@companies/company-associations/dtos/company-parent.dto';
import { CompanyMinResDto } from '@companies/company-associations/dtos/company-min-res.dto';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';


export class CompanyParentResDto
{
    public readonly id: string;
    public readonly company_id: string;

    public readonly parent_company: CompanyMinResDto;

    public readonly created_at: Date;
    public readonly updated_at: Date | null;


    constructor(association: CompanyParentDto, parentCompany: CompanyMinResDto, hashids: HashidsLibInterface)
    {
        this.id = hashids.encode(association.id);

        this.company_id = hashids.encode(association.childCompanyId);

        this.parent_company = parentCompany;

        this.created_at = association.createdAt;
        this.updated_at = association.updatedAt;
    }
}