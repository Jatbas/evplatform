import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteInterface } from '@common/interfaces/delete.interface';

import { CompanyAssociation } from '@companies/entities/company-association.entity';


@Injectable()
export class CompanyAssociationDelete implements DeleteInterface
{
    constructor(
        @InjectRepository(CompanyAssociation, 'evplatform')
        private readonly evplatformRepository: Repository<CompanyAssociation>,
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
                throw new NotFoundException('Company association not found');
            }
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                throw new NotFoundException('Company association not found');
            }

            throw new BadRequestException(error.sqlMessage);
        }


        return true;
    }
}