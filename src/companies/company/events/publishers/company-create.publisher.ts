import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CompanyCreatePublisherInterface } from '@companies/company/interfaces/company-create-publisher.interface';

import { CompanyDto } from '@companies/company/dtos/company.dto';


@Injectable()
export class CompanyCreatePublisher implements CompanyCreatePublisherInterface
{
    constructor(
        private readonly eventEmitter: EventEmitter2
    ) {}


    /***/


    public exec(company: CompanyDto): boolean
    {
        // Publish event
        return this.eventEmitter.emit('company.created', company);
    }
}