import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { TimeBlockDto } from './dto/time-block.dto'
@Injectable()
export class TimeBlockService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: number) {
		return this.prisma.timeBlock.findMany({
			where: { userId },
			orderBy: {
				order: 'asc'
			}
		})
	}

	async create(dto: TimeBlockDto, userId: number) {
		return this.prisma.timeBlock.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}


	async update(dto: Partial<TimeBlockDto>, timeBlockId: number, userId: number) {
		return this.prisma.timeBlock.update({
			where: {
				userId,
				id: timeBlockId
			},
			data: dto
		})
	}

	async delete(timeBlockId: number, userId: number) {
		return this.prisma.timeBlock.delete({
			where: {
				id: timeBlockId,
				userId
			}
		})
	}

	
	async updateOrder(ids : number[]) {
		
		
		return this.prisma.$transaction(
			ids.map((id,order)=>
			this.prisma.timeBlock.update({
				where:{id},
				data:{order}
			}))
		)
	}
}
