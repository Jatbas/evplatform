import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@companies/entities/company.entity';
import { CompanyAssociation } from '@companies/entities/company-association.entity';
import { Station } from '@stations/entities/station.entity';

import { CompanyController } from '@companies/company/company.controller';
import { CompanyService } from '@companies/company/company.service';

import { HashidsLib } from '@libs/hashids/hashids.lib';
import { UtilsLib } from '@libs/utils/utils.lib';

import { CompanyRepository } from '@companies/company/repository/company.repository';
import { CompanyExistenceChecker } from '@common/repository/company/company-existence-checker';
import { CompanyGet } from '@companies/company/repository/get/company-get';
import { CompanyHasChildren } from '@companies/company/repository/get/company-has-children';
import { CompanyHasParent } from '@companies/company/repository/get/company-has-parent';
import { CompanyGetChildren } from '@companies/company-associations/repository/get/company-get-children';

import { CompanyGetStations } from '@companies/company/repository/get-stations/company-get-stations';

import { CompanyCreate } from '@companies/company/repository/create/company-create';

import { CompanyUpdate } from '@companies/company/repository/update/company-update';

import { CompanyDelete } from '@companies/company/repository/delete/company-delete';


@Module({

    imports: [TypeOrmModule.forFeature([

        Company,
        CompanyAssociation,
        Station
    ], 'evplatform')],

    controllers: [

        CompanyController
    ],

    providers: [

        CompanyService,

        {
            provide: 'HashidsLib',
            useClass: HashidsLib
        },

        {
            provide: 'UtilsLib',
            useClass: UtilsLib
        },

        {
            provide: 'CompanyRepository',
            useClass: CompanyRepository
        },

        {
            provide: 'CompanyExistenceChecker',
            useClass: CompanyExistenceChecker
        },
        {
            provide: 'CompanyGet',
            useClass: CompanyGet
        },
        {
            provide: 'CompanyHasChildren',
            useClass: CompanyHasChildren
        },
        {
            provide: 'CompanyHasParent',
            useClass: CompanyHasParent
        },
        {
            provide: 'CompanyGetChildren',
            useClass: CompanyGetChildren
        },

        {
            provide: 'CompanyGetStations',
            useClass: CompanyGetStations
        },

        {
            provide: 'CompanyCreate',
            useClass: CompanyCreate
        },

        {
            provide: 'CompanyUpdate',
            useClass: CompanyUpdate
        },

        {
            provide: 'CompanyDelete',
            useClass: CompanyDelete
        }
    ],

    exports: []
})


export class CompanyModule {}