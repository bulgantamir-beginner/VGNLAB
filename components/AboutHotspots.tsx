const hotspots = [
  { className: "hotspot-keyboard", label: "VGN-V87-Mechanical-keyboard" },
  { className: "hotspot-mouse", label: "VGN Dragonfly F1 Wireless Mouse" },
  { className: "hotspot-headset", label: "VGN Siren V1 Gaming Headset" },
  { className: "hotspot-monitor", label: "VGN Gaming Monitor Light Bar" },
];

export default function AboutHotspots() {
  return (
    <section className="about-vgn-section">
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">
            About VGN
          </h1>
          <div className="title-underline"></div>
          <p className="about-subtitle">
            Various Lifestyle, Professional Gaming, New and Next
          </p>
          <a href="#" className="learn-more-btn">
            LEARN MORE
          </a>
        </div>

        {hotspots.map((h) => (
          <div className={`hotspot ${h.className}`} key={h.className}>
            <span className="hotspot-tooltip">{h.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
