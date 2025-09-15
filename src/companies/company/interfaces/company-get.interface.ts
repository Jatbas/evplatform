import { CompanyDto } from '@companies/company/dtos/company.dto';


export interface CompanyGetInterface
{
    exec(id?: number): Promise<CompanyDto[]>;
}