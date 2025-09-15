import { InvalidValueObjectError } from '@common/errors/invalid-value-object.error';


export class EmailVo
{
    public readonly value: string;

    constructor(value: string)
    {
        if (!value.match(/^[^@]+@[^@]+\.[^@]+$/))
        {
            throw new InvalidValueObjectError('Invalid email');
        }

        if (value.length > 250)
        {
            throw new InvalidValueObjectError('Email must be at most 250 characters');
        }

        this.value = value;
    }
}