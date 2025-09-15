import { CompanyUpdateDto } from '@companies/company/dtos/company-update.dto';
import { CompanyDto } from '@companies/company/dtos/company.dto';


export interface CompanyUpdateInterface
{
    exec(id: number, companyUpdateDto: CompanyUpdateDto): Promise<CompanyDto[]>;
}