import { SimulationCommandInterface } from '@simulation/interfaces/simulation-command.interface';


export interface SimulationCommandMapInterface
{
    exec(): Record<string, SimulationCommandInterface>;
}