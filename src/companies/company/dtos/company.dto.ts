import { Company } from '@companies/entities/company.entity';


export class CompanyDto
{
    public readonly id: string;
    public readonly name: string;
    public readonly website: string | null;
    public readonly email: string | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date | null;

    public hasSubCompanies: boolean = false;
    public hasParentCompany: boolean = false;


    constructor(company: Company)
    {
        this.id = company.id;
        this.name = company.name;
        this.website = company.website;
        this.email = company.email;
        this.createdAt = company.createdAt;
        this.updatedAt = company.updatedAt;
    }
}