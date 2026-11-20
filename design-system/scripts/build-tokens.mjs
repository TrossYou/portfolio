// tokens.json 에서 tokens.css 를 만든다. 실행: node design-system/scripts/build-tokens.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const t = JSON.parse(fs.readFileSync(root + 'tokens.json', 'utf8'));

const themed = [...t.color.tokens, ...t.shadow.tokens];
const vars = (theme, indent) =>
  themed.map((x) => `${indent}--${x.name}: ${x.value[theme]};`).join('\n') + `\n${indent}color-scheme: ${theme};`;

const fixed = [
  ...t.spacing.tokens.map((x) => `  --${x.name}: ${x.value};`),
  ...t.radius.tokens.map((x) => `  --${x.name}: ${x.value};`),
  ...t.border.tokens.map((x) => `  --${x.name}: ${x.value};`),
  ...Object.entries(t.type.families).map(([k, v]) => `  --font-${k}: ${v};`),
].join('\n');

const styles = t.type.groups
  .flatMap((g) =>
    g.styles.map((s) => {
      const ls = s.letterSpacing ? ` letter-spacing: ${s.letterSpacing};` : '';
      return `.${s.name} { font-family: var(--font-${g.family}); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight};${ls} }`;
    }),
  )
  .join('\n');

const css = `/* ${t.name} 토큰 v${t.version}. tokens.json에서 생성(scripts/build-tokens.mjs). 손으로 고치지 않는다. */
:root, [data-theme="light"] {
${vars('light', '  ')}
}
[data-theme="dark"] {
${vars('dark', '  ')}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${vars('dark', '    ')}
  }
}
:root {
${fixed}
}
${styles}
`;
fs.writeFileSync(root + 'tokens.css', css);
console.log('tokens.css', css.split('\n').length, 'lines');
