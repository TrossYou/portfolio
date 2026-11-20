import type { Screen as ScreenData } from '@data/projects';

const asset = (f: string) => `${import.meta.env.BASE_URL}${f}`;

type Props = { screen: ScreenData; eager?: boolean; className?: string; showCaption?: boolean };

/** 화면 캡처 한 장. 더미 데이터로 찍은 화면은 위에 표시를 얹는다 */
export default function Screen({ screen, eager = false, className = '', showCaption = true }: Props) {
  return (
    <figure className={`screen ${className}`.trim()}>
      <span className="screen__frame">
        <img src={asset(screen.src)} alt={screen.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        {screen.dummy ? <span className="screen__flag">더미 데이터</span> : null}
      </span>
      {showCaption && screen.caption ? <figcaption className="screen__caption">{screen.caption}</figcaption> : null}
    </figure>
  );
}
