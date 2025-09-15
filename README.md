# Backend Developer Assignment

## Overview

This API manages electric charging infrastructure for companies.
It allows for creating and managing companies, associating parent/child companies, adding and maintaining charging stations (with geolocation), and running simulations of charging activity for functional verification.

**Key business logic:**
- **Companies:** Register, update, delete and list companies.
- **Company Associations:** Model relationships between companies (e.g., one company owns others).
- **Stations:** Each company can have multiple charging stations, each with a type and geospatial location.
- **Station Types:** Define charging characteristics (e.g., max power).
- **Simulation:** Parse and run command scripts to simulate a station operation.

**API structure highlights:**
- RESTful routes for CRUD on companies, stations, station types, and company associations.
- Specialized endpoints for querying all stations belonging to a company (including subsidiaries).
- Simulation endpoints for parsing command scripts and evaluating business logic.

## Key Architectural Decisions

- **NestJS**: The project uses the NestJS framework for its strong support for modularity, dependency injection, and testability.
- **SOLID principles**: The service layer and all downstream classes are designed to follow SOLID principles, supporting maintainability and extensibility.
- **DTOs**: Data Transfer Objects (DTOs) are used for all input validation, request/response shaping, and to decouple internal data models from public API contracts.
- **Value Objects**: Important business domain values (such as company name, email, geo-coordinates, etc.) are encapsulated in value objects, ensuring validation and immutability at the domain layer.
- **TypeORM**: All database access uses TypeORM with repository and entity patterns. Spatial (geo) data is handled via MySQL spatial types.
- **Testing**: Both unit and e2e tests are present. Value objects, service logic, and selected endpoints are covered.

---


## Folder Structure

- `src/common/` - Shared utilities, DTOs, pipes, value objects, etc.
- `src/companies/` - Companies and associations modules
- `src/libs/` - Reusable libraries (e.g., hashids for ID encoding)
- `src/stations/` - Stations and station types modules
- `src/simulation/` - Simulation logic


---


## Endpoints

| **Resource**             | **Method** | **Endpoint**                                            | **Description**                                         |
|--------------------------|------------|---------------------------------------------------------|---------------------------------------------------------|
| **Companies**            | GET        | `/evplatform/companies`                                      | Get all companies                                       |
|                          | GET        | `/evplatform/companies/:id`                                  | Get company by ID                                       |
|                          | GET        | `/evplatform/companies/:id/stations`                         | Get stations for a company (and its children)           |
|                          | POST       | `/evplatform/companies`                                      | Create a new company                                    |
|                          | PATCH      | `/evplatform/companies/:id`                                  | Update a company by ID                                  |
|                          | DELETE     | `/evplatform/companies/:id`                                  | Delete a company by ID                                  |
| **Company Associations** | GET        | `/evplatform/company-associations/:id/children`              | Get child companies of a company                        |
|                          | GET        | `/evplatform/company-associations/:id/parent`                | Get parent company of a company                         |
|                          | POST       | `/evplatform/company-associations`                           | Create a company association                            |
|                          | DELETE     | `/evplatform/company-associations/:id`                       | Delete a company association by ID                      |
| **Station Types**        | GET        | `/evplatform/station-types`                                  | Get all station types                                   |
|                          | GET        | `/evplatform/station-types/:id`                              | Get station type by ID                                  |
|                          | POST       | `/evplatform/station-types`                                  | Create a new station type                               |
|                          | PATCH      | `/evplatform/station-types/:id`                              | Update a station type by ID                             |
|                          | DELETE     | `/evplatform/station-types/:id`                              | Delete a station type by ID                             |
| **Stations**             | GET        | `/evplatform/stations`                                       | Get all stations                                        |
|                          | GET        | `/evplatform/stations/:id`                                   | Get station by ID                                       |
|                          | POST       | `/evplatform/stations`                                       | Create a new station                                    |
|                          | PATCH      | `/evplatform/stations/:id`                                   | Update a station by ID                                  |
|                          | DELETE     | `/evplatform/stations/:id`                                   | Delete a station by ID                                  |
| **Simulation**           | POST       | `/evplatform/simulation`                                     | Execute a simulation script                             |


---


### 1. Install the Nest CLI (if needed)
```bash
    npm install -g @nestjs/cli
```


### 2. Create EVPatform Project
```bash
    nest new evplatform
```


### 3. Go to evplatform folder and install dependencies
```bash
    cd evplatform

    npm install @nestjs/typeorm typeorm mysql2 hashids class-validator class-transformer @nestjs/config
    npm install --save-dev @types/geojson
```


---


### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

### Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e -- --detectOpenHandles --forceExit
```


## Improvements

- **API Documentation (Swagger/OpenAPI):**
  Integrate Swagger decorators and OpenAPI support to auto-generate comprehensive, interactive API docs for all endpoints and DTOs.

- **Authentication & Authorization:**
  Add JWT or OAuth authentication to secure API endpoints and support role-based access control.


## Resources

A `resources/` folder is included, containing:

- **Postman Collection** – For quickly testing all API endpoints.
- **Database Creation Script** – SQL script for setting up the database schema.
- **Initial Data** – Example seed data to help you get started.
- **Example .env File** – Environment variable sample to help you set up local development quickly.