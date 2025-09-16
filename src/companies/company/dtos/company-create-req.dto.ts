import { InputType, Field } from '@nestjs/graphql';
import { MaxLength, IsOptional, IsString, IsUrl, IsEmail} from 'class-validator';
import { Transform } from 'class-transformer';


@InputType()
export class CompanyCreateReqDto
{
    @Field()
    @IsString()
    @MaxLength(500, { message: 'Company name must be at most 500 characters' })
    public readonly name: string;


    @Field({ nullable: true })
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsUrl({}, { message: 'Invalid website' })
    @MaxLength(250, { message: 'Company website must be at most 250 characters' })
    @IsOptional()
    public readonly website: string;


    @Field({ nullable: true })
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsEmail({}, { message: 'Invalid email' })
    @MaxLength(250, { message: 'Company email must be at most 250 characters' })
    @IsOptional()
    public readonly email: string;
}