import './Footer.less';

export function Footer() {
  return (
    <>
      <div class="footer">
        <p class="p-small">
          Copyright © {new Date().getFullYear()} <a href="https://coderak.net">Coder_AK</a>
          <br />
          <a href="https://www.vecteezy.com/free-vector/light-bulb">Light Bulb Vectors by Vecteezy</a>
        </p>
      </div>
      <div id="error" class="error"></div>
    </>
  );
}
