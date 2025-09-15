import { CompanyChildrenDto } from '@companies/company-associations/dtos/company-children.dto';


export interface CompanyGetChildrenInterface
{
    exec(id: number): Promise<CompanyChildrenDto[]>;
}