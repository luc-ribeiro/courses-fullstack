import { Injectable } from "@nestjs/common";
import slugify from "slugify";
import { PrismaService } from "src/database/prisma/prisma.service";

interface CreateCourseParams {
  slug?: string
  title: string
}

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService
  ) { }

  listAllCourses() {
    return this.prisma.course.findMany()
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id
      }
    })
  }

  getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug
      }
    })
  }

  async createCourse({ title, slug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g }) }: CreateCourseParams) {
    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug
      }
    })

    if (courseAlreadyExists) {
      throw new Error('Course already exists')
    }

    return this.prisma.course.create({
      data: {
        title,
        slug
      }
    })
  }
}