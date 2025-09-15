import { InvalidValueObjectError } from '@common/errors/invalid-value-object.error';


export class WebsiteVo
{
    public readonly value: string;

    constructor(value: string)
    {
        if (!value.match(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/))
        {
            throw new InvalidValueObjectError('Invalid website');
        }

        if (value.length > 250)
        {
            throw new InvalidValueObjectError('Website must be at most 250 characters');
        }

        this.value = value;
    }
}