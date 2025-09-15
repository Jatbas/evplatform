import { CompanyChildrenDto } from '@companies/company-associations/dtos/company-children.dto';
import { CompanyMinResDto } from '@companies/company-associations/dtos/company-min-res.dto';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';


export class CompanyChildrenResDto
{
    public readonly id: string;
    public readonly company_id: string;

    public readonly child_company: CompanyMinResDto;

    public readonly created_at: Date;
    public readonly updated_at: Date | null;


    constructor(association: CompanyChildrenDto, childCompany: CompanyMinResDto, hashids: HashidsLibInterface)
    {
        this.id = hashids.encode(association.id);

        this.company_id = hashids.encode(association.parentCompanyId);

        this.child_company = childCompany;

        this.created_at = association.createdAt;
        this.updated_at = association.updatedAt;
    }
}