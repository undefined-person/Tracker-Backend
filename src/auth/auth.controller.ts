import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'

import { AuthService } from './auth.service'
import { Public, User } from './decorators'
import { CreateUserDto, LoginUserDto } from './dto'
import { AtGuard, RtGuard } from './guards'
import { Tokens } from './types'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/local/signup')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async signUpLocal(@Body('user') createUserDto: CreateUserDto): Promise<Tokens> {
    return await this.authService.signUpLocal(createUserDto)
  }

  @Public()
  @Post('/local/signin')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body('user') loginUserDto: LoginUserDto): Promise<Tokens> {
    return await this.authService.signInLocal(loginUserDto)
  }

  @UseGuards(AtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@User('id') userId: number) {
    return this.authService.logout(userId)
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@User() user: any): Promise<Tokens> {
    return this.authService.refreshTokens(user.id, user.refreshToken)
  }
}
