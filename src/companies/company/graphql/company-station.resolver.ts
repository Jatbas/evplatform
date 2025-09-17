import { Inject } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent, Mutation, Args, ID } from '@nestjs/graphql';

import { ParseAndDecodeIdPipe } from '@common/pipes/parse-and-decode-id.pipe';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';

import { CompanyService } from '@companies/company/company.service';

import { CompanyStationResType } from '@companies/company/graphql/types/company-station-res.type';


@Resolver(CompanyStationResType)
export class CompanyStationResolver
{
    constructor(

        @Inject('HashidsLib')
        private readonly hashidsLib: HashidsLibInterface,

        private readonly companyService: CompanyService,
    ) {}


    /***/


    @Query(() => [CompanyStationResType])
    async getCompanyStations(@Args('id', { type: () => ID }, ParseAndDecodeIdPipe) id?: any): Promise<CompanyStationResType[]>
    {
        const stations = await this.companyService.getCompanyStations(id);

        return stations.map(station => new CompanyStationResType(station, this.hashidsLib));
    }
}