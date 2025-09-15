import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Point } from 'geojson';
import { PointTransformer } from '@common/transformer/point.transformer';


@Entity({ name: 'stations' })
export class Station
{
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: string; // Because mysql id is bigint

    @Column({ name: 'company_id', type: 'bigint', unsigned: true })
    companyId: string;

    @Column({ name: 'station_type_id', type: 'bigint', unsigned: true })
    stationTypeId: string;

    @Column({ type: 'varchar', length: 500 })
    name: string;

    @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326 , transformer: PointTransformer})
    location: Point;

    @Column({ type: 'varchar', length: 32 })
    reference: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: true })
    updatedAt: Date | null;
}