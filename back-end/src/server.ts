import app from './app';
import {connect} from 'mongoose';
import { MONGODB_URI, PORT } from './config/config';

const connectToDatabase =async()=> { 
  connect(MONGODB_URI as string,{
    dbName:'exove',
  })
}

connectToDatabase()
  .then(()=> { 
    console.log('mongodb connected')
    app.listen(PORT, () => {
      console.log(`listengin at Port ${PORT}...`);
    });
  })
  .catch(()=> {
    console.log('fail connect to mongodb');

  })

