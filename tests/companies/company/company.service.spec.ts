import { Test, TestingModule } from '@nestjs/testing';

import { CompanyService } from '@companies/company/company.service';
import { CompanyDto } from '@companies/company/dtos/company.dto';

import { CompanyRepositoryInterface } from '@companies/company/interfaces/company-repository.interface';


describe('CompanyService', () => {

    let service: CompanyService;
    let mockCompanyRepository: jest.Mocked<CompanyRepositoryInterface>;


    beforeEach(async () => {

        mockCompanyRepository = { get: jest.fn() } as any;


        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyService,
                { provide: 'CompanyRepository', useValue: mockCompanyRepository },
            ],
        }).compile();

        service = module.get<CompanyService>(CompanyService);
    });


    it('should return companies from the repository', async () => {

        const now = new Date();

        const companies: CompanyDto[] = [
            { id: '1', name: 'Test 1', website: 'test1.com', email: 'qwe@test1.com', createdAt: now, updatedAt: now, hasSubCompanies: true, hasParentCompany: false },
            { id: '2', name: 'Test 2', website: 'test2.com', email: 'zxc@test2.com', createdAt: now, updatedAt: now, hasSubCompanies: false, hasParentCompany: true }
        ];

        mockCompanyRepository.get.mockResolvedValue(companies);


        const result = await service.get();

        expect(result).toEqual(companies);

        expect(mockCompanyRepository.get).toHaveBeenCalled();
    });
});