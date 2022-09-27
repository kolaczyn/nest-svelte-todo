import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  guid: string;
  @Column({ nullable: false })
  done: boolean;
  @Column({ nullable: false })
  title: string;
}
