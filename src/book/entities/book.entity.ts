import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../Generics/timestamp';
import { AuthorEntity } from './author.entity';

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

  @ManyToOne((type) => AuthorEntity, (author) => author.listeLivres, {
    //lazy: true,
    cascade: true,
  })
  author: AuthorEntity;
}
