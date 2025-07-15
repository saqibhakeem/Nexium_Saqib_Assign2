// types/declarations.d.ts
declare module "unfluff" {
  interface UnfluffResult {
    title: string;
    text: string;
    author?: string;
    date?: string;
    image?: string;
    [key: string]: unknown;
  }

  function unfluff(html: string): UnfluffResult;

  export default unfluff;
}
