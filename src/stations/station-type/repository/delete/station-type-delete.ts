import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteInterface } from '@common/interfaces/delete.interface';

import { StationType } from '@stations/entities/station-type.entity';


@Injectable()
export class StationTypeDelete implements DeleteInterface
{
    constructor(
        @InjectRepository(StationType, 'evplatform')
        private readonly evplatformRepository: Repository<StationType>
    ) {}


    /***/


    public async exec(id: number): Promise<boolean>
    {
        // Delete station type
        try
        {
            const result = await this.evplatformRepository.delete(id.toString());

            if (result.affected === 0)
            {
                throw new NotFoundException('Station type not found');
            }
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                throw new NotFoundException('Station type not found');
            }

            throw new BadRequestException(error.sqlMessage);
        }


        return true;
    }
}