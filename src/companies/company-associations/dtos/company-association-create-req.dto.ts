import { Length, IsString} from 'class-validator';


export class CompanyAssociationCreateReqDto
{
    @IsString()
    @Length(20, 20, { message: 'Invalid parent company id' })
    public readonly parent_company_id: string;


    @IsString()
    @Length(20, 20, { message: 'Invalid parent company id' })
    public readonly child_company_id: string;
}