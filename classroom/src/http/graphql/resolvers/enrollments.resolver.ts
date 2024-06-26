import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Enrollment } from "../models/enrollment";
import { UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { EnrollmentsService } from "src/services/enrollment.service";
import { StudentsService } from "src/services/students.service";
import { CoursesService } from "src/services/courses.service";

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.listAllEnrollments()
  }

  @ResolveField()
  student(
    @Parent() enrollment: Enrollment
  ) {
    return this.studentsService.getStudentById(enrollment.studentId)
  }

  @ResolveField()
  course(
    @Parent() enrollment: Enrollment
  ) {
    return this.coursesService.getCourseById(enrollment.courseId)
  }

}