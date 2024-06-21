import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Course } from "../models/course";
import { CoursesService } from "src/services/courses.service";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { CreateCourseInput } from "../inputs/create-course-input";
import { CurrentUser, AuthUser } from "src/http/auth/current-user";
import { EnrollmentsService } from "src/services/enrollment.service";
import { StudentsService } from "src/services/students.service";

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses()
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(
    @Args('id') id: string,
    @CurrentUser() user: AuthUser
  ) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub)

    if (!student) {
      throw new Error('Student not found')
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id
    })

    if (!enrollment) {
      throw new UnauthorizedException('Enrollment not found')
    }

    return this.coursesService.getCourseById(id)
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data)
  }
}