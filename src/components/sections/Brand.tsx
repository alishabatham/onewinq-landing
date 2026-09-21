import onewinqLogo from '@assets/onewinq_black_logo_1790007174259.png';

export function Brand() {
  return (
    <a className="brand" href="#top" aria-label="OneWinq home" data-testid="link-brand">
      <img className="brand-logo" src={onewinqLogo} alt="OneWinq logo" />
    </a>
  );
}
