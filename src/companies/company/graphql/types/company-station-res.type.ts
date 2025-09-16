import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CompanyStationsDto } from '@companies/company/dtos/company.stations.dto';
import { HashidsLibInterface } from '@libs/hashids/hashids.interface';

import { Point } from 'geojson';
import { GraphQLJSON } from 'graphql-type-json';



@ObjectType()
export class CompanyStationResType
{
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    name!: string;

    @Field(() => String, { nullable: true })
    reference!: string | null;

    @Field(() => GraphQLJSON)
    location!: Point;

    @Field(() => GraphQLJSON)
    station_type!: any;

    @Field(() => GraphQLJSON)
    company!: any;

    @Field(() => Date)
    created_at!: Date;

    @Field(() => Date, { nullable: true })
    updated_at!: Date | null;



    /***/


    constructor(data: CompanyStationsDto, hashidsLib: HashidsLibInterface)
    {
        this.id = hashidsLib.encode(data.stationId);

        this.name = data.stationName;
        this.reference = data.stationReference;

        this.location = data.stationLocation;

        this.station_type = {
            id: hashidsLib.encode(data.stationTypeId),
            name: data.stationTypeName,
            max_power: data.stationTypeMaxPower
        };

        this.company = {
            id: hashidsLib.encode(data.stationCompanyId),
            name: data.stationCompanyName,
            is_child_company: (data.stationParentCompanyId !== null)
        };

        this.created_at = data.stationCreatedAt;
        this.updated_at = data.stationUpdatedAt;
    }
}