import { SimulationCommandType } from '@simulation/types/simulation-command.type';


export interface SimulationScriptParserInterface
{
    exec(script: string): SimulationCommandType[];
}