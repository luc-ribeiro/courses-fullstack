import slugify from 'slugify'
import { BadRequestException, Injectable } from "@nestjs/common";

import { PrismaService } from "src/database/prisma/prisma.service";

interface createProductParams {
  title: string
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  listAllProducts() {
    return this.prisma.product.findMany()
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id
      }
    })
  }

  async createProduct({ title }: createProductParams) {
    const slug = slugify(title, { lower: true })

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug
      }
    })

    if (productWithSameSlug) {
      throw new BadRequestException('Another product with same slug already exists')
    }

    return this.prisma.product.create({
      data: {
        title,
        slug
      }
    })
  }
}