
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('clients')
  export class Client {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'first_name', length: 100 })
    firstName: string;
  
    @Column({ name: 'last_name', length: 100 })
    lastName: string;
  
    @Column({ length: 13 })
    rfc: string;
  
    @Column({ length: 20, nullable: true })
    phone: string;
  
    @Column({ name: 'birth_date', type: 'date', nullable: true })
    birthDate: Date;
  
    @Column({ length: 100, unique: false, nullable: false })
    email: string;
  
    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;
  }
  