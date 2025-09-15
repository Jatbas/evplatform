import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Point } from 'geojson';


@Injectable()
export class UtilsLib
{
    public md5(value: string): string
    {
        return crypto.createHash('md5').update(value).digest('hex');
    }


    /***/


    wktToGeoJSON(wkt: string): Point|null
    {
        const match = wkt.match(/^POINT\(([-\d.]+) ([-\d.]+)\)$/);

        if (!match)
        {
            return null
        }


        return {
            type: "Point",
            coordinates: [parseFloat(match[1]), parseFloat(match[2])],
        };
    }
}