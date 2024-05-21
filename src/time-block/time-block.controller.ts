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
import { TimeBlockDto } from './dto/time-block.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { TimeBlockService } from './time-block.service'

@Controller('user/time-blocks')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}


	
	@UsePipes(new ValidationPipe())
	@Auth()
	@Put('update-order')
	async updateOrder(@Body() dto: UpdateOrderDto) {
		return this.timeBlockService.updateOrder(dto.ids)
	}
	
	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: number) {
		return this.timeBlockService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post()
	async create(@CurrentUser('id') userId: number, @Body() dto: TimeBlockDto) {
		return this.timeBlockService.create(dto, userId)
	}

	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string, @CurrentUser('id') userId: number) {
		return this.timeBlockService.delete(+id, userId)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Put(':id')
	async update(
		@CurrentUser('id') userId: number,
		@Body() dto: TimeBlockDto,
		@Param('id') id: string
	) {
		return this.timeBlockService.update(dto, +id, userId)
	}

}
