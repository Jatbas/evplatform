import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CompanyModule } from '@companies/company/company.module';
import { CompanyAssociationsModule } from '@companies/company-associations/company-associations.module';
import { StationTypesModule } from '@stations/station-type/station-type.module';
import { StationModule } from '@stations/station/station.module';
import { SimulationModule } from '@simulation/simulation.module';


@Module({

    imports: [

        ConfigModule.forRoot({
            isGlobal: true
        }),

        TypeOrmModule.forRootAsync({
            name: 'evplatform',
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get('DB_EVPLATFORM_HOST'),
                port: +config.get('DB_EVPLATFORM_PORT'),
                username: config.get('DB_EVPLATFORM_USERNAME'),
                password: config.get('DB_EVPLATFORM_PASSWORD'),
                database: config.get('DB_EVPLATFORM_NAME'),
                autoLoadEntities: true,
                synchronize: false,
                legacySpatialSupport: false
            }),
        }),

        CompanyModule,
        CompanyAssociationsModule,
        StationTypesModule,
        StationModule,
        SimulationModule
    ]
})


export class AppModule {}