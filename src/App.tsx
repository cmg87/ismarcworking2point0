import React, { useEffect, useState } from 'react';
import { MARC_DETAILS, SOCIAL_LINKS, CONTACT_ACTIONS } from './constants';
import { getWittyStatus } from './services/geminiService';
import portrait from '../marc.jpg';
import ContactTools from './components/ContactTools';
import './index.css';

function Icon({ name = 'arrow' }: { name?: string }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <path d="M5 19 19 5M5 5h14v14" />,
    save: <><path d="M12 3v12m-4-4 4 4 4-4M5 17v4h14v-4" /></>,
    share: <><path d="M12 16V3m-4 4 4-4 4 4M5 12v9h14v-9" /></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
    phone: <path d="m8 3-4 1c-3 8 8 19 16 16l1-4-5-2-2 2-6-6 2-2-2-5Z"/>,
    star: <path d="m12 2 2.8 6.7L22 9.5l-5.5 4.8 1.6 7.2-6.1-3.8-6.1 3.8 1.6-7.2L2 9.5l7.2-.8L12 2Z"/>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.arrow}</svg>;
}

export function scheduledStatus(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', hourCycle: 'h23' }).formatToParts(date);
  const day = parts.find(p => p.type === 'weekday')?.value;
  const hour = Number(parts.find(p => p.type === 'hour')?.value);
  return !['Sat', 'Sun'].includes(day || '') && hour >= 8 && hour < 20;
}

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [manualStatus, setManualStatus] = useState<boolean | null>(null);
  const isWorking = manualStatus ?? scheduledStatus(now);
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(timer); }, []);
  useEffect(() => {
    let active = true;
    setMessage('');
    getWittyStatus(isWorking).then(text => { if (active) setMessage(text); });
    return () => { active = false; };
  }, [isWorking]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 4500); return () => clearTimeout(timer); }, [notice]);

  async function share() {
    try {
      if (navigator.share) await navigator.share({ title: 'Marc Habbouche · Is Marc Working?', text: 'Good events. Better company. Find Marc here.', url: location.href });
      else { await navigator.clipboard.writeText(location.href); setNotice('Card link copied.'); }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') setNotice('Couldn’t share this time. Copy the address from your browser.');
    }
  }
  function saveContact() {
    const vcard = ['BEGIN:VCARD','VERSION:3.0','N:Habbouche;Marc;;;',`FN:${MARC_DETAILS.name}`,'ORG:Curated Events',`TEL;TYPE=CELL:${MARC_DETAILS.phone}`,`EMAIL;TYPE=WORK:${MARC_DETAILS.email}`,`URL:${MARC_DETAILS.website}`,'END:VCARD',''].join('\r\n');
    const url = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'MarcHabbouche.vcf'; document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000); setNotice('Contact card downloaded.');
  }
  const time = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
  return <div className="site-shell">
    <header className="masthead">
      <a className="wordmark" href="#" aria-label="Marc Habbouche home">MH<span className="wordmark-dot">.</span></a>
      <span className="masthead-title">IS MARC WORKING?</span>
      <button className="share-top" onClick={share}><span>Share card</span><Icon name="share"/></button>
    </header>
    <main>
      <section className="hero" aria-labelledby="marc-name">
        <div className="intro">
          <div className="eyebrow"><span className="line"/> CHARLOTTE, NORTH CAROLINA</div>
          <h1 id="marc-name">Marc<br/><span>Habbouche.</span></h1>
          <p className="bio">{MARC_DETAILS.bio}<span className="bio-period">.</span></p>
          <div className="status-block" data-working={isWorking}>
            <div className="status-heading"><span className="status-light"/><span>IS MARC WORKING?</span><span className="status-time">{time} ET</span></div>
            <div className="status-answer" key={String(isWorking)}>{isWorking ? 'YES' : 'NO'}<span>.</span></div>
            <p className="status-message" aria-live="polite">{message || (isWorking ? 'Making things happen. Probably with a coffee.' : 'Off the clock. On to something good.')}</p>
            <div className="schedule-note">{manualStatus === null ? 'Based on weekday hours · 8 am–8 pm ET' : 'Previewing a status · Only visible to you'}</div>
          </div>
          <div className="primary-actions"><button className="button button-metal" onClick={saveContact}>Save my contact<Icon name="save"/></button><a className="button button-outline" href={CONTACT_ACTIONS[0].url}>Give me a call<Icon name="phone"/></a></div>
          <ContactTools />
        </div>
        <figure className="portrait">
          <img src={portrait} alt="Marc lining up a putt on the golf course" fetchPriority="high"/>
          <div className="portrait-shade"/>
          <span className="portrait-index">M / H — 01</span>
          <figcaption><span>OFF THE CLOCK</span><p>A different kind<br/>of <em>networking.</em></p><span className="portrait-rule"/></figcaption>
        </figure>
      </section>
      <section className="connections" aria-labelledby="connect-title">
        <div className="section-heading"><div><span className="eyebrow">THE CONNECTIONS</span><h2 id="connect-title">Let's make it happen.</h2></div><a className="email-link" href={CONTACT_ACTIONS[1].url}>Work email<Icon name="email"/></a></div>
        <div className="feature-links">{SOCIAL_LINKS.slice(0, 2).map((link, i) => <a key={link.id} className="feature-link" href={link.url} target="_blank" rel="noopener noreferrer"><span className="link-index">0{i + 1}</span><div><span className="link-kicker">{i === 0 ? 'THE DAY JOB' : 'AFTER HOURS'}</span><h3>{i === 0 ? 'Curated Events' : 'StarBoyz'}{i === 1 && <Icon name="star"/>}</h3></div><span className="feature-arrow"><Icon/></span></a>)}</div>
        <div className="social-row"><span className="social-label">ELSEWHERE</span><div>{SOCIAL_LINKS.slice(2).map(link => <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">{link.name}<Icon/></a>)}</div></div>
      </section>
    </main>
    <footer><span>© {now.getFullYear()} MARC HABBOUCHE</span><div className="status-controls"><button onClick={() => setManualStatus(!isWorking)}>Preview {isWorking ? 'off-duty' : 'working'} status</button>{manualStatus !== null && <button onClick={() => setManualStatus(null)}>Use schedule</button>}</div><span>CHARLOTTE, NC <span className="footer-star">✳</span></span></footer>
    <div className={`toast ${notice ? 'visible' : ''}`} role="status">{notice}</div>
  </div>;
}
