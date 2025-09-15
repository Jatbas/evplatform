import { MaxLength, IsString, IsInt} from 'class-validator';


export class StationTypeCreateReqDto
{
    @IsString()
    @MaxLength(500, { message: 'Station type name must be at most 500 characters' })
    public readonly name: string;


    @IsInt({ message: 'Invalid max power value' })
    public readonly max_power: number;
}