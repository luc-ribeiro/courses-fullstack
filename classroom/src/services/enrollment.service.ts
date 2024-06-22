import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

interface CreateEnrollmentParams {
  courseId: string
  studentId: string
}

interface getByCourseAndStudentIdParams {
  courseId: string
  studentId: string
}

@Injectable()
export class EnrollmentsService {
  constructor(
    private prisma: PrismaService
  ) {}

  getByCourseAndStudentId({ courseId, studentId }: getByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        cancelledAt: null
      }
    })
  }

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

  createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      }
    })
  }
}