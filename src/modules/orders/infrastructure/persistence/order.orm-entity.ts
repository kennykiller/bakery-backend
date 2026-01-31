import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderItemOrmEntity } from './order-item.orm-entity';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId?: string;

  @Column({ type: 'varchar', length: 32 })
  status!: string;

  @Column({ name: 'total_cents', type: 'integer' })
  totalCents!: number;

  @Column({ name: 'delivery_address', type: 'text', nullable: true })
  deliveryAddress?: string;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @OneToMany(() => OrderItemOrmEntity, (i) => i.order, {
    cascade: true,
    eager: true,
  })
  items!: OrderItemOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
