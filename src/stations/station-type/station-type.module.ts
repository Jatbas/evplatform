import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { StationType } from '@stations/entities/station-type.entity';

import { StationTypeController } from '@stations/station-type/station-type.controller';
import { StationTypeService } from '@stations/station-type/station-type.service';

import { HashidsLib } from '@libs/hashids/hashids.lib';

import { StationTypeRepository } from '@stations/station-type/repository/station-type.repository';
import { StationTypeExistenceChecker } from '@common/repository/station-type/station-type-existance-checker';
import { StationTypeGet } from '@stations/station-type/repository/get/station-type-get';
import { StationTypeCreate } from '@stations/station-type/repository/create/station-type-create';
import { StationTypeUpdate } from '@stations/station-type/repository/update/station-type-update';
import { StationTypeDelete } from '@stations/station-type/repository/delete/station-type-delete';


@Module({

    imports: [TypeOrmModule.forFeature([

        StationType,
    ], 'evplatform')],

    controllers: [

        StationTypeController
    ],

    providers: [

        StationTypeService,

        {
            provide: 'HashidsLib',
            useClass: HashidsLib
        },

        {
            provide: 'StationTypeRepository',
            useClass: StationTypeRepository
        },

        {
            provide: 'StationTypeExistenceChecker',
            useClass: StationTypeExistenceChecker
        },
        {
            provide: 'StationTypeGet',
            useClass: StationTypeGet
        },

        {
            provide: 'StationTypeCreate',
            useClass: StationTypeCreate
        },

        {
            provide: 'StationTypeUpdate',
            useClass: StationTypeUpdate
        },

        {
            provide: 'StationTypeDelete',
            useClass: StationTypeDelete
        }
    ],

    exports: []
})


export class StationTypesModule {}