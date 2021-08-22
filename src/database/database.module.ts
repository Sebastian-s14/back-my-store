import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { MongoClient } from 'mongodb';

import config from '../config';

// const API_KEY = '12345634';
// const API_KEY_PROD = 'PROD1212121SA';

// const taskCollection = database.collection('tasks');
// const tasks = await taskCollection.find().toArray();

@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   user: 'root',
    //   pass: 'root',
    //   dbName: 'platzi-store',
    // }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, dbName } = configService.mongo;
        return {
          //   uri: `${connection}://${host}:${port}`,
          uri: connection,
          user,
          pass: password,
          dbName,
          useUnifiedTopology: true,
          useCreateIndex: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
