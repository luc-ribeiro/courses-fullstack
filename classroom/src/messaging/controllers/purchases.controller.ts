import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

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
  
  @EventPattern('purchases.new-purchase')
  async purchaseCreate(
    @Payload() payload: PurchaseCreatedPayload
  ) {
    console.log(payload)
  }
}