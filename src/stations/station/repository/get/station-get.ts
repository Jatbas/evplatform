import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StationGetInterface } from '@stations/station/interfaces/station-get.interface';
import { UtilsLibInterface } from '@libs/utils/utils-lib.interface';
import { StationExistenceCheckerInterface } from '@stations/station/interfaces/station-existence-checker-interface';
import { CompanyExistenceCheckerInterface } from '@companies/company/interfaces/company-existence-checker-interface';
import { StationTypeExistenceCheckerInterface } from '@stations/station-type/interfaces/station-type-existence-checker-interface';

import { Station } from '@stations/entities/station.entity';
import { StationType } from '@stations/entities/station-type.entity';
import { Company } from '@companies/entities/company.entity';

import { StationDto } from '@stations/station/dtos/station.dto';


@Injectable()
export class StationGet implements StationGetInterface
{
    constructor(
        @InjectRepository(Station, 'evplatform')
        private readonly evplatformRepository: Repository<Station>,

        @Inject('UtilsLib')
        private readonly utilsLib: UtilsLibInterface,

        @Inject('StationExistenceChecker')
        private readonly stationExistenceChecker: StationExistenceCheckerInterface,

        @Inject('CompanyExistenceChecker')
        private readonly companyExistenceChecker: CompanyExistenceCheckerInterface,

        @Inject('StationTypeExistenceChecker')
        private readonly stationTypeExistenceChecker: StationTypeExistenceCheckerInterface
    ) {}


    /***/


    public async exec(id?: number): Promise<StationDto[]>
    {
        // List stations
        let stations: Station[] = [];

        if (id !== undefined)
        {
            const station: Station|null = await this.stationExistenceChecker.exec(id);

            if (station)
            {
                stations = [station];
            }
        }
        else
        {
            stations = await this.evplatformRepository.find();
        }


        // Map to dto
        let res: StationDto[] = stations.map(station => new StationDto(station));


        // Enrich data
        res = await Promise.all(res.map(async (station) => {

            // Get company
            const company: Company|null = await this.companyExistenceChecker.exec(+station.companyId);

            if (company)
            {
                station.company = company;
            }


            // Get station type
            const stationType: StationType|null = await this.stationTypeExistenceChecker.exec(+station.stationTypeId)

            if (stationType)
            {
                station.stationType = stationType;
            }


            // Format location
            let location = this.utilsLib.wktToGeoJSON(station.location.toString());

            if (!location)
            {
                return station;
            }

            station.location = location;


            return station;

        }));


        return res;
    }
}