import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { enviroments } from 'src/enviroments';
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
        // console.log('======================');
        // console.log('NODE_ENV', process.env.NODE_ENV);
        // console.log('connection', connection);
        // console.log('user', user);
        // console.log('password', password);
        // console.log('dbName', dbName);
        return {
          //   uri: `${connection}://${host}:${port}`,
          uri: connection,
          user,
          pass: password,
          dbName,
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
          // useCreateIndex: true,
          // useFindAndModify: false,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
