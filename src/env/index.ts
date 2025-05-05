import 'dotenv/config'
import {z} from 'zod'

const envScema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.string()
})

const _env = envScema.safeParse(process.env)

if(_env.success === false){
    console.error('Invalid enviroment variables.', _env.error.format())

    throw new Error('Invalid enviroment variables.')
}

export const env = _env.data
