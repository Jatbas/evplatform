import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteInterface } from '@common/interfaces/delete.interface';

import { Company } from '@companies/entities/company.entity';


@Injectable()
export class CompanyDelete implements DeleteInterface
{
    constructor(
        @InjectRepository(Company, 'evplatform')
        private readonly evplatformRepository: Repository<Company>
    ) {}


    /***/


    public async exec(id: number): Promise<boolean>
    {
        // Delete company
        try
        {
            const result = await this.evplatformRepository.delete(id.toString());

            if (result.affected === 0)
            {
                throw new NotFoundException('Company not found');
            }
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                throw new NotFoundException('Company not found');
            }

            throw new BadRequestException(error.sqlMessage);
        }


        return true;
    }
}