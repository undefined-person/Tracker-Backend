import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { IsNull, Not, Repository } from 'typeorm'

import { CreateUserDto, LoginUserDto } from './dto'
import { Tokens } from './types'
import { UserEntity } from './user.entity'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>, private readonly jwtService: JwtService) {}

  async signUpLocal(createUserDto: CreateUserDto): Promise<Tokens> {
    const userByEmail = await this.userRepo.findOne({ email: createUserDto.email })
    const userByUserName = await this.userRepo.findOne({ username: createUserDto.username })

    if (userByEmail || userByUserName) {
      throw new HttpException('Email or username are already taken', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const newUser = new UserEntity()
    Object.assign(newUser, createUserDto)
    const res = await this.userRepo.save(newUser)

    const tokens = await this.generateJWT(res.id, res.email)

    await this.updateRtHash(res.id, tokens.refreshToken)

    return tokens
  }

  async signInLocal(loginUserDto: LoginUserDto): Promise<Tokens> {
    const user = await this.userRepo.findOne({ email: loginUserDto.email }, { select: ['id', 'email', 'username', 'password'] })

    if (!user) {
      throw new HttpException('User is not exist', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const isPasswordCorrect = await compare(loginUserDto.password, user.password)

    if (!isPasswordCorrect) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const tokens = await this.generateJWT(user.id, user.email)

    await this.updateRtHash(user.id, tokens.refreshToken)

    return tokens
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    })

    if (!user || !user.hashedRt) {
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED)
    }

    const rtMatches = await compare(rt, user.hashedRt)

    if (!rtMatches) {
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED)
    }

    const tokens = await this.generateJWT(user.id, user.email)

    await this.updateRtHash(user.id, tokens.refreshToken)

    return tokens
  }

  async logout(userId: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
        hashedRt: Not(IsNull()),
      },
    })

    await this.userRepo.save({ ...user, hashedRt: null })
  }

  async generateJWT(id: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          email,
        },
        {
          secret: process.env.AT_SECRET,
          expiresIn: 60 * 15,
        }
      ),
      this.jwtService.signAsync(
        {
          id,
          email,
        },
        {
          secret: process.env.RT_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        }
      ),
    ])

    return {
      accessToken: at,
      refreshToken: rt,
    }
  }

  hashData(data: string) {
    return hash(data, 10)
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt)
    const user = await this.userRepo.findOne({ id: userId })
    user.hashedRt = hash
    await this.userRepo.save(user)
  }
}
