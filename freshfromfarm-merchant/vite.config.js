import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react(),
    ],
    server: {
        port: 3001,     // ← your desired port
        strictPort: true // fails if port is busy (recommended)
    }
})