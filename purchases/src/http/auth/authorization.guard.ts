import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import { auth } from 'express-oauth2-jwt-bearer'
import { promisify } from 'node:util'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string
  private AUTH0_DOMAIN: string

  constructor(private readonly configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? ''
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? ''
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { getRequest, getResponse } = context.switchToHttp()
    const req = getRequest()
    const res = getResponse()

    const jwtCheck = promisify(
      auth({
        audience: this.AUTH0_AUDIENCE,
        issuerBaseURL: this.AUTH0_DOMAIN,
        tokenSigningAlg: 'RS256',
        jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
      }),
    )

    try {
      await jwtCheck(req, res)

      return true
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
