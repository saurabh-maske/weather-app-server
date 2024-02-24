import {DataSource,DataSourceOptions} from "typeorm"
import {config} from 'dotenv'
config();

export const datasourceOptions: DataSourceOptions = {

    type :'postgres',
    host : process.env.POSTGRES_HOST,
    port : Number(process.env.POSTGRES_PORT),
    username : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD,
    database : process.env.DATABASE_NAME,
    entities : ['dist/**/*.entity{.ts, .js}'],
    synchronize: true,
    ssl: false
}

export const dbConnection = new DataSource(datasourceOptions);
dbConnection.initialize().then(()=>console.log('Data Source Initialize')).catch((e)=>console.log(e))