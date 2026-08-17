/** 끊김 없이 흐르는 띠. 항목을 두 번 렌더해 이어붙인다. */
export default function Marquee({
  items,
  speed = 40,
  reverse = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
}) {
  const row = (
    <div
      className="flex shrink-0 items-center gap-10 pr-10"
      style={{
        animation: `marquee ${speed}s linear infinite${reverse ? ' reverse' : ''}`,
      }}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="text-2xl font-medium tracking-tight md:text-4xl">{item}</span>
          <span className="text-[var(--color-accent)] text-xl">✳</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative flex overflow-hidden py-6" aria-hidden>
      <style>{`@keyframes marquee { to { transform: translateX(-100%); } }`}</style>
      {row}
      {row}
    </div>
  );
}
