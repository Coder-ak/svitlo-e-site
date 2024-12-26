import { useLocation } from 'preact-iso';
import './Header.less';
import { State } from '../../state/svtilo-app-state';

export function Header() {
  const { url } = useLocation();

  const { data } = State.value;

  const light = data.light == null ? 'on' : data.light ? 'on' : 'off';

  return (
    // <header>
    // 	<nav>
    // 		<a href="/" class={url == '/' && 'active'}>
    // 			Home
    // 		</a>
    // 		<a href="/404" class={url == '/404' && 'active'}>
    // 			404
    // 		</a>
    // 	</nav>
    // </header>

    <nav className="navbar">
      <a className="navbar-brand" href="/">
        <img className="logo-lamp" src={`assets/lamp_${light}.svg`} />
        <img className="logo-image" src="assets/svitlo-logo.svg" alt="Світло є, чи нема?" />
        <div className="logo-lamp"></div>
      </a>
    </nav>
  );
}
