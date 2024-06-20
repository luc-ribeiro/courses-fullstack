import { Query, Resolver } from "@nestjs/graphql";
import { Product } from "../models/product";
import { ProductsService } from "src/services/products.service";

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAllProducts()
  }
}