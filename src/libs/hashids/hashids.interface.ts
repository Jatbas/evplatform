export interface HashidsLibInterface
{
    encode(id: number | string): string;
    decode(hash: string): number | null;
}