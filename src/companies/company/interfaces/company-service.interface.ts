import { CompanyDto } from '@companies/company/dtos/company.dto';
import { CompanyStationsDto } from '@companies/company/dtos/company.stations.dto';
import { CompanyCreateReqDto } from '@companies/company/dtos/company-create-req.dto';
import { CompanyUpdateReqDto } from '@companies/company/dtos/company-update-req.dto';


export interface CompanyServiceInterface
{
     get(id?: number): Promise<CompanyDto[]>;
     getCompanyStations(id: number): Promise<CompanyStationsDto[]>;
     create(companyCreateReqDto: CompanyCreateReqDto): Promise<CompanyDto[]>;
     update(id: number, companyUpdateReqDto: CompanyUpdateReqDto): Promise<CompanyDto[]>;
     delete(id: number): Promise<boolean>;
}