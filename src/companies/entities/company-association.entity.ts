import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'company_associations' })
export class CompanyAssociation
{
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: string; // Because mysql id is bigint

    @Column({ name: 'parent_company_id', type: 'bigint', unsigned: true })
    parentCompanyId: string;

    @Column({ name: 'child_company_id', type: 'bigint', unsigned: true })
    childCompanyId: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: true })
    updatedAt: Date | null;
}