import { Point } from 'geojson';


export interface UtilsLibInterface
{
    md5(value: string): string;
    wktToGeoJSON(wkt: string): Point|null;
}