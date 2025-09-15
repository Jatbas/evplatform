import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';


export class SimulationReqDto
{
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsString()
    @IsNotEmpty({ message: 'Script is required' })
    public readonly script: string;
}