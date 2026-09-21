import brandLogo from '@assets/onewinq_brand_logo.png';

export function Brand() {
  return (
    <a className="brand" href="#top" aria-label="OneWinq home" data-testid="link-brand" style={{ display: 'inline-flex', alignItems: 'center' }}>
      <img className="brand-logo" src={brandLogo} alt="OneWinq" style={{ height: '46px', width: 'auto', objectFit: 'contain' }} />
    </a>
  );
}
