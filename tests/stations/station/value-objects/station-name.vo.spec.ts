import { StationNameVo } from '@stations/station/value-objects/station-name.vo';


describe('CompanyNameVo', () => {

    it('should accept a valid station name', () => {

        const vo = new StationNameVo('Station 1');
        expect(vo.value).toBe('Station 1');
    });


    it('should throw if name is empty', () => {

        expect(() => new StationNameVo('')).toThrow();
    });


    it('should throw if name exceeds 500 characters', () => {

        const longName = 'S'.repeat(501);

        expect(() => new StationNameVo(longName)).toThrow();
    });
});