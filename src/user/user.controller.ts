import {
	Body,
	Controller,
	Get,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserService } from './user.service'
import { UserDto } from './user.dto'

@Controller('user/profile')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Get()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.getProfile(id)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Put()
	async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.update(id, dto)
	}
}
