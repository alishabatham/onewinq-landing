export function Ticker() {
  const items = [
    'OneWinq launches 01 October 2026',
    'Your story, in context',
    'Share with intention',
    'Keep the connection',
  ];

  return (
    <div className="ticker" aria-label="OneWinq highlights">
      <div className="ticker-track">
        {[...items, ...items].map((item, index) => (
          <div className="ticker-item" key={`${item}-${index}`}>
            <span />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
