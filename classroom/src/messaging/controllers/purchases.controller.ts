import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CoursesService } from "src/services/courses.service";
import { EnrollmentsService } from "src/services/enrollment.service";
import { StudentsService } from "src/services/students.service";

export interface Customer {
  authUserId: string
}

export interface Product {
  id: string
  title: string
  slug: string
}

interface PurchaseCreatedPayload {
  customer: Customer
  product: Product
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService
  ) {
  }

  @EventPattern('purchases.new-purchase')
  async purchaseCreate(

    @Payload() payload: PurchaseCreatedPayload
  ) {
    let student = await this.studentsService.getStudentByAuthUserId(
      payload.customer.authUserId
    )

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId
      })
    }

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug
    )

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title
      })
    }

    await this.enrollmentsService.createEnrollment({
      courseId: course.id,
      studentId: student.id
    })
  }
}