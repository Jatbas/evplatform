import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UtilsLibInterface } from '@libs/utils/utils-lib.interface';

import { CompanyGetStationsInterface } from '@companies/company/interfaces/company-get-stations.interface';
import { CompanyExistenceCheckerInterface } from '@companies/company/interfaces/company-existence-checker-interface';
import { CompanyGetChildrenInterface } from '@companies/company-associations/interfaces/company-get-children.interface';

import { Company } from '@companies/entities/company.entity';

import { CompanyStationsDto } from '@companies/company/dtos/company.stations.dto';
import { CompanyChildrenDto } from '@companies/company-associations/dtos/company-children.dto';


@Injectable()
export class CompanyGetStations implements CompanyGetStationsInterface
{
    constructor(
        @InjectRepository(Company, 'evplatform')
        private readonly evplatformRepository: Repository<Company>,

        @Inject('UtilsLib')
        private readonly utilsLib: UtilsLibInterface,

        @Inject('CompanyExistenceChecker')
        private readonly companyExistenceChecker: CompanyExistenceCheckerInterface,

        @Inject('CompanyGetChildren')
        private readonly companyGetChildren: CompanyGetChildrenInterface,
    ) {}


    /***/


    public async exec(id: number): Promise<CompanyStationsDto[]>
    {
        // Get company
        const company: Company|null = await this.companyExistenceChecker.exec(id);

        if (!company)
        {
            throw new NotFoundException('Company not found');
        }


        // Get company children
        const companyChildren: CompanyChildrenDto[] = await this.companyGetChildren.exec(id);


        // Get company ids
        const ids: number[] = [id];

        for (let company of companyChildren)
        {
            ids.push(+company.childCompanyId);
        }


        const stations: any[] = await this.evplatformRepository.createQueryBuilder('companies')
            .innerJoin('stations', 'stations', 'stations.company_id = companies.id')
            .innerJoin('station_types', 'station_types', 'station_types.id = stations.station_type_id')
            .leftJoin('company_associations', 'company_associations', 'company_associations.child_company_id = companies.id')
            .where('companies.id IN (:ids)', { ids: ids })
            .select([
                'stations.company_id',
                'companies.name as company_name',
                'company_associations.parent_company_id',
                'stations.id',
                'stations.name',
                'stations.reference',
                'stations.location',
                'station_types.id AS station_type_id',
                'station_types.name AS station_type_name',
                'station_types.max_power',
                'stations.created_at',
                'stations.updated_at'
            ])
            .orderBy({
                'stations.company_id': 'ASC',
                'stations.created_at': 'ASC',
                'stations.id': 'ASC'
            })
            .getRawMany();


        // Map to dto
        let res: CompanyStationsDto[] = stations.map(station => new CompanyStationsDto(station));


        // Enrich data
        res = await Promise.all(res.map(async (companyStation) => {

            // Format location
            let location = this.utilsLib.wktToGeoJSON(companyStation.stationLocation.toString());

            if (location)
            {
                companyStation.stationLocation = location;
            }

            return companyStation;

        }));


        return res;
    }
}