/** GitHub 제목 앵커 규칙: 소문자, 글자·숫자·공백·하이픈만 남기고 공백은 하이픈 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}
