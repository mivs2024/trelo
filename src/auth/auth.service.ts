import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwt: JwtService
	) {}

    async login (dto:AuthDto){
        return dto
    }
}
