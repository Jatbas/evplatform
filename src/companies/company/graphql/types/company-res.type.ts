import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CompanyDto } from '@companies/company/dtos/company.dto';
import { HashidsLibInterface } from '@libs/hashids/hashids.interface';
import { CompanyStationResType } from '@companies/company/graphql/types/company-station-res.type';


@ObjectType()
export class CompanyResType
{
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    name!: string;

    @Field(() => String, { nullable: true })
    website!: string | null;

    @Field(() => String, { nullable: true })
    email!: string | null;

    @Field(() => Date)
    created_at!: Date;

    @Field(() => Date, { nullable: true })
    updated_at!: Date | null;

    @Field(() => Boolean)
    has_sub_companies!: Boolean;

    @Field(() => Boolean)
    has_parent_company!: Boolean;


    // Stations relation
    @Field(() => [CompanyStationResType], { nullable: true })
    stations?: CompanyStationResType[]


    /***/


    constructor(data: CompanyDto, hashidsLib: HashidsLibInterface)
    {
        this.id = hashidsLib.encode(data.id);
        this.name = data.name;
        this.website = data.website;
        this.email = data.email;

        this.created_at = data.createdAt;
        this.updated_at = data.updatedAt;

        this.has_sub_companies = data.hasSubCompanies;
        this.has_parent_company = data.hasParentCompany;
    }
}