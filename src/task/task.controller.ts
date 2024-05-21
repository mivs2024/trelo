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
import { TaskDto } from './task.dto'
import { TaskService } from './task.service'

@Controller('user/tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: number) {
		return this.taskService.getAll(userId)

	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post()
	async create(@CurrentUser('id') userId: number, @Body() dto: TaskDto) {
		return this.taskService.create(dto, userId)
	}

	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.taskService.delete(+id)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Put(':id')
	async update(
		@CurrentUser('id') userId: number,
		@Body() dto: TaskDto,
		@Param('id') id: string
	) {
		return this.taskService.update(dto, +id, userId)
	}
}
