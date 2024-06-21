import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GraphQLError } from "graphql";

import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { CurrentUser, type AuthUser } from "src/http/auth/current-user";

import { PurchasesService } from "src/services/purchases.service";
import { CustomersService } from "src/services/customers.service";
import { ProductsService } from "src/services/products.service";

import { Purchase } from "../models/purchase";
import { Product } from "../models/product";
import { CreatePurchaseInput } from "../inputs/create-purchase-input";

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService, 
    private productsService: ProductsService,
    private customersService: CustomersService
  ) { }

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases()
  }

  @ResolveField(() => Product)
  product(
    @Parent() purchase: Purchase
  ) {
    return this.productsService.getProductById(purchase.productId)
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(user.sub)

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub
      })
    }

    return this.purchasesService.createPurchase({
      productId: data.productId,
      customerId: customer.id
    })
  }
}
