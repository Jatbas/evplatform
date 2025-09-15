import { MaxLength, IsOptional, IsString, IsInt} from 'class-validator';
import { Transform } from 'class-transformer';


export class StationTypeUpdateReqDto
{
    @Transform(({ value }) => value === '' ? null : value)
    @IsString()
    @MaxLength(500, { message: 'Station type name must be at most 500 characters' })
    @IsOptional()
    public readonly name: string;


    @Transform(({ value }) => value === '' ? null : value)
    @IsInt({ message: 'Invalid max power value' })
    @IsOptional()
    public readonly max_power: number;
}