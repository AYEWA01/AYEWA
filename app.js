* {
  box-sizing: border-box;
}

:root {
  --bg: #050b10;
  --bg-panel: rgba(9, 18, 21, 0.9);
  --bg-panel-strong: rgba(13, 23, 29, 0.96);
  --layer: rgba(16, 32, 33, 0.8);
  --layer-soft: rgba(26, 45, 46, 0.7);
  --line: rgba(160, 204, 199, 0.18);
  --line-strong: rgba(160, 204, 199, 0.28);
  --text: #edf9f6;
  --muted: #b7d9d3;
  --primary: #70efb8;
  --primary-deep: #1cb98e;
  --amber: #f7d58d;
  --amber-strong: #f7b761;
  --violet: #8bb2ff;
  --shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  --radius: 28px;
  --max-width: 1200px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at top, rgba(70, 123, 116, 0.18), transparent 26%),
    radial-gradient(circle at right, rgba(127, 157, 255, 0.12), transparent 22%),
    linear-gradient(180deg, #040a0d 0%, #071315 100%);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.page-shell {
  width: min(100%, var(--max-width));
  margin: 0 auto;
  padding: 24px 20px 40px;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 0 20px;
}

.logo-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-weight: 900;
  background: linear-gradient(135deg, var(--primary), var(--amber));
  color: #061d1e;
  box-shadow: 0 12px 28px rgba(112, 239, 184, 0.35);
}

.logo-tag {
  display: block;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.logo-wrap h1 {
  margin: 0;
  font-size: clamp(1.1rem, 3vw, 1.5rem);
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--muted);
  font-size: 0.93rem;
}

.main-nav a {
  transition: color 0.2s ease;
}

.main-nav a:hover {
  color: var(--text);
}

.header-cta,
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  padding: 0.9rem 1.4rem;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.header-cta,
.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--amber));
  color: #071910;
  box-shadow: 0 18px 42px rgba(112, 239, 184, 0.22);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  color: var(--text);
}

.header-cta:hover,
.btn:hover {
  transform: translateY(-2px);
}

.section {
  padding: 46px 0;
}

.hero {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  align-items: center;
  gap: 36px;
  min-height: 640px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 22px;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--primary);
}

.hero-copy h2 {
  margin: 0;
  font-size: clamp(2.6rem, 6vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.hero-copy p {
  margin: 20px 0 0;
  max-width: 620px;
  font-size: 1.08rem;
  line-height: 1.7;
  color: var(--muted);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.hero-trust {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 28px 0 0;
  padding: 0;
  color: var(--muted);
}

.hero-trust li {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.02);
  font-size: 0.8rem;
}

.hero-visual {
  position: relative;
  height: 540px;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(20, 35, 37, 0.9), rgba(7, 13, 16, 0.97));
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.visual-orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(112, 239, 184, 0.2);
}

.orbit-one {
  inset: 44px;
}

.orbit-two {
  inset: 90px;
}

.visual-core {
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at center, rgba(112, 239, 184, 0.22), rgba(7, 13, 16, 0.96));
  border: 1px solid rgba(112, 239, 184, 0.25);
  box-shadow: inset 0 0 40px rgba(112, 239, 184, 0.16), 0 0 60px rgba(112, 239, 184, 0.08);
  text-align: center;
}

.core-label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}

.visual-core strong {
  display: block;
  font-size: 1.8rem;
  margin-top: 8px;
}

.floating-card {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 170px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(12, 22, 26, 0.8);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}

