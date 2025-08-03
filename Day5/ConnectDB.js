import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to Database')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)  // Exit process with failure
  }
}


export default ConnectDB


    

