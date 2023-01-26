import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { ArticleFeature } from 'entities/article-feuters.entity';
import { ArticlePrice } from 'entities/article-price';
import { Article } from 'entities/article.entity';
import { CartArticle } from 'entities/cart-article.entity';
import { Cart } from 'entities/cart.entity';
import { Category } from 'entities/category.entity';
import { Feature } from 'entities/features.entity';
import { Order } from 'entities/order.entity';
import { Photo } from 'entities/photo.entity';
import { User } from 'entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { AppController } from './controllers/app.controller';
import { AdministratorService } from './services/administrator/administrator.service';


DatabaseConfiguration
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [Administrator,
                 ArticleFeature,
                 ArticlePrice,
                 Article,
                 CartArticle,
                 Cart,
                 Category,
                 Feature,
                 Order,
                 Photo,
                 User,
      
      
      ]

    }),
    TypeOrmModule.forFeature([ Administrator])
  ],
  controllers: [AppController,
                AdministratorController,
  
  
  ],
  providers: [AdministratorService],
})
export class AppModule {}
