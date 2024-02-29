import { TimeStamp } from 'src/book/Generics/timestamp';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../generics/roleEnum';

@Entity('user')
export class UserEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.ROLE_USER,
  })
  role;
}
