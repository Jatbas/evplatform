import { CompanyCreateDto } from '@companies/company/dtos/company-create.dto';
import { CompanyDto } from '@companies/company/dtos/company.dto';


export interface CompanyCreateInterface
{
    exec(companyCreateDto: CompanyCreateDto): Promise<CompanyDto[]>;
}