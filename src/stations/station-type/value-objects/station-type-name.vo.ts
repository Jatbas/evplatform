import { InvalidValueObjectError } from '@common/errors/invalid-value-object.error';


export class StationTypeNameVo
{
    public readonly value: string;

    constructor(value: string)
    {
        if (typeof value !== 'string' || value.trim() === '')
        {
            throw new InvalidValueObjectError('Station type name must be a non-empty string');
        }

        if (value.length > 500)
        {
            throw new InvalidValueObjectError('Station type must be at most 500 characters');
        }

        this.value = value;
    }
}