import path from 'node:path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { DatabaseModule } from '../database/database.module'
import { ProductsResolver } from './graphql/resolvers/products.resolver'
import { ProductsService } from 'src/services/products.service'
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver'
import { PurchasesService } from 'src/services/purchases.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    })
  ],
  providers: [
    // Resolvers
    ProductsResolver,
    PurchasesResolver,
    
    // Services
    ProductsService,
    PurchasesService
  ],
})
export class HttpModule { }
