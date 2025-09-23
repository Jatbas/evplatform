import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { Worker } from 'worker_threads';

import { SimulationScriptParserInterface } from '@simulation/interfaces/simulation-script-parser.interface';

import { SimulationCommandType } from '@simulation/types/simulation-command.type';


@Injectable()
export class SimulationScriptParser implements SimulationScriptParserInterface
{
    public async exec(script: string): Promise<SimulationCommandType[]>
    {
        // Set path to dist worker file
        const workerPath = join(__dirname, 'simulation-script-parser.worker.js');


        // Execute worker
        const res: SimulationCommandType[] = await new Promise((resolve, reject) => {

            const worker = new Worker(workerPath, {

                workerData: { script },
            });


            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', code => {

                if (code !== 0)
                {
                    reject(new Error('Worker exited with code ' + code));
                }
            });
        });


        return res;
    }
}