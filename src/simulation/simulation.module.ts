import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@companies/entities/company.entity';
import { Station } from '@stations/entities/station.entity';
import { StationType } from '@stations/entities/station-type.entity';

import { SimulationController } from '@simulation/simulation.controller';
import { SimulationService } from '@simulation/simulation.service';

import { UtilsLib } from '@libs/utils/utils.lib';

import { SimulationScriptParser } from '@simulation/parser/simulation-script-parser';
import { Simulation } from '@simulation/engine/simulation';
import { SimulationSnapshot } from '@simulation/engine/simulation-snapshot';

import { CompanyExistenceChecker } from '@common/repository/company/company-existence-checker';

import { StationTypeExistenceChecker } from '@common/repository/station-type/station-type-existance-checker';
import { StationExistenceChecker } from '@common/repository/station/station-existence-checker';
import { StationGet } from '@stations/station/repository/get/station-get';

import { SimulationCommandMap } from '@simulation/engine/simulation-command-map';
import { Begin as CommandBegin } from '@simulation/engine/commands/begin';
import { End as CommandEnd } from '@simulation/engine/commands/end';
import { Start as CommandStart } from '@simulation/engine/commands/start';
import { Stop as CommandStop } from '@simulation/engine/commands/stop';
import { Wait as CommandWait } from '@simulation/engine/commands/wait';


@Module({

    imports: [TypeOrmModule.forFeature([

        Company,
        Station,
        StationType
    ], 'evplatform')],

    controllers: [

        SimulationController
    ],

    providers: [

        SimulationService,

        {
            provide: 'UtilsLib',
            useClass: UtilsLib
        },


        {
            provide: 'SimulationScriptParser',
            useClass: SimulationScriptParser
        },
        {
            provide: 'Simulation',
            useClass: Simulation
        },
        {
            provide: 'SimulationSnapshot',
            useClass: SimulationSnapshot
        },


        {
            provide: 'Simulation-SimulationCommandMap',
            useClass: SimulationCommandMap
        },
        {
            provide: 'Simulation-Command-Begin',
            useClass: CommandBegin
        },
        {
            provide: 'Simulation-Command-End',
            useClass: CommandEnd
        },
        {
            provide: 'Simulation-Command-Start',
            useClass: CommandStart
        },
        {
            provide: 'Simulation-Command-Stop',
            useClass: CommandStop
        },
        {
            provide: 'Simulation-Command-Wait',
            useClass: CommandWait
        },


        {
            provide: 'StationGet',
            useClass: StationGet
        },
        {
            provide: 'StationTypeExistenceChecker',
            useClass: StationTypeExistenceChecker
        },
        {
            provide: 'StationExistenceChecker',
            useClass: StationExistenceChecker
        },
        {
            provide: 'CompanyExistenceChecker',
            useClass: CompanyExistenceChecker
        }
    ],

    exports: []
})


export class SimulationModule {}