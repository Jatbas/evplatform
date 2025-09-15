import { Length, MaxLength, IsArray, IsString, ArrayMinSize, ArrayMaxSize, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';


export class StationUpdateReqDto
{
    @Transform(({ value }) => value === '' ? null : value)
    @IsString()
    @MaxLength(500, { message: 'Station name must be at most 500 characters' })
    @IsOptional()
    public readonly name: string;


    @Transform(({ value }) => value === '' ? null : value)
    @IsArray({ message: 'Location must be an array' })
    @ArrayMinSize(2, { message: 'Location must have 2 elements (longitude, latitude)' })
    @ArrayMaxSize(2, { message: 'Location must have 2 elements (longitude, latitude)' })
    @IsNumber({}, { each: true, message: 'Location coordinates must be numbers' })
    @IsOptional()
    public readonly location: number[];
}