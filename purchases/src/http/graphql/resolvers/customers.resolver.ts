import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { CustomersService } from "src/services/customers.service";

import { Customer } from "../models/customer";
import { CurrentUser, AuthUser } from "src/http/auth/current-user";
import { PurchasesService } from "src/services/purchases.service";

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService
  ) { }

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(
    @CurrentUser() user: AuthUser
  ) {
    return this.customersService.getCustomerByAuthUserId(user.sub)
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id)
  }
}