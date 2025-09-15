import { Length, MaxLength, IsArray, IsString, ArrayMinSize, ArrayMaxSize, IsNumber} from 'class-validator';


export class StationCreateReqDto
{
    @IsString()
    @Length(20, 20, { message: 'Invalid company id' })
    public readonly company_id: string;


    @IsString()
    @Length(20, 20, { message: 'Invalid station type id' })
    public readonly station_type_id: string;


    @IsString()
    @MaxLength(500, { message: 'Station name must be at most 500 characters' })
    public readonly name: string;


    @IsArray({ message: 'Location must be an array' })
    @ArrayMinSize(2, { message: 'Location must have 2 elements (longitude, latitude)' })
    @ArrayMaxSize(2, { message: 'Location must have 2 elements (longitude, latitude)' })
    @IsNumber({}, { each: true, message: 'Location coordinates must be numbers' })
    public readonly location: number[];
}