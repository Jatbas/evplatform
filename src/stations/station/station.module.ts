import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from '@stations/entities/station.entity';
import { StationType } from '@stations/entities/station-type.entity';
import { Company } from '@companies/entities/company.entity';

import { StationController } from '@stations/station/station.controller';
import { StationService } from '@stations/station/station.service';

import { HashidsLib } from '@libs/hashids/hashids.lib';
import { UtilsLib } from '@libs/utils/utils.lib';

import { StationRepository } from '@stations/station/repository/station.repository';
import { StationExistenceChecker } from '@common/repository/station/station-existence-checker';
import { StationGet } from '@stations/station/repository/get/station-get';
import { CompanyExistenceChecker } from '@common/repository/company/company-existence-checker';
import { StationTypeExistenceChecker } from '@common/repository/station-type/station-type-existance-checker';

import { StationCreate } from '@stations/station/repository/create/station-create';

import { StationUpdate } from '@stations/station/repository/update/station-update';

import { StationDelete } from '@stations/station/repository/delete/station-delete';


@Module({

    imports: [TypeOrmModule.forFeature([

        Station,
        StationType,
        Company
    ], 'evplatform')],

    controllers: [

        StationController
    ],

    providers: [

        StationService,

        {
            provide: 'HashidsLib',
            useClass: HashidsLib
        },

        {
            provide: 'UtilsLib',
            useClass: UtilsLib
        },

        {
            provide: 'StationRepository',
            useClass: StationRepository
        },

        {
            provide: 'StationExistenceChecker',
            useClass: StationExistenceChecker
        },

        {
            provide: 'StationGet',
            useClass: StationGet
        },
        {
            provide: 'CompanyExistenceChecker',
            useClass: CompanyExistenceChecker
        },
        {
            provide: 'StationTypeExistenceChecker',
            useClass: StationTypeExistenceChecker
        },

        {
            provide: 'StationCreate',
            useClass: StationCreate
        },

        {
            provide: 'StationUpdate',
            useClass: StationUpdate
        },

        {
            provide: 'StationDelete',
            useClass: StationDelete
        }
    ],

    exports: []
})


export class StationModule {}