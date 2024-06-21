import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class EnrollmentsService {
  constructor(
    private prisma: PrismaService
  ) {}

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        cancelledAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  listEnrollmentsByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        cancelledAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}