.floating-card span {
  color: var(--muted);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.floating-card strong {
  font-size: 1rem;
}

.card-top {
  top: 54px;
  left: 36px;
}

.card-mid {
  right: 34px;
  top: 110px;
}

.card-bottom {
  left: 50%;
  bottom: 46px;
  transform: translateX(-50%);
}

.stats-band {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 24px;
}

.stat-item {
  padding: 22px 18px;
  border-radius: 22px;
  background: rgba(12, 22, 26, 0.75);
  border: 1px solid var(--line);
  text-align: center;
}

.stat-item strong {
  display: block;
  font-size: clamp(1.2rem, 2.2vw, 1.8rem);
  color: var(--primary);
  margin-bottom: 10px;
}

.stat-item span {
  color: var(--muted);
  font-size: 0.82rem;
}

.section-heading {
  margin-bottom: 28px;
}

.section-heading h3 {
  max-width: 700px;
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.section-heading.compact h3 {
  max-width: 760px;
}

.feature-grid,
.experience-grid,
.city-grid {
  display: grid;
  gap: 20px;
}

.feature-grid {
  grid-template-columns: 1.1fr 1fr 1fr;
}

.feature-card,
.showcase-card,
.city-card,
.roadmap-item,
.cta-panel {
  background: rgba(12, 22, 26, 0.76);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.feature-card {
  padding: 26px 22px;
}

.feature-card.large {
  background:
    linear-gradient(180deg, rgba(28, 51, 52, 0.8), rgba(10, 17, 20, 0.96));
}

.card-tag {
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(112, 239, 184, 0.09);
  border: 1px solid rgba(112, 239, 184, 0.2);
  color: var(--primary);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.feature-card h4,
.showcase-card h4,
.city-card h4,
.roadmap-item h4 {
  margin: 18px 0 10px;
  font-size: clamp(1.4rem, 2vw, 1.9rem);
  line-height: 1.2;
}

.feature-card p,
.showcase-card p,
.city-card p,
.roadmap-item p,
.preview-copy p,
.site-footer p,
.form-status {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.experience-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.showcase-card {
  padding: 22px 20px;
}

.mini-graphic {
  height: 180px;
  border-radius: 22px;
  margin-bottom: 18px;
  background-size: cover;
  background-position: center;
  border: 1px solid var(--line);
}

.mini-graphic-one {
  background:
    linear-gradient(180deg, rgba(7, 11, 14, 0.2), rgba(7, 11, 14, 0.7)),
    linear-gradient(135deg, rgba(112, 239, 184, 0.28), rgba(247, 181, 97, 0.15));
}

.mini-graphic-two {
  background:
    linear-gradient(180deg, rgba(9, 18, 24, 0.18), rgba(9, 18, 24, 0.7)),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.05) 0,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 22px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.05) 0,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 22px
    );
}

.mini-graphic-three {
  background:
    radial-gradient(circle at center, rgba(112, 239, 184, 0.22), transparent 22%),
    linear-gradient(180deg, rgba(10, 18, 19, 0.2), rgba(10, 18, 19, 0.8));
}

.preview-layout {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 26px;
  align-items: center;
}

.preview-panel {
  border-radius: 30px;
  background: rgba(10, 17, 21, 0.84);
  border: 1px solid var(--line);
  padding: 18px;
  box-shadow: var(--shadow);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  margin-bottom: 16px;
}

.live-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 14px rgba(112, 239, 184, 0.9);
}

.panel-body {
  display: grid;
  gap: 16px;
}

.map-surface {
  position: relative;
  height: 280px;
  overflow: hidden;
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(18, 35, 38, 0.12), rgba(10, 17, 19, 0.9)),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.05) 0,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 26px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.05) 0,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 26px
    );
  border: 1px solid var(--line-strong);
}

.marker {
  position: absolute;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--amber));
  color: #091916;
  font-weight: 800;
  box-shadow: 0 0 20px rgba(112, 239, 184, 0.25);
}

.marker-a { top: 38%; left: 24%; }
.marker-b { top: 24%; left: 58%; }
.marker-c { top: 60%; left: 52%; }

.route-line {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, transparent 32%, rgba(247, 181, 97, 0.8) 32%, rgba(247, 181, 97, 0.8) 34%, transparent 34%, transparent 100%);
  transform: rotate(-10deg);
}

.status-pill {
  display: inline-flex;
  width: fit-content;
  padding: 9px 12px;
  border-radius: 999px;
  border: 1px solid rgba(247, 181, 97, 0.25);
  background: rgba(247, 181, 97, 0.08);
  color: var(--amber);
  font-size: 0.8rem;
}

.check-list {
  display: grid;
  gap: 16px;
}

.check-list div {
  display: grid;
  grid-template-columns: 54px 1fr;
  gap: 16px;
  align-items: start;
  padding: 16px 18px;
  border-radius: 20px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.02);
}

.check-list strong {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(112, 239, 184, 0.08);
  border: 1px solid rgba(112, 239, 184, 0.25);
  color: var(--primary);
  font-size: 0.9rem;
}

.city-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.city-card {
  padding: 26px 20px;
}

.flag {
  font-size: 1.8rem;
}

.roadmap-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.roadmap-item {
  padding: 22px 18px;
}

.phase {
  display: inline-block;
  margin-bottom: 12px;
  color: var(--amber);
  letter-spacing: 0.12em;
  font-size: 0.68rem;
  text-transform: uppercase;
}

.cta-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  padding: 28px 26px;
  background: linear-gradient(135deg, rgba(16, 30, 30, 0.95), rgba(8, 17, 19, 0.97));
}

.waitlist-form {
  display: flex;
  align-items: center;
  gap: 12px;
  width: min(100%, 520px);
}

.waitlist-form input {
  flex: 1;
  min-width: 0;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  padding: 0.95rem 1rem;
}

.waitlist-form input::placeholder {
  color: var(--muted);
}

.form-status {
  margin-top: 12px;
  font-size: 0.9rem;
}

.site-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 28px 0 0;
  color: var(--muted);
  border-top: 1px solid var(--line);
  margin-top: 20px;
}

.site-footer p {
  margin-top: 10px;
}

@media (max-width: 980px) {
  .site-header {
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-nav {
    order: 3;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero,
  .preview-layout,
  .feature-grid,
  .experience-grid,
  .roadmap-list,
  .city-grid,
  .cta-panel {
    grid-template-columns: 1fr;
    display: grid;
  }

  .cta-panel {
    justify-content: start;
  }

  .waitlist-form {
    width: 100%;
  }
}

@media (max-width: 680px) {
  .page-shell {
    padding-left: 14px;
    padding-right: 14px;
  }

  .site-header {
    justify-content: space-between;
  }

  .main-nav {
    display: none;
  }

  .header-cta {
    display: none;
  }

  .hero {
    min-height: auto;
    gap: 18px;
    padding-top: 10px;
  }

  .hero-copy h2 {
    font-size: 2.5rem;
  }

  .hero-visual {
    height: 420px;
  }

  .stats-band {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .waitlist-form {
    flex-direction: column;
  }

  .site-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
