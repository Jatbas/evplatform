import { StationCoordinatesVo } from '@stations/station/value-objects/station-coordinates.vo';


describe('StationCoordinatesVo', () => {

    it('should accept valid coordinates', () => {

        const vo = new StationCoordinatesVo([24.93, 60.16]);

        expect(vo.getValue()).toEqual([24.93, 60.16]);
    });

    it('should throw for invalid coordinates (wrong length)', () => {

        expect(() => new StationCoordinatesVo([24.93])).toThrow();
    });

    it('should throw for out-of-range longitude', () => {

        expect(() => new StationCoordinatesVo([200, 60.16])).toThrow();
    });

    it('should throw for out-of-range latitude', () => {

        expect(() => new StationCoordinatesVo([24.93, 120])).toThrow();
    });
});