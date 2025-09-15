export type SimulationSnapshotType = {

    command: string;
    timestamp: number;

    companies: Array<{
        id: string|number;
        chargingStations: number[];
        chargingPower: number;
    }>;

    totalChargingStations: number[];
    totalChargingPower: any;
}