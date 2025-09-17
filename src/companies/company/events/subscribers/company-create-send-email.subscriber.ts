import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CompanyDto } from '@companies/company/dtos/company.dto';


@Injectable()
export class CompanyCreateSendEmailSubscriber
{
    @OnEvent('company.created')
    async handleCompanyCreatedEvent(payload: CompanyDto)
    {
        // Here we can send an email...
        console.log('[EMAIL] Sent creation email for company: ' + payload.name);
    }
}