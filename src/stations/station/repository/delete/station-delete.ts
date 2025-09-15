import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteInterface } from '@common/interfaces/delete.interface';

import { Station } from '@stations/entities/station.entity';


@Injectable()
export class StationDelete implements DeleteInterface
{
    constructor(
        @InjectRepository(Station, 'evplatform')
        private readonly evplatformRepository: Repository<Station>
    ) {}


    /***/


    public async exec(id: number): Promise<boolean>
    {
        // Delete station
        try
        {
            const result = await this.evplatformRepository.delete(id.toString());

            if (result.affected === 0)
            {
                throw new NotFoundException('Station not found');
            }
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                throw new NotFoundException('Station not found');
            }

            throw new BadRequestException(error.sqlMessage);
        }


        return true;
    }
}