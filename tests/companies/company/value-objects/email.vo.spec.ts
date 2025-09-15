import { EmailVo } from '@companies/company/value-objects/email.vo';


describe('EmailVo', () => {

    it('should accept a valid email', () => {

        const vo = new EmailVo('jatbas@gmail.com.com');

        expect(vo.value).toBe('jatbas@gmail.com.com');
    });

    it('should throw for invalid email', () => {

        expect(() => new EmailVo('email@')).toThrow();
    });

    it('should throw for too long email', () => {

        const longEmail = 'a'.repeat(250) + '@e.com';

        expect(() => new EmailVo(longEmail)).toThrow();
    });
});