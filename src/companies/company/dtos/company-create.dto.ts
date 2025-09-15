import { CompanyNameVo } from '@companies/company/value-objects/company-name.vo';
import { WebsiteVo } from '@companies/company/value-objects/website.vo';
import { EmailVo } from '@companies/company/value-objects/email.vo';


export class CompanyCreateDto
{
    public readonly name: CompanyNameVo;
    public readonly website?: WebsiteVo;
    public readonly email?: EmailVo;


    constructor(name: string, website: string, email: string)
    {
        this.name = new CompanyNameVo(name);


        if (website !== undefined && website !== null && website !== '')
        {
            this.website = new WebsiteVo(website);
        }


        if (email !== undefined && email !== null && email !== '')
        {
            this.email = new EmailVo(email);
        }
    }
}