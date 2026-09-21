import onewinqLogo from '@assets/onewinq_app_icon.png';

export function Brand() {
  return (
    <a className="brand" href="#top" aria-label="OneWinq home" data-testid="link-brand">
      <img className="brand-logo" src={onewinqLogo} alt="OneWinq logo" style={{ height: '38px', width: '38px', borderRadius: '50%', objectFit: 'cover' }} />
    </a>
  );
}
