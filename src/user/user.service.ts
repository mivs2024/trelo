import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

     getById(id: number) {
      return this.prisma.user.findUnique({
        where: {
          id,
        },
        
        include:{
            tasks:true
        }
      })
    }
    
  
}
