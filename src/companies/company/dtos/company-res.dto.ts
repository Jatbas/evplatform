import { CompanyDto } from '@companies/company/dtos/company.dto';
import { HashidsLibInterface } from '@libs/hashids/hashids.interface';


export class CompanyResDto
{
    public readonly id: string;
    public readonly name: string;
    public readonly website: string | null;
    public readonly email: string | null;
    public readonly has_sub_companies: Boolean;
    public readonly has_parent_company: Boolean;
    public readonly created_at: Date;
    public readonly updated_at: Date | null;


    constructor(company: CompanyDto, hashids: HashidsLibInterface)
    {
        this.id = hashids.encode(company.id);

        this.name = company.name;
        this.website = company.website;
        this.email = company.email;

        this.has_sub_companies = company.hasSubCompanies;
        this.has_parent_company = company.hasParentCompany;

        this.created_at = company.createdAt;
        this.updated_at = company.updatedAt;
    }
}