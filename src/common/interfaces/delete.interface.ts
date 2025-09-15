export interface DeleteInterface
{
    exec(id: number): Promise<boolean>;
}