import './Header.less';
import { State } from '../../state/svtilo-app-state';

export function Header() {
  const { data } = State.value;

  const light = data.light == null ? 'on' : data.light ? 'on' : 'off';

  return (
    <nav className="navbar">
      <div></div>
      <a className="navbar-brand" href="/">
        <img className="logo-lamp" src={`assets/lamp_${light}.svg`} />
        <img className="logo-image" src="assets/svitlo-logo.svg" alt="Світло є, чи нема?" />
      </a>
      <a className="navbar-link" href="https://t.me/SvitloeRadujnyBot" target="_blank" title="Svitlo-E телеграм бот">
        <img className="logo-tg" src={`assets/tg-logo.svg`} alt="Telegram logo" />
      </a>
    </nav>
  );
}
