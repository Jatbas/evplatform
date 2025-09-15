import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'station_types' })
export class StationType
{
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: string; // Because mysql id is bigint

    @Column({ type: 'varchar', length: 500 })
    name: string;

    @Column({ name: 'max_power', type: 'int' })
    maxPower: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: true })
    updatedAt: Date | null;
}