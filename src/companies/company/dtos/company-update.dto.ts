import { CompanyNameVo } from '@companies/company/value-objects/company-name.vo';
import { WebsiteVo } from '@companies/company/value-objects/website.vo';
import { EmailVo } from '@companies/company/value-objects/email.vo';


export class CompanyUpdateDto
{
    public readonly name?: CompanyNameVo;
    public readonly website?: WebsiteVo|null;
    public readonly email?: EmailVo|null;


    constructor(name: string, website: string, email: string)
    {
        if (name !== undefined)
        {
            this.name = new CompanyNameVo(name);
        }


        if (website === null || website === '')
        {
            this.website = null;
        }
        else if (website !== undefined)
        {
            this.website = new WebsiteVo(website);
        }


        if (email === null || email === '')
        {
            this.email = null;
        }
        else if (email !== undefined)
        {
            this.email = new EmailVo(email);
        }
    }
}