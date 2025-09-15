import { SimulationStateInterface } from '@simulation/interfaces/simulation-state.interface';

import { SimulationStateType } from '@simulation/types/simulation-state.type';

import { StationDto } from '@stations/station/dtos/station.dto';


export class SimulationState implements SimulationStateInterface
{
    private stations: StationDto[];
    private currentTime: number;
    private chargingStations: Map<number, boolean>;


    /***/


    constructor(stations: StationDto[])
    {
        this.stations = stations;
        this.chargingStations= new Map();
    }


    /***/


    public setTime(time?: number|null): void
    {
        // If time is undefined or null get the current UNIX timestamp in seconds
        this.currentTime = ((time === undefined || time === null) ? Math.floor(Date.now() / 1000) : time);
    }

    public getTime(): number
    {
        return this.currentTime;
    }


    /***/


    public startStation(stationId: number): void
    {
        this.chargingStations.set(stationId, true);
    }

    public stopStation(stationId: number): void
    {
        this.chargingStations.set(stationId, false);
    }


    public startAllStations(): void
    {
        for (const station of this.stations)
        {
            this.startStation(+station.id);
        }
    }

    public stopAllStations(): void
    {
        for (const station of this.stations)
        {
            this.stopStation(+station.id);
        }
    }


    /***/


    private getStationCompanyId(stationId: number): number|null
    {
        const res = this.stations.filter(station => {

            return station.id === stationId.toString()
        });


        if (!res)
        {
            return null;
        }

        return +res[0].companyId;
    }


    private getStationMaxPower(stationId: number): number|null
    {
        const res = this.stations.filter(station => {

            return station.id === stationId.toString()
        });


        if (!res)
        {
            return null;
        }

        return +res[0].stationType.maxPower;
    }


    /***/


    public getState(): SimulationStateType
    {
        const perCompany = new Map<number, { id: number; chargingStations: number[]; chargingPower: number }>();

        let totalChargingPower: number = 0;


        // Get charging stations
        const chargingStations = Array.from(this.chargingStations.entries())
            .filter(([_, isCharging]) => { return isCharging === true })
            .map(([stationID]) => stationID);


        for (let stationId of chargingStations)
        {
            const companyId: number = this.getStationCompanyId(stationId) as number;
            const maxPower = this.getStationMaxPower(stationId);


            totalChargingPower += (maxPower === null ? 0 : maxPower);


            const entry = perCompany.get(companyId) ?? {

                id: companyId,
                chargingStations: [],
                chargingPower: 0,
            };


            entry.chargingStations.push(stationId);
            entry.chargingPower += (maxPower === null ? 0 : maxPower);


            perCompany.set(companyId, entry);
        }


        return {
            totalChargingStations: chargingStations,
            totalChargingPower: totalChargingPower,
            companies: Array.from(perCompany.values())
        };
    }
}