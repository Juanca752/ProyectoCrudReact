import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../clients/client.entity';
import { Insurer } from '../insurers/insurer.entity';
import { PolicyType } from '../policy_types/policy-type.entity';

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'policy_number', type: 'varchar', length: 50, nullable: false })
  policyNumber: string;

  // Relación con Insurer
  @ManyToOne(() => Insurer, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
  @JoinColumn({ name: 'insurer_id' })
  insurer: Insurer;

  // Relación con Client
  @ManyToOne(() => Client, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  // Relación con PolicyType
  @ManyToOne(() => PolicyType, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
  @JoinColumn({ name: 'policy_type_id' })
  policyType: PolicyType;

  @Column({ name: 'payment_frequency', type: 'varchar', length: 50, nullable: false })
  paymentFrequency: string; // e.g. monthly, quarterly, yearly

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ name: 'start_date', type: 'date', nullable: false })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'text', nullable: true })
  comments?: string;

  @Column({ name: 'file_path', type: 'varchar', length: 255, nullable: true })
  filePath?: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
