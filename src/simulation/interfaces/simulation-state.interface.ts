export interface SimulationStateInterface
{
    getTime(): number;
    setTime(time?: number|null): void;

    startStation(stationId: number): void;
    stopStation(stationId: number): void;

    startAllStations(): void;
    stopAllStations(): void;

    getState(): any;
}