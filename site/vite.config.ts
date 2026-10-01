import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 프로젝트 사이트는 /portfolio/ 하위에 배포된다.
// 커스텀 도메인이나 Vercel로 옮기면 BASE_PATH=/ 로 빌드한다.
// 이미지는 저장소 루트 assets/ 가 단일 저장소다. 케이스 스터디 md 와 같은 파일을 쓴다.
const at = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  base: process.env.BASE_PATH ?? '/portfolio/',
  publicDir: '../assets',
  plugins: [react()],
  resolve: {
    alias: {
      '@ds': at('../design-system/src'),
      '@data': at('../data'),
    },
    // design-system/ 과 data/ 는 site/ 밖에 있어 react 를 여기 node_modules 에서 찾게 한다
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    fs: { allow: ['..'] },
  },
});
