import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { ParseAndDecodeIdPipe } from '@common/pipes/parse-and-decode-id.pipe';
import { ParseAndDecodeIdUndefinedPipe } from '@common/pipes/parse-and-decode-id-undefined.pipe';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';

import { CompanyService } from '@companies/company/company.service';

import { CompanyResType } from '@companies/company/graphql/types/company-res.type';
import { CompanyStationResType } from '@companies/company/graphql/types/company-station-res.type';
import { CompanyCreateReqDto } from '@companies/company/dtos/company-create-req.dto';
import { CompanyUpdateReqDto } from '@companies/company/dtos/company-update-req.dto';


@Resolver()
export class CompanyResolver
{
    constructor(

        @Inject('HashidsLib')
        private readonly hashidsLib: HashidsLibInterface,

        private readonly companyService: CompanyService,
    ) {}


    /***/


    @Query(() => [CompanyResType])
    async getCompanies(@Args('id', { type: () => ID, nullable: true }, ParseAndDecodeIdUndefinedPipe) id?: any): Promise<CompanyResType[]>
    {
        const companies = await this.companyService.get(id);

        return companies.map(company => new CompanyResType(company, this.hashidsLib));
    }


    /***/


    @Query(() => [CompanyStationResType])
    async getCompanyStations(@Args('id', { type: () => ID }, ParseAndDecodeIdPipe) id?: any): Promise<CompanyStationResType[]>
    {
        const stations = await this.companyService.getCompanyStations(id);

        return stations.map(station => new CompanyStationResType(station, this.hashidsLib));
    }


    /***/


    @Mutation(() => [CompanyResType])
    async createCompany(@Args('input') input: CompanyCreateReqDto): Promise<CompanyResType[]>
    {
        const newCompany = await this.companyService.create(input);

        return newCompany.map(company => new CompanyResType(company, this.hashidsLib));
    }


    /***/


    @Mutation(() => [CompanyResType])
    async updateCompany(@Args('id', { type: () => ID }, ParseAndDecodeIdPipe) id: number, @Args('input') input: CompanyUpdateReqDto): Promise<CompanyResType[]>
    {
        const updateCompany = await this.companyService.update(id, input);

        return updateCompany.map(company => new CompanyResType(company, this.hashidsLib));
    }


    /***/


    @Mutation(() => Boolean)
    async deleteCompany(@Args('id', { type: () => ID }, ParseAndDecodeIdPipe) id: number): Promise<boolean>
    {
        return await this.companyService.delete(id);
    }
}