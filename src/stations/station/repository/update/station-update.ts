import { Injectable, Inject, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from 'geojson';

import { StationUpdateInterface } from '@stations/station/interfaces/station-update.interface';
import { UtilsLibInterface } from '@libs/utils/utils-lib.interface';
import { StationExistenceCheckerInterface } from '@stations/station/interfaces/station-existence-checker-interface';
import { CompanyExistenceCheckerInterface } from '@companies/company/interfaces/company-existence-checker-interface';
import { StationTypeExistenceCheckerInterface } from '@stations/station-type/interfaces/station-type-existence-checker-interface';

import { Station } from '@stations/entities/station.entity';
import { StationType } from '@stations/entities/station-type.entity';
import { Company } from '@companies/entities/company.entity';

import { StationUpdateDto } from '@stations/station/dtos/station-update.dto';
import { StationDto } from '@stations/station/dtos/station.dto';


@Injectable()
export class StationUpdate implements StationUpdateInterface
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


    public async exec(id: number, stationUpdateDto: StationUpdateDto): Promise<StationDto[]>
    {
        // Find the station
        let station: Station|null = await this.stationExistenceChecker.exec(id);

        if (!station)
        {
            throw new NotFoundException('Station not found');
        }


        // Update only fields that are set
        if (stationUpdateDto.name !== undefined)
        {
            station.name = stationUpdateDto.name.value;
        }


        if (stationUpdateDto.location !== undefined)
        {
            // Create GeoJSON Point
            const stationLocation: Point = {
                type: 'Point',
                coordinates: stationUpdateDto.location.getValue()
            };

            station.location = stationLocation;
        }


        if (station.location !== null && typeof station.location === 'string')
        {
            station.location = this.utilsLib.wktToGeoJSON(station.location) as Point;
        }


        // Generate the station reference
        station.reference = this.utilsLib.md5(station.companyId.toString() + '_' + station.stationTypeId.toString() + '_' + station.name + '_' + station.location.coordinates.toString());


        // Update station
        try
        {
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
        let res: StationDto[] = [station].map(data => new StationDto(station));


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