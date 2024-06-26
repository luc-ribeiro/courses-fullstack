import path from 'node:path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloFederationDriver, type ApolloFederationDriverConfig } from '@nestjs/apollo'

import { DatabaseModule } from '../database/database.module'
import { CoursesResolver } from './graphql/resolvers/courses.resolver'
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver'
import { StudentsResolver } from './graphql/resolvers/students.resolver'
import { CoursesService } from 'src/services/courses.service'
import { EnrollmentsService } from 'src/services/enrollment.service'
import { StudentsService } from 'src/services/students.service'

@Module({
  imports: [
    ConfigModule.forRoot(), 
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    })
  ],
  providers: [
    // Resolvers
    CoursesResolver,
    EnrollmentsResolver,
    StudentsResolver,

    // Services
    CoursesService,
    EnrollmentsService,
    StudentsService
  ],
})
export class HttpModule {}
