import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'olivia_users',
      entities: ["src/database/**.entity{.ts,.js}"],
      synchronize: true, // Esto crea la base de datos y las tablas si no existen
      autoLoadEntities: true,
    }),
    UsersModule, // Agrega UsersModule aquí
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
