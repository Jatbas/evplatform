import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../../src/app.module';


describe('CompanyResolver (GraphQL e2e)', () => {

    let app: INestApplication;


    beforeAll(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });


    it('/graphql (POST) should return a company with stations', async () => {

        const query = `
        query($id: ID!) {
            getCompanies(id: $id) {
            id
            name
            website
            email
            created_at
            updated_at
            has_sub_companies
            has_parent_company
            stations {
                id
                name
                reference
                location
                station_type
            }
            }
        }
        `;

        const variables = {
            id: "g6rx5oQW7W4qnO90PJwA",
        };

        const response = await request(app.getHttpServer()).post('/evplatform/graphql')
        .send({ query, variables });

        expect(response.status).toBe(200);
        expect(response.body.data.getCompanies).toBeDefined();
        expect(Array.isArray(response.body.data.getCompanies)).toBe(true);

        const company = response.body.data.getCompanies[0];
        expect(company.id).toBe("g6rx5oQW7W4qnO90PJwA");
        expect(company.stations).toBeDefined();
        expect(Array.isArray(company.stations)).toBe(true);
    });


    afterAll(async () => {

        try
        {
            await app.close();
        }
        catch (e) {}
    });
});