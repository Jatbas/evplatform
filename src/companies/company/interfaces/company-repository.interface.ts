import { CompanyDto } from '@companies/company/dtos/company.dto';
import { CompanyStationsDto } from '@companies/company/dtos/company.stations.dto';
import { CompanyCreateDto } from '@companies/company/dtos/company-create.dto';
import { CompanyUpdateDto } from '@companies/company/dtos/company-update.dto';


export interface CompanyRepositoryInterface
{
    get(id?: number): Promise<CompanyDto[]>;
    getCompanyStations(id: number): Promise<CompanyStationsDto[]>;
    create(companyCreateDto: CompanyCreateDto): Promise<CompanyDto[]>;
    update(id: number, companyUpdateDto: CompanyUpdateDto): Promise<CompanyDto[]>;
    delete(id: number): Promise<boolean>;
}