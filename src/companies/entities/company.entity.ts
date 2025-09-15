import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'companies' })
export class Company
{
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: string; // Because mysql id is bigint

    @Column({ type: 'varchar', length: 500 })
    name: string;

    @Column({ type: 'varchar', length: 250, nullable: true  })
    website: string | null;

    @Column({ type: 'varchar', length: 250, nullable: true  })
    email: string | null;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: true })
    updatedAt: Date | null;
}