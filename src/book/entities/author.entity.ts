import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../Generics/timestamp';
import { BookEntity } from './book.entity';

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

  @OneToMany(() => BookEntity, (book) => book.author)
  listeLivres: BookEntity[];
}
