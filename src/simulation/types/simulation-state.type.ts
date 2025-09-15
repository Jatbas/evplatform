export type SimulationStateType = {

    companies: Array<{
        id: string|number;
        chargingStations: Array<string|number>;
        chargingPower: number;
    }>;

    totalChargingStations: number[];
    totalChargingPower: number;
};