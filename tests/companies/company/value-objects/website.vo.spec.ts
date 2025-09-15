import { WebsiteVo } from '@companies/company/value-objects/website.vo';


describe('WebsiteVo', () => {

    it('should accept a valid url', () => {

        const vo = new WebsiteVo('https://evplatform.global');

        expect(vo.value).toBe('https://evplatform.global');
    });

    it('should throw for invalid url', () => {

        expect(() => new WebsiteVo('not-a-url')).toThrow();
    });

    it('should throw for too long url', () => {

        const longUrl = 'https://evplatform.global/' + 'a'.repeat(250);

        expect(() => new WebsiteVo(longUrl)).toThrow();
    });
});