export type Kind = 'decision' | 'mistake' | 'residue';

const LABEL: Record<Kind, string> = { decision: '결정', mistake: '틀림', residue: '남김' };

/** 장의 종류 표시. 결정(남색) · 틀림(잉크) · 남김(페리윙클). h2 위에 하나. 본문은 서사 그대로 둔다. */
export function KindTag({ kind }: { kind: Kind }) {
  return <span className={`ty-kind ty-kind--${kind}`}>{LABEL[kind]}</span>;
}
