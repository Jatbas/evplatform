import { CompanyNameVo } from '@companies/company/value-objects/company-name.vo';


describe('CompanyNameVo', () => {

    it('should accept a valid company name', () => {

        const vo = new CompanyNameVo('EVPlatform');
        expect(vo.value).toBe('EVPlatform');
    });


    it('should throw if name is empty', () => {

        expect(() => new CompanyNameVo('')).toThrow();
    });


    it('should throw if name exceeds 500 characters', () => {

        const longName = 'V'.repeat(501);

        expect(() => new CompanyNameVo(longName)).toThrow();
    });
});