import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@companies/entities/company.entity';
import { CompanyAssociation } from '@companies/entities/company-association.entity';

import { CompanyAssociationsController } from '@companies/company-associations/company-associations.controller';
import { CompanyAssociationsService } from '@companies/company-associations/company-associations.service';

import { HashidsLib } from '@libs/hashids/hashids.lib';

import { CompanyAssociationRepository } from '@companies/company-associations/repository/company-association.repository';
import { CompanyGetChildren } from '@companies/company-associations/repository/get/company-get-children';
import { CompanyGetParent } from '@companies/company-associations/repository/get/company-get-parent';
import { CompanyAssociationExistanceChecker } from '@companies/company-associations/repository/checkers/company-association-existance-checker';
import { CompanyAssociationCreate } from '@companies/company-associations/repository/create/company-association-create';
import { CompanyAssociationDelete } from '@companies/company-associations/repository/delete/company-association-delete';

import { CompanyExistenceChecker } from '@common/repository/company/company-existence-checker';
import { CompanyGet } from '@companies/company/repository/get/company-get';
import { CompanyHasChildren } from '@companies/company/repository/get/company-has-children';
import { CompanyHasParent } from '@companies/company/repository/get/company-has-parent';


@Module({

    imports: [TypeOrmModule.forFeature([

        Company,
        CompanyAssociation
    ], 'evplatform')],

    controllers: [

        CompanyAssociationsController
    ],

    providers: [

        CompanyAssociationsService,

        {
            provide: 'HashidsLib',
            useClass: HashidsLib
        },

        {
            provide: 'CompanyAssociationRepository',
            useClass: CompanyAssociationRepository
        },

        {
            provide: 'CompanyGetChildren',
            useClass: CompanyGetChildren
        },
        {
            provide: 'CompanyGetParent',
            useClass: CompanyGetParent
        },
        {
            provide: 'CompanyAssociationExistanceChecker',
            useClass: CompanyAssociationExistanceChecker
        },
        {
            provide: 'CompanyAssociationCreate',
            useClass: CompanyAssociationCreate
        },

        {
            provide: 'CompanyAssociationDelete',
            useClass: CompanyAssociationDelete
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
        }
    ],

    exports: []
})


export class CompanyAssociationsModule {}