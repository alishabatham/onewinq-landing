export function Journey() {
  const steps = [
    ['01', 'Create', 'Build the parts of your identity that feel true.'],
    ['02', 'Choose', 'Select the profile for the person in front of you.'],
    ['03', 'Share', 'Tap, scan, or send your OneWinq link.'],
    ['04', 'Connect', 'Keep the meaningful part of the exchange.'],
  ];

  return (
    <section className="section journey reveal" id="how-it-works">
      <div className="container">
        <div className="journey-intro">
          <div>
            <div className="eyebrow">No new social network to maintain</div>
            <h2>Four small moves.<br /><span className="serif">A better hello.</span></h2>
          </div>
          <p>OneWinq stays out of the way. It gives the moment a little more context, then helps the connection continue when the moment is over.</p>
        </div>
        <div className="steps">
          {steps.map(([number, title, description]) => (
            <article className="step" key={number}>
              <div className="step-number">{number} / 04</div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
