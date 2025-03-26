import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Policy } from '../policies/policy.entity';
import { User } from '../users/user.entity';
import { Client } from '../clients/client.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación con Policy
  @ManyToOne(() => Policy, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
  @JoinColumn({ name: 'policy_id' })
  policy: Policy;

  // Relación con User
  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relación con Client
  @ManyToOne(() => Client, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ name: 'issue_date', type: 'date' })
  issueDate: Date;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
