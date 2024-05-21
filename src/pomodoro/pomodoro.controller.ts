import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { PomodoroRoundDto, PomodoroSessionDto } from './pomodoro.dto'
import { PomodoroService } from './pomodoro.service'

@Controller('user/timer')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}

	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') userId: number) {
		return this.pomodoroService.getTodaySession(userId)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post()
	async create(@CurrentUser('id') userId: number) {
		return this.pomodoroService.create(userId)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Put('/round/:id')
	async updateRound(@Param('id') id: string, dto: PomodoroRoundDto) {
		return this.pomodoroService.updateRound(dto, +id)
	}

	@Auth()
	@Delete(':id')
	async deleteSession(
		@Param('id') id: string,
		@CurrentUser('id') userId: number
	) {
		return this.pomodoroService.deleteSession(+id, userId)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Put(':id')
	async update(
		@CurrentUser('id') userId: number,
		@Body() dto: PomodoroSessionDto,
		@Param('id') id: string
	) {
		return this.pomodoroService.update(dto, +id, userId)
	}
}
