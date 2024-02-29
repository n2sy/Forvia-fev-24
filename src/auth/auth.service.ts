import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtSer: JwtService,
  ) {}

  async signup(credentials) {
    let newUser = this.userRepo.create({
      username: credentials.username,
      email: credentials.email,
      salt: await bcrypt.genSalt(),
      // role : RoleEnum.ROLE_USER
    });
    newUser.password = await bcrypt.hash(credentials.password, newUser.salt);
    return this.userRepo.save(newUser);
  }

  async signin(credentials) {
    const { identifiant, password } = credentials;
    const qb = await this.userRepo.createQueryBuilder('user');

    let user = await qb
      .select('user')
      .where('user.username = :identity OR email = :identity')
      .setParameter('identity', identifiant)
      .getOne();

    if (!user) throw new NotFoundException('Username or email not existing');
    else {
      let result = await bcrypt.compare(password, user.password);

      if (result) {
        const token = this.jwtSer.sign({
          id: user.id,
          role: user.role,
        });
        return {
          identifiant: identifiant,
          role: user.role,
          token: token,
        };
      } else {
        throw new NotFoundException('Wrong Password');
      }
    }
  }
}
