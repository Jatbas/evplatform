import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CompanyDto } from '@companies/company/dtos/company.dto';


@Injectable()
export class CompanyCreateSetLogsSubscriber
{
    @OnEvent('company.created')
    async handleCompanyCreatedEvent(payload: CompanyDto)
    {
        // Here we could save the log to whatever database we want...
        console.log('[LOG] Company created: ' + payload.name);
    }
}