import { CompanyParentDto } from '@companies/company-associations/dtos/company-parent.dto';


export interface CompanyGetParentInterface
{
    exec(id: number): Promise<CompanyParentDto[]>;
}