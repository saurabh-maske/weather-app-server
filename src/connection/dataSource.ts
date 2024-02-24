import {DataSource,DataSourceOptions} from "typeorm"
import {config} from 'dotenv'
import { Location } from "src/modules/locations/entity/location.entity";
config();

export const datasourceOptions: DataSourceOptions = {

    type :'postgres',
    host : process.env.POSTGRES_HOST,
    port : Number(process.env.POSTGRES_PORT),
    username : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD,
    database : process.env.DATABASE_NAME,
    entities : [Location],
    synchronize: true,
    ssl: false
}

export const dbConnection = new DataSource(datasourceOptions);
dbConnection.initialize().then(()=>console.log('Data Source Initialize')).catch((e)=>console.log(e))