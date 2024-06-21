import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Student } from "./student"
import { Course } from "./course"

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string

  @Field(() => Student)
  student: Student
  studentId: string

  @Field(() => Course)
  courseCourse: Course
  courseCourseId: string

  @Field(() => Date, { nullable: true })
  cancelledAt: Date

  @Field(() => Date)
  createdAt: Date
}