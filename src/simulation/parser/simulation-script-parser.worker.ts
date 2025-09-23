import { parentPort, workerData } from 'worker_threads';

import { SimulationCommandTypeEnum } from '@simulation/parser/simulation-command-type.enum';
import { SimulationCommandType } from '@simulation/types/simulation-command.type';


function exec(script: string): SimulationCommandType[]
{
    const lines = script.split('\n');

    const commands: SimulationCommandType[] = [];


    lines.forEach((line, i) => {

        const trimmed = line.trim();

        if (!trimmed)
        {
            return;
        }


        // Match each command
        if (/^BEGIN$/i.test(trimmed))
        {
            commands.push({
                type: SimulationCommandTypeEnum.BEGIN,
                raw: line,
                line: i + 1
            });

            return;
        }


        if (/^END$/i.test(trimmed))
        {
            commands.push({
                type: SimulationCommandTypeEnum.END,
                raw: line,
                line: i + 1
            });

            return;
        }


        if (/^START STATION (.+)$/i.test(trimmed))
        {
            const [, target] = trimmed.match(/^Start station (.+)$/i)!;

            commands.push({
                type: SimulationCommandTypeEnum.START,
                stationId: target.toLowerCase() === 'all' ? 'all' : Number(target),
                raw: line,
                line: i + 1
            });

            return;
        }


        if (/^STOP STATION (.+)$/i.test(trimmed))
        {
            const [, target] = trimmed.match(/^STOP STATION (.+)$/i)!;

            commands.push({
                type: SimulationCommandTypeEnum.STOP,
                stationId: target.toLowerCase() === 'all' ? 'all' : Number(target),
                raw: line,
                line: i + 1
            });

            return;
        }


        if (/^WAIT (\d+)$/i.test(trimmed))
        {
            const [, seconds] = trimmed.match(/^WAIT (\d+)$/i)!;

            commands.push({
                type: SimulationCommandTypeEnum.WAIT,
                waitSeconds: Number(seconds),
                raw: line,
                line: i + 1
            });

            return;
        }
    });


    return commands;
}


// Worker entrypoint
const result = exec(workerData.script);
parentPort?.postMessage(result);