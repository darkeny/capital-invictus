import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from 'dotenv'

env.config();
const PORT = Number(process.env.PORT)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], server: {port: PORT}
})
