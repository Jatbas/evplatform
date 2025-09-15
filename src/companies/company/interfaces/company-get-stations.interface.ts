import { CompanyStationsDto } from '@companies/company/dtos/company.stations.dto';


export interface CompanyGetStationsInterface
{
    exec(id: number): Promise<CompanyStationsDto[]>;
}