import connectDB from "./db/connect.js";
import Job from "./models/Job.js";
import {readFile} from "fs/promises";

import dotenv from "dotenv";
dotenv.config()

const start = async () => {
    try {
        console.log('Connecting to DB')
        await connectDB(process.env.MONGO_URL)
        console.log('Connected to DB')
        console.log('Deleting Entries')
        await Job.deleteMany()
        const jsonProducts = JSON.parse(
            await readFile(new URL('./MOCK_DATA.json', import.meta.url))
        )
        console.log('Adding Data to DB')
        await Job.create(jsonProducts)
        console.log('Success!')
        process.exit(0)
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

start()