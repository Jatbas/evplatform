import { ValueTransformer } from 'typeorm';
import { Point } from 'geojson';


export const PointTransformer: ValueTransformer = {

    to: (point: Point) => {

        if (!point) return null;

        const [lon, lat] = point.coordinates;

        return `POINT(${lon} ${lat})`;
    },
    from: (value: any) => {

        if (typeof value === 'object' && value.type === 'Point') return value;

        if (typeof value === 'string' || Buffer.isBuffer(value))
        {
            value = value.toString();

            const match = value.match(/^POINT\(([-\d.]+) ([-\d.]+)\)$/);

            if (!match) return null;
            return {
                type: "Point",
                coordinates: [parseFloat(match[1]), parseFloat(match[2])]
            };
        }

        return null;
    }
};