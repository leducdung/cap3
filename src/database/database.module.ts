import { MongooseModule } from '@nestjs/mongoose';

export const databaseModule = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri:
      'mongodb+srv://leducdung:1@uploads.epnvd.mongodb.net/homemarket?retryWrites=true&w=majority',
    useNewUrlParser: true,
    useCreateIndex: true,
  }),
});
