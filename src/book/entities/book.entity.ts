import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../Generics/timestamp';

@Entity('livre')
export class BookEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 20,

    // name : 'titre',
    // update : false
  })
  title: string;
  @Column()
  editor: string;
  @Column({
    type: 'int',
  })
  year: number;
}
