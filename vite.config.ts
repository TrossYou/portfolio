import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages 프로젝트 사이트는 /portfolio/ 하위에 배포된다.
// 커스텀 도메인이나 Vercel로 옮기면 BASE_PATH=/ 로 빌드한다.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/portfolio/',
  plugins: [react(), tailwindcss()],
});
