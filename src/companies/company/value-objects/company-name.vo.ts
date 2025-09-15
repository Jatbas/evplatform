import { InvalidValueObjectError } from '@common/errors/invalid-value-object.error';


export class CompanyNameVo
{
    public readonly value: string;

    constructor(value: string)
    {
        if (typeof value !== 'string' || value.trim() === '')
        {
            throw new InvalidValueObjectError('Company name must be a non-empty string');
        }

        if (value.length > 500)
        {
            throw new InvalidValueObjectError('Company name must be at most 500 characters');
        }

        this.value = value;
    }
}