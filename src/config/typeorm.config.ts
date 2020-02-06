import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "sqlite",
  database: __dirname + '/../../db.sqlite',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true
}