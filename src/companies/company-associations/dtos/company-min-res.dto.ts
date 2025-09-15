import { Company } from '@companies/entities/company.entity';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';


export class CompanyMinResDto
{
    public readonly id: string;
    public readonly name: string;


    constructor(company: Company, hashids: HashidsLibInterface)
    {
        this.id = hashids.encode(company.id);
        this.name = company.name;
    }
}