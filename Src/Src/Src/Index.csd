@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');

:root {
  --ink: #08090b;
  --panel: #131519;
  --line: #24262b;
  --paper: #f4f5f7;
  --muted: #9497a3;
  --pulse: #ff4d5e;
  --pulse-soft: rgba(255, 77, 94, 0.16);
  font-family: 'Inter', system-ui, sans-serif;
}

* { box-sizing: border-box; }

html, body, #root {
  margin: 0;
  height: 100%;
  background: var(--ink);
  color: var(--paper);
}

body {
  overscroll-behavior-y: contain;
}

.app-shell {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* ---------- Auth ---------- */
.auth-screen {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 24px;
  max-width: 420px;
  margin: 0 auto;
}

.auth-mark {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 15px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}

.auth-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.05;
  margin: 0 0 28px;
}

.auth-title span { color: var(--pulse); }

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.field label {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.field input {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 14px 16px;
  color: var(--paper);
  font-size: 16px;
}

.field input:focus {
  outline: 2px solid var(--pulse);
  outline-offset: 1px;
}

.btn-primary {
  background: var(--pulse);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
}

.btn-primary:disabled { opacity: 0.5; }

.switch-mode {
  background: none;
  border: none;
  color: var(--muted);
  margin-top: 18px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
}

.switch-mode b { color: var(--paper); }

.auth-error {
  background: var(--pulse-soft);
  color: #ffb3ba;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 16px;
}

/* ---------- Feed ---------- */
.feed {
  flex: 1;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.slide {
  position: relative;
  height: 100dvh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: flex-end;
  background: #000;
  overflow: hidden;
}

.slide video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%);
  pointer-events: none;
}

.slide-info {
  position: relative;
  z-index: 2;
  padding: 0 84px 28px 18px;
  width: 100%;
}

.slide-user {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 6px;
}

.slide-caption {
  font-size: 14px;
  color: #e7e8ec;
  line-height: 1.4;
}

.rail {
  position: absolute;
  right: 14px;
  bottom: 32px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.rail-btn {
  background: none;
  border: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
}

.rail-icon {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  transition: transform 0.15s ease, background 0.15s ease;
}

.rail-btn.liked .rail-icon {
  background: var(--pulse-soft);
  color: var(--pulse);
}

.rail-btn:active .rail-icon { transform: scale(0.88); }

.empty-feed {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  text-align: center;
  color: var(--muted);
}

.empty-feed .auth-title { font-size: 28px; }

/* ---------- Comments sheet ---------- */
.sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 10;
  display: flex;
  align-items: flex-end;
}

.sheet {
  background: var(--panel);
  width: 100%;
  max-height: 65vh;
  border-radius: 18px 18px 0 0;
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0;
}

.sheet-handle {
  width: 36px;
  height: 4px;
  background: var(--line);
  border-radius: 4px;
  margin: 0 auto 14px;
}

.sheet-title {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 12px;
}

.sheet-list {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 12px;
}

.comment-row {
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
}

.comment-user {
  font-size: 13px;
  font-weight: 600;
  color: var(--pulse);
}

.comment-text { font-size: 14px; margin-top: 2px; }

.sheet-form {
  display: flex;
  gap: 8px;
  padding: 12px 0 16px;
  border-top: 1px solid var(--line);
}

.sheet-form input {
  flex: 1;
  background: var(--ink);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 11px 16px;
  color: var(--paper);
  font-size: 14px;
}

.sheet-form button {
  background: var(--pulse);
  border: none;
  color: #fff;
  border-radius: 20px;
  padding: 0 18px;
  font-weight: 600;
  font-size: 14px;
}

/* ---------- Upload ---------- */
.upload-screen {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 24px;
  max-width: 480px;
  margin: 0 auto;
}

.dropzone {
  border: 1.5px dashed var(--line);
  border-radius: 14px;
  padding: 34px 18px;
  text-align: center;
  color: var(--muted);
  margin-bottom: 18px;
}

.dropzone.has-file { border-color: var(--pulse); color: var(--paper); }

.dropzone input { display: none; }

.upload-preview {
  width: 100%;
  max-height: 320px;
  border-radius: 12px;
  margin-bottom: 18px;
  background: #000;
}

.upload-progress {
  height: 4px;
  background: var(--line);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 14px;
}

.upload-progress > div {
  height: 100%;
  background: var(--pulse);
  transition: width 0.2s ease;
}

/* ---------- Nav ---------- */
.tabbar {
  display: flex;
  border-top: 1px solid var(--line);
  background: var(--ink);
}

.tabbar a {
  flex: 1;
  text-align: center;
  padding: 12px 0 10px;
  color: var(--muted);
  text-decoration: none;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.tabbar a.active { color: var(--paper); }
.tabbar a.active .tab-icon { color: var(--pulse); }

.tab-icon { font-size: 21px; }

.topbar {
  position: absolute;
  top: 14px;
  left: 18px;
  z-index: 3;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 0.02em;
}

.topbar span { color: var(--pulse); }

.signout-link {
  position: absolute;
  top: 16px;
  right: 18px;
  z-index: 3;
  color: rgba(255,255,255,0.8);
  font-size: 12px;
  background: rgba(255,255,255,0.12);
  padding: 6px 12px;
  border-radius: 14px;
  border: none;
}
