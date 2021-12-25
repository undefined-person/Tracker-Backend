import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { Response, Request } from 'express'

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
  async signUpLocal(@Body('user') createUserDto: CreateUserDto) {
    await this.authService.signUpLocal(createUserDto)
  }

  @Public()
  @Post('/local/signin')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body('user') loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response): Promise<Tokens> {
    const tokens = await this.authService.signInLocal(loginUserDto)
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 60 * 60 * 24 * 15, httpOnly: true, path: '/auth/refresh' })
    return tokens
  }

  @UseGuards(AtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@User('id') userId: number, @Res({ passthrough: true }) res: Response) {
    this.authService.logout(userId)
    res.clearCookie('refreshToken')
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@User() user: any, @Req() request: Request, @Res({ passthrough: true }) res: Response): Promise<Tokens> {
    const tokens = await this.authService.refreshTokens(user.id, request.cookies.refreshToken)
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 60 * 60 * 24 * 15, httpOnly: true, path: '/auth/refresh' })
    return tokens
  }
}
