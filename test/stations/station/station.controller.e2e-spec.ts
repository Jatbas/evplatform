import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../../../src/app.module';


describe('StationController (e2e)', () => {

    let app: INestApplication;


    beforeAll(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });


    it('/stations (GET) should return an array', async () => {

        const response = await request(app.getHttpServer()).get('/stations');

        expect(response.status).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);
    });


    afterAll(async () => {

        try
        {
            await app.close();
        }
        catch (e) {}
    });
});