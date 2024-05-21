import { IsArray, IsNumber } from 'class-validator'

export class UpdateOrderDto {
	@IsArray()
	ids: number[]
}
