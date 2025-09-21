import { CompanyDto } from '@companies/company/dtos/company.dto';


export interface CompanyCreatePublisherInterface
{
    exec(company: CompanyDto): boolean;
}