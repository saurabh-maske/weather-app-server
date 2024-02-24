import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Location')
export class Location {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;
}
