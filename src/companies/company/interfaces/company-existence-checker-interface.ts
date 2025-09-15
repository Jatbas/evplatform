import { Company } from '@companies/entities/company.entity';


export interface CompanyExistenceCheckerInterface
{
    exec(id: number): Promise<Company|null>;
}