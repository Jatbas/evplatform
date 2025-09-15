import { InvalidValueObjectError } from '@common/errors/invalid-value-object.error';


export class StationCoordinatesVo
{
    public readonly longitude: number;
    public readonly latitude: number;


    constructor(coords: number[])
    {
        if (!Array.isArray(coords) || coords.length !== 2)
        {
            throw new InvalidValueObjectError('Station coordinates must be an array of two numbers');
        }


        const [lng, lat] = coords;

        if (typeof lng !== 'number' || typeof lat !== 'number')
        {
            throw new InvalidValueObjectError('Coordinates must be numbers');
        }

        if (lng < -180 || lng > 180)
        {
            throw new InvalidValueObjectError('Longitude must be between -180 and 180');
        }

        if (lat < -90 || lat > 90)
        {
            throw new InvalidValueObjectError('Latitude must be between -90 and 90');
        }


        this.longitude = lng;
        this.latitude = lat;
    }


    /***/


    getValue(): [number, number]
    {
        return [this.longitude, this.latitude];
    }
}