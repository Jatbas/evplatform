import { Controller, Inject, UsePipes, Param, Body, Get, Post, BadRequestException, Delete } from '@nestjs/common';

import { CompanyAssociationsService } from '@companies/company-associations/company-associations.service';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';

import { NotEmptyBodyPipe } from '@common/pipes/not-empty-body.pipe';
import { ParseAndDecodeIdPipe } from '@common/pipes/parse-and-decode-id.pipe';

import { CompanyMinResDto } from '@companies/company-associations/dtos/company-min-res.dto';

import { CompanyChildrenDto } from '@companies/company-associations/dtos/company-children.dto';
import { CompanyChildrenResDto } from '@companies/company-associations/dtos/company-children-res.dto';

import { CompanyParentDto } from '@companies/company-associations/dtos/company-parent.dto';
import { CompanyParentResDto } from '@companies/company-associations/dtos/company-parent-res.dto';

import { CompanyAssociationCreateReqDto } from '@companies/company-associations/dtos/company-association-create-req.dto';
import { CompanyAssociationDto } from '@companies/company-associations/dtos/company-association.dto';
import { CompanyAssociationCreateResDto } from '@companies/company-associations/dtos/company-association-create-res.dto';


@Controller()
export class CompanyAssociationsController
{
    constructor(
        private readonly companyAssociationsService: CompanyAssociationsService,

        @Inject('HashidsLib')
        private readonly hashidsLib: HashidsLibInterface
    ) {}


    /***/


    @Get('company-associations/:id/children')
    public async getCompanyChildren(@Param('id', ParseAndDecodeIdPipe) id: any): Promise<CompanyChildrenResDto[]>
    {
        const associations: CompanyChildrenDto[] = await this.companyAssociationsService.getCompanyChildren(id);

        return associations.map(
            association => new CompanyChildrenResDto(
                association,
                new CompanyMinResDto(association.childCompany, this.hashidsLib),
                this.hashidsLib
            )
        );
    }


    @Get('company-associations/:id/parent')
    public async getCompanyParent(@Param('id', ParseAndDecodeIdPipe) id: any): Promise<CompanyParentResDto[]>
    {
        const associations: CompanyParentDto[] = await this.companyAssociationsService.getCompanyParent(id);

        return associations.map(
            association => new CompanyParentResDto(
                association,
                new CompanyMinResDto(association.parentCompany, this.hashidsLib),
                this.hashidsLib
            )
        );
    }


    /***/


    @Post('company-associations')
    @UsePipes(NotEmptyBodyPipe)
    async create(@Body() dto: CompanyAssociationCreateReqDto): Promise<CompanyAssociationCreateResDto[]>
    {
        // Decode ids
        const decodedParentCompanyId: number|null = this.hashidsLib.decode(dto.parent_company_id);

        if (decodedParentCompanyId === null || isNaN(decodedParentCompanyId) === true)
        {
            throw new BadRequestException('Invalid parent company id format');
        }


        const decodedChildCompanyId: number|null = this.hashidsLib.decode(dto.child_company_id);

        if (decodedChildCompanyId === null || isNaN(decodedChildCompanyId) === true)
        {
            throw new BadRequestException('Invalid child company id format');
        }


        const newCompanyAssociation: CompanyAssociationDto[] = await this.companyAssociationsService.create(decodedParentCompanyId, decodedChildCompanyId);

        return newCompanyAssociation.map(association => new CompanyAssociationCreateResDto(association, this.hashidsLib));
    }


    /***/


    @Delete('company-associations/:id')
    async delete(@Param('id', ParseAndDecodeIdPipe) id: any): Promise<void>
    {
        await this.companyAssociationsService.delete(id);
    }
}