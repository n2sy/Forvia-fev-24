import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../Generics/timestamp';

@Entity('author')
export class AuthorEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 20,
  })
  prenom: string;
  @Column({
    length: 20,
    update: false,
  })
  nom: string;
}
