import { Injectable, Inject, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from 'geojson';

import { StationCreateInterface } from '@stations/station/interfaces/station-create.interface';
import { UtilsLibInterface } from '@libs/utils/utils-lib.interface';
import { CompanyExistenceCheckerInterface } from '@companies/company/interfaces/company-existence-checker-interface';
import { StationTypeExistenceCheckerInterface } from '@stations/station-type/interfaces/station-type-existence-checker-interface';

import { Station } from '@stations/entities/station.entity';
import { StationType } from '@stations/entities/station-type.entity';
import { Company } from '@companies/entities/company.entity';

import { StationCreateDto } from '@stations/station/dtos/station-create.dto';
import { StationDto } from '@stations/station/dtos/station.dto';


@Injectable()
export class StationCreate implements StationCreateInterface
{
    constructor(
        @InjectRepository(Station, 'evplatform')
        private readonly evplatformRepository: Repository<Station>,

        @Inject('UtilsLib')
        private readonly utilsLib: UtilsLibInterface,

        @Inject('CompanyExistenceChecker')
        private readonly companyExistenceChecker: CompanyExistenceCheckerInterface,

        @Inject('StationTypeExistenceChecker')
        private readonly stationTypeExistenceChecker: StationTypeExistenceCheckerInterface
    ) {}


    /***/


    public async exec(stationCreateDto: StationCreateDto): Promise<StationDto[]>
    {
        // Create station reference
        let stationReference: string = this.utilsLib.md5(stationCreateDto.companyId.toString() + '_' + stationCreateDto.stationTypeId.toString() + '_' + stationCreateDto.name.value + '_' + stationCreateDto.location.getValue().toString());


        // Create GeoJSON Point
        const stationLocation: Point = {
            type: 'Point',
            coordinates: stationCreateDto.location.getValue()
        };


        // Create station
        let station: Station;

        try
        {
            station = this.evplatformRepository.create({

                companyId: stationCreateDto.companyId.toString(),
                stationTypeId: stationCreateDto.stationTypeId.toString(),
                name: stationCreateDto.name.value,
                location: stationLocation,
                reference: stationReference
            });

            station = await this.evplatformRepository.save(station);
        }
        catch (error: any)
        {
            if (error.code === 'ER_DUP_ENTRY')
            {
                throw new ConflictException(error.sqlMessage);
            }

            throw new BadRequestException(error.sqlMessage);
        }


        // Map to dto
        let res: StationDto[] = [station].map(data => new StationDto(data));


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


            return station;

        }));


        return res;
    }
}