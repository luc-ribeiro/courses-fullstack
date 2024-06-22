import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Student } from "../models/student";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { UseGuards } from "@nestjs/common";
import { StudentsService } from "src/services/students.service";
import { EnrollmentsService } from "src/services/enrollment.service";

@Resolver(() => Student)
export class StudentsResolver {

  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents()
  }

  @ResolveField()
  enrollments(
    @Parent() student: Student
  ) {
    return this.enrollmentsService.listEnrollmentsByStudentId(student.id)
  }
}