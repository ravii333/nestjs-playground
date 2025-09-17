import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JobsModule } from './jobs/jobs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',        
      password: 'Ravi@1432', 
      database: 'nestjs_learning', 
      entities: [],  
      autoLoadEntities: true,    
      synchronize: true,         
    }),
    UserModule, JobsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


