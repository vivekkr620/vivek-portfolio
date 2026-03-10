import { useState, useEffect, useRef } from "react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #02050A;
      --surface: #080E18;
      --surface2: #0E1A28;
      --accent: #00FFB2;
      --accent2: #005EFF;
      --accent3: #FF2D6B;
      --text: #EEF6FF;
      --muted: #4A6580;
      --border: rgba(0,255,178,0.12);
      --font-display: 'Syne', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--bg); color: var(--text);
      font-family: var(--font-display);
      overflow-x: hidden; cursor: none;
    }

    /* ━━━━━━━━━━━━━━ CUSTOM CURSOR ━━━━━━━━━━━━━━ */
    .c-dot {
      position: fixed; pointer-events: none; z-index: 99999;
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent);
      transform: translate(-50%,-50%);
      transition: width .18s, height .18s, background .18s, opacity .18s;
      mix-blend-mode: difference;
    }
    .c-ring {
      position: fixed; pointer-events: none; z-index: 99998;
      width: 38px; height: 38px; border-radius: 50%;
      border: 1.5px solid rgba(0,255,178,0.7);
      transform: translate(-50%,-50%);
      transition: width .4s cubic-bezier(.16,1,.3,1),
                  height .4s cubic-bezier(.16,1,.3,1),
                  border-color .3s, opacity .3s;
    }
    .c-label {
      position: fixed; pointer-events: none; z-index: 99997;
      font-family: var(--font-mono); font-size: 0.58rem;
      color: var(--accent); letter-spacing: 0.12em; text-transform: uppercase;
      transform: translate(16px, 16px);
      opacity: 0; transition: opacity .2s;
      white-space: nowrap;
    }

    body.ch .c-dot { width: 12px; height: 12px; background: var(--accent3); }
    body.ch .c-ring { width: 56px; height: 56px; border-color: rgba(255,45,107,0.6); }
    body.ch .c-label { opacity: 1; }
    body.cc .c-ring { width: 18px; height: 18px; opacity: 1; border-color: var(--accent); }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: linear-gradient(var(--accent), var(--accent2)); }

    /* ━━━━━━━━━━━━━━ BACKGROUND ━━━━━━━━━━━━━━ */
    .noise {
      position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 256px;
    }
    .dot-grid {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: radial-gradient(circle, rgba(0,255,178,0.07) 1px, transparent 1px);
      background-size: 38px 38px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    }
    .orb {
      position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(90px);
    }
    .o1 { width: 700px; height: 700px; background: rgba(0,255,178,0.07); top: -300px; right: -200px; animation: ofloat 10s ease-in-out infinite; }
    .o2 { width: 500px; height: 500px; background: rgba(0,94,255,0.07); bottom: 10%; left: -200px; animation: ofloat 13s ease-in-out infinite reverse; }
    .o3 { width: 380px; height: 380px; background: rgba(255,45,107,0.05); bottom: -120px; right: 15%; animation: ofloat 9s ease-in-out infinite 2s; }
    @keyframes ofloat { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-50px) scale(1.07);} }

    /* ━━━━━━━━━━━━━━ NAV ━━━━━━━━━━━━━━ */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 500;
      display: flex; justify-content: space-between; align-items: center;
      padding: 22px 64px;
    }
    nav::after {
      content: ''; position: absolute; inset: 0; z-index: -1;
      background: linear-gradient(to bottom, rgba(2,5,10,.92), transparent);
      backdrop-filter: blur(18px);
      mask-image: linear-gradient(to bottom, black 70%, transparent);
    }
    .n-logo { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em; color: var(--accent); user-select: none; }
    .n-logo em { color: var(--text); font-style: normal; }
    .n-links { display: flex; gap: 36px; align-items: center; }
    .n-link {
      font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em;
      color: var(--muted); text-transform: uppercase; cursor: none;
      position: relative; padding: 4px 0; transition: color .25s;
    }
    .n-link .nn { color: var(--accent); margin-right: 6px; font-size: 0.62rem; }
    .n-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:var(--accent); transition:width .3s; }
    .n-link:hover { color: var(--text); }
    .n-link:hover::after { width: 100%; }
    .n-cta {
      font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.08em;
      padding: 10px 22px; border: 1px solid var(--accent); border-radius: 2px;
      color: var(--accent); background: transparent; cursor: none;
      transition: all .25s; text-transform: uppercase;
    }
    .n-cta:hover { background: var(--accent); color: var(--bg); }

    /* ━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━ */
    .hero {
      min-height: 100vh; display: flex; align-items: center;
      padding: 0 64px; padding-top: 100px; position: relative; z-index: 2;
    }
    .hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; }

    .eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.14em;
      color: var(--accent); text-transform: uppercase;
      padding: 8px 16px; border: 1px solid var(--border); border-radius: 2px;
      margin-bottom: 40px; position: relative; overflow: hidden;
    }
    .eyebrow::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(90deg, transparent, rgba(0,255,178,.1), transparent);
      animation: shimmer 2.8s infinite;
    }
    @keyframes shimmer { 0%{transform:translateX(-100%);} 100%{transform:translateX(100%);} }
    .pulse { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: p 2s infinite; }
    @keyframes p { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.3;transform:scale(.6);} }

    .h-name {
      font-size: clamp(4rem, 9vw, 8.5rem);
      font-weight: 800; line-height: .92; letter-spacing: -.05em; margin-bottom: 30px;
    }
    .h-line { display: block; overflow: hidden; }
    .h-line .hi {
      display: block;
      animation: rup .9s cubic-bezier(.16,1,.3,1) both;
    }
    .h-line:nth-child(2) .hi { animation-delay: .12s; color: var(--accent); }
    @keyframes rup { from{transform:translateY(115%) skewY(4deg);opacity:0;} to{transform:translateY(0) skewY(0);opacity:1;} }

    .h-desc {
      font-family: var(--font-mono); font-size: .93rem; line-height: 1.85;
      color: var(--muted); max-width: 490px; margin-bottom: 50px;
      animation: fup 1s .45s both;
    }
    @keyframes fup { from{opacity:0;transform:translateY(22px);} to{opacity:1;transform:translateY(0);} }

    .h-actions { display: flex; gap: 14px; flex-wrap: wrap; animation: fup 1s .65s both; }

    .btn-p {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 15px 34px; background: var(--accent); color: var(--bg);
      font-weight: 800; font-size: .9rem; letter-spacing: .03em;
      border: none; border-radius: 2px; cursor: none;
      transition: transform .2s, box-shadow .3s; position: relative; overflow: hidden;
    }
    .btn-p::before {
      content:''; position:absolute; inset:0;
      background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.22) 50%, transparent 70%);
      transform: translateX(-100%); transition: transform .5s;
    }
    .btn-p:hover::before { transform: translateX(100%); }
    .btn-p:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,255,178,.4); }

    .btn-o {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 14px 34px; background: transparent; color: var(--text);
      font-weight: 600; font-size: .9rem;
      border: 1px solid rgba(255,255,255,.12); border-radius: 2px; cursor: none;
      transition: all .25s; text-decoration: none;
    }
    .btn-o:hover { border-color: var(--accent); color: var(--accent); background: rgba(0,255,178,.04); transform: translateY(-2px); }

    .scroll-hint {
      position: absolute; bottom: 44px; left: 64px;
      display: flex; align-items: center; gap: 14px;
      font-family: var(--font-mono); font-size: .63rem;
      color: var(--muted); letter-spacing: .12em; text-transform: uppercase;
      animation: fup 1s 1.2s both;
    }
    .s-line { width: 48px; height: 1px; background: linear-gradient(90deg, var(--accent), transparent); }

    /* floating side badges */
    .h-badges {
      position: absolute; right: 64px; top: 50%;
      display: flex; flex-direction: column; gap: 12px;
      animation: fup 1s .9s both;
    }
    .badge {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 16px; background: var(--surface);
      border: 1px solid var(--border); border-radius: 4px;
      font-family: var(--font-mono); font-size: .7rem; color: var(--muted);
      transition: all .25s; cursor: none;
    }
    .badge:hover { border-color: var(--accent); color: var(--text); transform: translateX(-4px); }
    .b-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
    .b-main { color: var(--text); font-weight: 600; font-size: .76rem; display: block; }

    /* ━━━━━━━━━━━━━━ SECTION ━━━━━━━━━━━━━━ */
    section { position: relative; z-index: 2; padding: 120px 64px; max-width: 1200px; margin: 0 auto; }

    .sec-hdr { display: flex; align-items: center; gap: 18px; margin-bottom: 68px; }
    .sec-num { font-family: var(--font-mono); font-size: .68rem; color: var(--accent); letter-spacing: .1em; }
    .sec-bar { width: 50px; height: 1px; background: var(--accent); opacity: .5; }
    .sec-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; letter-spacing: -.04em; }
    .sec-fill { flex: 1; height: 1px; background: var(--border); }

    /* ━━━━━━━━━━━━━━ ABOUT ━━━━━━━━━━━━━━ */
    .about-grid { display: grid; grid-template-columns: 1.2fr .85fr; gap: 80px; align-items: start; }

    .a-text p { font-size: .98rem; line-height: 1.9; color: var(--muted); margin-bottom: 20px; }
    .a-text p strong { color: var(--accent); font-weight: 600; }

    .tech-wrap { margin-top: 34px; }
    .tech-label { font-family: var(--font-mono); font-size: .68rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 14px; }
    .tech-pills { display: flex; flex-wrap: wrap; gap: 8px; }
    .tp {
      font-family: var(--font-mono); font-size: .7rem; padding: 6px 14px;
      border: 1px solid var(--border); border-radius: 2px; color: var(--muted);
      transition: all .2s; cursor: none;
    }
    .tp:hover { border-color: var(--accent); color: var(--accent); background: rgba(0,255,178,.05); transform: translateY(-2px); }

    .a-stats { display: flex; flex-direction: column; gap: 2px; }
    .stat {
      background: var(--surface); padding: 26px 30px;
      border: 1px solid var(--border); position: relative; overflow: hidden;
      transition: all .3s; cursor: none;
    }
    .stat::after {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0;
      width: 2px; background: var(--accent);
      transform: scaleY(0); transition: transform .3s; transform-origin: bottom;
    }
    .stat:hover { border-color: rgba(0,255,178,.3); transform: translateX(6px); }
    .stat:hover::after { transform: scaleY(1); }
    .s-num { font-size: 3rem; font-weight: 800; color: var(--accent); letter-spacing: -.05em; line-height: 1; margin-bottom: 6px; }
    .s-lbl { font-family: var(--font-mono); font-size: .68rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; }

    /* ━━━━━━━━━━━━━━ SKILLS ━━━━━━━━━━━━━━ */
    .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }

    .sk-card {
      background: var(--surface); padding: 34px;
      border: 1px solid var(--border); position: relative; overflow: hidden;
      transition: all .35s; cursor: none;
    }
    .sk-card::before {
      content: attr(data-n); position: absolute; right: 20px; top: 16px;
      font-family: var(--font-mono); font-size: .62rem; color: var(--border);
      transition: color .3s;
    }
    .sk-glow {
      position: absolute; inset: 0;
      background: radial-gradient(circle at 50% 0%, rgba(0,255,178,.08) 0%, transparent 70%);
      opacity: 0; transition: opacity .4s;
    }
    .sk-card:hover .sk-glow { opacity: 1; }
    .sk-card:hover { border-color: rgba(0,255,178,.3); transform: translateY(-6px); box-shadow: 0 24px 64px rgba(0,0,0,.45); }
    .sk-card:hover::before { color: var(--accent); }

    .sk-icon { font-size: 2.2rem; margin-bottom: 18px; display: block; }
    .sk-name { font-size: 1.05rem; font-weight: 700; margin-bottom: 10px; letter-spacing: -.02em; }
    .sk-desc { font-family: var(--font-mono); font-size: .72rem; color: var(--muted); line-height: 1.7; margin-bottom: 20px; }

    .bar-hdr { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: .62rem; color: var(--muted); margin-bottom: 6px; }
    .bar-bg { height: 2px; background: var(--surface2); border-radius: 1px; overflow: hidden; }
    .bar-fill {
      height: 100%; border-radius: 1px;
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      transition: width 1.5s cubic-bezier(.16,1,.3,1);
      position: relative;
    }
    .bar-fill::after {
      content: ''; position: absolute; right: 0; top: 50%;
      width: 7px; height: 7px; border-radius: 50%; background: var(--accent);
      transform: translate(50%,-50%); box-shadow: 0 0 10px var(--accent);
    }

    /* ━━━━━━━━━━━━━━ TIMELINE ━━━━━━━━━━━━━━ */
    .timeline { position: relative; padding-left: 48px; }
    .timeline::before {
      content: ''; position: absolute; left: 0; top: 8px; bottom: 0; width: 1px;
      background: linear-gradient(to bottom, var(--accent) 0%, rgba(0,255,178,.08) 80%, transparent);
    }
    .tl-item { position: relative; margin-bottom: 72px; }
    .tl-node {
      position: absolute; left: -54px; top: 4px;
      width: 14px; height: 14px; border-radius: 50%;
      border: 2px solid var(--accent); background: var(--bg);
      transition: background .25s, box-shadow .25s;
    }
    .tl-node::before {
      content: ''; position: absolute; inset: -4px; border-radius: 50%;
      border: 1px solid rgba(0,255,178,.2); transition: border-color .25s;
    }
    .tl-item:hover .tl-node { background: var(--accent); box-shadow: 0 0 20px rgba(0,255,178,.55); }
    .tl-item:hover .tl-node::before { border-color: rgba(0,255,178,.5); }

    .tl-period { font-family: var(--font-mono); font-size: .68rem; color: var(--accent); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 10px; }
    .tl-card {
      background: var(--surface); border: 1px solid var(--border); padding: 32px; border-radius: 2px;
      transition: border-color .3s, transform .3s;
    }
    .tl-item:hover .tl-card { border-color: rgba(0,255,178,.25); transform: translateX(4px); }
    .tl-company { font-size: 1.5rem; font-weight: 800; letter-spacing: -.03em; margin-bottom: 4px; }
    .tl-role { font-family: var(--font-mono); font-size: .76rem; color: var(--muted); margin-bottom: 20px; }
    .tl-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
    .tag {
      font-family: var(--font-mono); font-size: .63rem; padding: 4px 12px;
      border: 1px solid var(--border); border-radius: 2px;
      color: var(--accent); background: rgba(0,255,178,.05);
    }
    .tl-bullets { list-style: none; }
    .tl-bullets li {
      font-size: .9rem; color: var(--muted); line-height: 1.75;
      padding-left: 22px; position: relative; margin-bottom: 8px;
    }
    .tl-bullets li::before { content: '▸'; position: absolute; left: 0; color: var(--accent); font-size: .75rem; top: 2px; }

    /* ━━━━━━━━━━━━━━ CERTS ━━━━━━━━━━━━━━ */
    .certs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
    .cert {
      background: var(--surface); border: 1px solid var(--border);
      padding: 28px 32px; display: flex; align-items: center; gap: 22px;
      transition: all .3s; cursor: none; position: relative; overflow: hidden;
    }
    .cert::after {
      content: '↗'; position: absolute; right: 20px; top: 50%;
      transform: translateY(-50%) translateX(18px); opacity: 0;
      color: var(--accent); font-size: 1.1rem; transition: all .3s;
    }
    .cert:hover::after { transform: translateY(-50%) translateX(0); opacity: 1; }
    .cert:hover { border-color: rgba(0,255,178,.3); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,.3); }
    .cert-ico {
      width: 52px; height: 52px; flex-shrink: 0; border-radius: 4px;
      background: linear-gradient(135deg, rgba(0,255,178,.1), rgba(0,94,255,.1));
      border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; transition: transform .3s;
    }
    .cert:hover .cert-ico { transform: rotate(-8deg) scale(1.1); }
    .cert-name { font-weight: 700; font-size: .94rem; margin-bottom: 6px; line-height: 1.3; }
    .cert-org { font-family: var(--font-mono); font-size: .68rem; color: var(--accent); }

    /* ━━━━━━━━━━━━━━ CONTACT ━━━━━━━━━━━━━━ */
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
    .c-headline { font-size: clamp(2rem, 4vw, 3.4rem); font-weight: 800; letter-spacing: -.04em; line-height: 1.05; margin-bottom: 22px; }
    .c-sub { font-family: var(--font-mono); font-size: .83rem; color: var(--muted); line-height: 1.85; margin-bottom: 42px; }
    .c-items { display: flex; flex-direction: column; gap: 12px; }
    .c-item {
      display: flex; align-items: center; gap: 18px;
      padding: 18px 22px; background: var(--surface); border: 1px solid var(--border);
      border-radius: 2px; text-decoration: none; color: var(--text);
      transition: all .25s; cursor: none; position: relative; overflow: hidden;
    }
    .c-item::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
      background: var(--accent); transform: scaleY(0); transition: transform .25s; transform-origin: bottom;
    }
    .c-item:hover::before { transform: scaleY(1); }
    .c-item:hover { border-color: rgba(0,255,178,.2); padding-left: 30px; }
    .ci-icon { font-size: 1.2rem; flex-shrink: 0; }
    .ci-lbl { font-family: var(--font-mono); font-size: .63rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; display: block; margin-bottom: 3px; }
    .ci-val { font-weight: 600; font-size: .9rem; }

    .c-form { display: flex; flex-direction: column; gap: 18px; }
    .f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .f-field { display: flex; flex-direction: column; gap: 8px; }
    .f-field label { font-family: var(--font-mono); font-size: .66rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; }
    .f-field input, .f-field textarea {
      background: var(--surface); border: 1px solid var(--border); border-radius: 2px;
      padding: 14px 18px; color: var(--text);
      font-family: var(--font-display); font-size: .92rem;
      outline: none; transition: border-color .25s, box-shadow .25s; resize: none;
    }
    .f-field input:focus, .f-field textarea:focus {
      border-color: var(--accent); box-shadow: 0 0 0 3px rgba(0,255,178,.07);
    }
    .f-field input::placeholder, .f-field textarea::placeholder { color: var(--muted); }
    .send-btn {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      padding: 17px; background: var(--accent); color: var(--bg);
      font-weight: 800; font-size: .95rem; letter-spacing: .04em;
      border: none; border-radius: 2px; cursor: none;
      transition: transform .2s, box-shadow .3s; position: relative; overflow: hidden;
    }
    .send-btn::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.22) 50%, transparent 70%);
      transform: translateX(-100%); transition: transform .5s;
    }
    .send-btn:hover::before { transform: translateX(100%); }
    .send-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 44px rgba(0,255,178,.4); }
    .send-btn.sent { background: transparent; color: var(--accent); border: 1px solid var(--accent); }

    /* ━━━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━━━ */
    footer {
      position: relative; z-index: 2; border-top: 1px solid var(--border);
      padding: 26px 64px; display: flex; justify-content: space-between; align-items: center;
    }
    .f-txt { font-family: var(--font-mono); font-size: .68rem; color: var(--muted); }
    .f-txt span { color: var(--accent); }

    /* ━━━━━━━━━━━━━━ AOS ━━━━━━━━━━━━━━ */
    .aos { opacity: 0; transform: translateY(36px); transition: opacity .7s ease, transform .7s ease; }
    .aos.visible { opacity: 1; transform: translateY(0); }
    .aosl { opacity: 0; transform: translateX(-36px); transition: opacity .7s ease, transform .7s ease; }
    .aosl.visible { opacity: 1; transform: translateX(0); }

    /* ━━━━━━━━━━━━━━ RESPONSIVE ━━━━━━━━━━━━━━ */
    @media (max-width: 900px) {
      nav { padding: 16px 24px; }
      .n-links { display: none; }
      .hero { padding: 0 24px; padding-top: 80px; }
      .h-badges { display: none; }
      section { padding: 80px 24px; }
      .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 48px; }
      .skills-grid { grid-template-columns: 1fr 1fr; }
      .certs-grid { grid-template-columns: 1fr; }
      footer { flex-direction: column; gap: 12px; padding: 24px; text-align: center; }
      .f-row { grid-template-columns: 1fr; }
    }
    @media (max-width: 560px) {
      .skills-grid { grid-template-columns: 1fr; }
    }
  `}</style>
);

// ─── Data ──────────────────────────────────────────────────────────────────
const skills = [
  { icon: "⚡", name: "Frontend Dev", desc: "HTML5, CSS3, JavaScript ES6+, React.js — crafting pixel-perfect responsive UIs.", pct: 82 },
  { icon: "🗄️", name: "Database", desc: "MongoDB & SQL — schema design, efficient queries and data modeling.", pct: 70 },
  { icon: "🔗", name: "REST APIs", desc: "Building and integrating RESTful APIs with clean, maintainable architecture.", pct: 76 },
  { icon: "🛡️", name: "Cybersecurity", desc: "Network security, ethical hacking fundamentals, firewalls & encryption.", pct: 56 },
  { icon: "🐙", name: "Git & GitHub", desc: "Version control, branching workflows, code reviews and CI/CD basics.", pct: 80 },
  { icon: "🐍", name: "Python", desc: "Scripting, data manipulation & automation. Kaggle certified badge holder.", pct: 66 },
];

const experiences = [
  {
    period: "Jun 2025 – Sep 2025", company: "Cloudcredits Technologies",
    role: "Frontend Developer Intern · Jaipur, Rajasthan",
    tags: ["React", "HTML/CSS", "JavaScript", "REST APIs", "Git"],
    bullets: [
      "Built and improved responsive web interfaces using HTML, CSS & JavaScript.",
      "Integrated REST APIs ensuring cross-device responsiveness.",
      "Maintained clean, version-controlled codebases via Git & GitHub.",
      "Participated in code reviews, stand-ups & product brainstorming.",
    ],
  },
  {
    period: "Jul 2024 – Aug 2024", company: "Learn and Build",
    role: "Cybersecurity Intern · Jaipur, Rajasthan",
    tags: ["Network Security", "Ethical Hacking", "Encryption"],
    bullets: [
      "Completed focused training on Cyber Security fundamentals.",
      "Studied network security, ethical hacking & cyber threat landscapes.",
      "Hands-on with firewalls, encryption & vulnerability assessment.",
    ],
  },
];

const certs = [
  { icon: "🤖", name: "5-Day AI Agents Intensive Course", org: "Google" },
  { icon: "🐍", name: "Python Coder Badge", org: "Kaggle" },
  { icon: "☁️", name: "Azure Synapse Serverless SQL Pool", org: "Microsoft Azure" },
  { icon: "🌐", name: "MERN Stack Web Development", org: "Certification" },
];

const techStack = ["HTML5", "CSS3", "JavaScript", "React.js", "MongoDB", "SQL", "REST APIs", "Git", "GitHub", "Python", "Node.js", "VS Code"];

// ─── Custom Cursor Component ───────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const rPos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };

    const tick = () => {
      rPos.current.x = lerp(rPos.current.x, pos.current.x, 0.11);
      rPos.current.y = lerp(rPos.current.y, pos.current.y, 0.11);
      if (ringRef.current) {
        ringRef.current.style.left = rPos.current.x + "px";
        ringRef.current.style.top = rPos.current.y + "px";
      }
      if (labelRef.current) {
        labelRef.current.style.left = pos.current.x + "px";
        labelRef.current.style.top = pos.current.y + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    // hover intent
    const interactEls = "a, button, [data-cursor]";
    const over = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) setLabel(el.dataset.cursor);
      document.body.classList.add("ch");
    };
    const out = () => {
      setLabel("");
      document.body.classList.remove("ch");
    };
    const click = () => {
      document.body.classList.add("cc");
      setTimeout(() => document.body.classList.remove("cc"), 150);
    };

    document.querySelectorAll(interactEls).forEach(el => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", click);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <>
      <div className="c-dot" ref={dotRef} />
      <div className="c-ring" ref={ringRef} />
      <div className="c-label" ref={labelRef}>{label}</div>
    </>
  );
}

// ─── AOS ──────────────────────────────────────────────────────────────────
function useAOS() {
  useEffect(() => {
    const els = document.querySelectorAll(".aos, .aosl");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Counter ──────────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let n = 0;
        const go = () => { n = Math.min(n + Math.ceil(to / 35), to); setV(n); if (n < to) requestAnimationFrame(go); };
        requestAnimationFrame(go);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

// ─── Skill Bar ────────────────────────────────────────────────────────────
function Bar({ pct }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setW(pct); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div ref={ref}>
      <div className="bar-hdr"><span>Proficiency</span><span>{pct}%</span></div>
      <div className="bar-bg"><div className="bar-fill" style={{ width: `${w}%` }} /></div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────
export default function Portfolio() {
  useAOS();
  const [form, setForm] = useState({ name: "", email: "", sub: "", msg: "" });
  const [sent, setSent] = useState(false);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const send = () => {
    if (form.name && form.email && form.msg) {
      setSent(true);
      setForm({ name: "", email: "", sub: "", msg: "" });
      setTimeout(() => setSent(false), 3500);
    }
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <GlobalStyles />
      <Cursor />
      <div className="noise" />
      <div className="dot-grid" />
      <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />

      {/* ── NAV ── */}
      <nav>
        <div className="n-logo">VK<em>.</em></div>
        <div className="n-links">
          {[["01","about"],["02","skills"],["03","experience"],["04","certifications"],["05","contact"]].map(([n,s]) => (
            <span key={s} className="n-link" onClick={() => go(s)} data-cursor={s.toUpperCase()}>
              <span className="nn">{n}.</span>{s}
            </span>
          ))}
        </div>
        <span className="n-cta" onClick={() => go("contact")} data-cursor="TALK">Let's Talk</span>
      </nav>

      {/* ── HERO ── */}
      <div className="hero" id="home">
        <div className="hero-inner">
          <div className="eyebrow"><span className="pulse" />Open to Internships &amp; Full-time Roles</div>
          <h1 className="h-name">
            <span className="h-line"><span className="hi">Vivek</span></span>
            <span className="h-line"><span className="hi">Kumar.</span></span>
          </h1>
          <p className="h-desc">
            Frontend Developer &amp; CS Engineering Student @<br />
            Jagannath University, Jaipur — building interfaces<br />
            that are fast, responsive &amp; memorable.
          </p>
          <div className="h-actions">
            <span className="btn-p" onClick={() => go("experience")} data-cursor="EXPLORE">See My Work →</span>
            <a href="https://www.linkedin.com/in/vivek-kumar011/" target="_blank" rel="noreferrer" className="btn-o" data-cursor="VISIT">LinkedIn ↗</a>
          </div>
        </div>

        <div className="h-badges">
          {[["B.Tech CSE","Jagannath University"],["Frontend Dev","Cloudcredits Tech"],["4 Certifications","Google · Kaggle · Azure"],["Graduating","2027"]].map(([t,s]) => (
            <div className="badge" key={t}>
              <span className="b-dot" />
              <div><span className="b-main">{t}</span>{s}</div>
            </div>
          ))}
        </div>

        <div className="scroll-hint"><div className="s-line" />Scroll to explore</div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="sec-hdr aos"><span className="sec-num">01</span><div className="sec-bar" /><h2 className="sec-title">About Me</h2><div className="sec-fill" /></div>
        <div className="about-grid">
          <div className="a-text aosl">
            <p>I'm a <strong>pre-final year B.Tech CSE</strong> student at Jagannath University with real-world experience building interfaces at Cloudcredits Technologies.</p>
            <p>I enjoy turning complex problems into clean, intuitive web experiences. I write <strong>clean, maintainable code</strong> and care deeply about performance, accessibility, and design.</p>
            <p>Outside coding, I'm constantly levelling up — from <strong>AI Agents with Google</strong> to Azure cloud services and cybersecurity fundamentals.</p>
            <div className="tech-wrap">
              <div className="tech-label">Technologies I work with</div>
              <div className="tech-pills">{techStack.map(t => <span className="tp" key={t} data-cursor="SKILL">{t}</span>)}</div>
            </div>
          </div>
          <div className="a-stats aos">
            {[["2","+","Internships Completed"],["4","","Certifications Earned"],["6","+","Technologies"],["2027","","Expected Graduation"]].map(([n,s,l]) => (
              <div className="stat" key={l} data-cursor="INFO">
                <div className="s-num"><Counter to={parseInt(n)} suffix={s} /></div>
                <div className="s-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="sec-hdr aos"><span className="sec-num">02</span><div className="sec-bar" /><h2 className="sec-title">Skills</h2><div className="sec-fill" /></div>
        <div className="skills-grid">
          {skills.map((s,i) => (
            <div className="sk-card aos" key={s.name} data-n={`0${i+1}`} data-cursor="VIEW" style={{ transitionDelay: `${i*.07}s` }}>
              <div className="sk-glow" />
              <span className="sk-icon">{s.icon}</span>
              <div className="sk-name">{s.name}</div>
              <div className="sk-desc">{s.desc}</div>
              <Bar pct={s.pct} />
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience">
        <div className="sec-hdr aos"><span className="sec-num">03</span><div className="sec-bar" /><h2 className="sec-title">Experience</h2><div className="sec-fill" /></div>
        <div className="timeline">
          {experiences.map((exp,i) => (
            <div className="tl-item aos" key={i} style={{ transitionDelay: `${i*.15}s` }}>
              <div className="tl-node" />
              <div className="tl-period">{exp.period}</div>
              <div className="tl-card" data-cursor="READ">
                <div className="tl-company">{exp.company}</div>
                <div className="tl-role">{exp.role}</div>
                <div className="tl-tags">{exp.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                <ul className="tl-bullets">{exp.bullets.map((b,j) => <li key={j}>{b}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications">
        <div className="sec-hdr aos"><span className="sec-num">04</span><div className="sec-bar" /><h2 className="sec-title">Certifications</h2><div className="sec-fill" /></div>
        <div className="certs-grid">
          {certs.map((c,i) => (
            <div className="cert aos" key={i} data-cursor="CERT" style={{ transitionDelay: `${i*.08}s` }}>
              <div className="cert-ico">{c.icon}</div>
              <div><div className="cert-name">{c.name}</div><div className="cert-org">{c.org}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="sec-hdr aos"><span className="sec-num">05</span><div className="sec-bar" /><h2 className="sec-title">Contact</h2><div className="sec-fill" /></div>
        <div className="contact-grid">
          <div className="aosl">
            <h3 className="c-headline">Let's build something great.</h3>
            <p className="c-sub">Actively seeking internship &amp; full-time roles. Whether you have a project idea, job offer, or just want to say hello — I'd love to hear from you.</p>
            <div className="c-items">
              {[
                ["✉️","Email","vk431152@gmail.com","mailto:vk431152@gmail.com"],
                ["📱","Phone","+91 6205606989","tel:6205606989"],
                ["💼","LinkedIn","linkedin.com/in/vivekkumar011","https://www.linkedin.com/in/vivekkumar011"],
                ["📍","Location","Patna, Bihar, India", null],
              ].map(([ico,lbl,val,href]) => (
                href
                  ? <a href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer" className="c-item" key={lbl} data-cursor="OPEN">
                      <span className="ci-icon">{ico}</span>
                      <div><span className="ci-lbl">{lbl}</span><span className="ci-val">{val}</span></div>
                    </a>
                  : <div className="c-item" key={lbl} style={{cursor:"none"}}>
                      <span className="ci-icon">{ico}</span>
                      <div><span className="ci-lbl">{lbl}</span><span className="ci-val">{val}</span></div>
                    </div>
              ))}
            </div>
          </div>

          <div className="c-form aos">
            <div className="f-row">
              <div className="f-field"><label>Name</label><input placeholder="Your Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
              <div className="f-field"><label>Email</label><input placeholder="you@email.com" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
            </div>
            <div className="f-field"><label>Subject</label><input placeholder="Job Opportunity / Collaboration" value={form.sub} onChange={e=>setForm({...form,sub:e.target.value})} /></div>
            <div className="f-field"><label>Message</label><textarea rows={5} placeholder="Hi Vivek, I'd love to discuss..." value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} /></div>
            <button className={`send-btn${sent?" sent":""}`} onClick={send} data-cursor="SEND">
              {sent ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="f-txt">© 2025 <span>Vivek Kumar</span>. All rights reserved.</div>
        <div className="f-txt">Built with <span>React.js</span> · Patna, Bihar 🇮🇳</div>
      </footer>
    </div>
  );
}