import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, Star, Sparkles, Flower2, Cake, Gift, Camera, ChevronDown, SkipForward, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import './App.css';

// ─── Floating Particles Background ───
function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 20,
      duration: 18 + Math.random() * 14,
      color: ['#ff85a1', '#ffd93d', '#e2bcff', '#ffb6c1', '#b9e9ff'][i % 5],
      opacity: 0.15 + Math.random() * 0.2,
    }))
  );

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, p.opacity, p.opacity, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            filter: `blur(1px)`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Falling Flower Petals ───
function FallingPetals() {
  const petals = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 24 + Math.random() * 20, // Increased size
    delay: Math.random() * 12,
    duration: 12 + Math.random() * 10,
    sway: 40 + Math.random() * 80,
    color: ['#ff85a1', '#ffb6c1', '#ffc0cb', '#e2bcff', '#ffd93d'][i % 5],
  }));

  return (
    <div className="particles-container" style={{ zIndex: 1 }}>
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: -40, rotate: 0, opacity: 0 }}
          animate={{
            y: '110vh',
            x: [`${p.x}vw`, `${p.x + (Math.random() > 0.5 ? p.sway / 10 : -p.sway / 10)}vw`],
            rotate: [0, 180, 360],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{ position: 'absolute' }}
        >
          <Flower2 size={p.size} color={p.color} strokeWidth={1.2} fill={p.color} fillOpacity={0.15} />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Rising Balloons ───
function RisingBalloons() {
  const balloons = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    size: 45 + Math.random() * 35, // Significantly larger
    delay: Math.random() * 15,
    duration: 16 + Math.random() * 12,
    color: ['#ff85a1', '#ffd93d', '#e2bcff', '#b9e9ff', '#ffb6c1', '#FF4D6D'][i % 6],
  }));

  return (
    <div className="particles-container" style={{ zIndex: 1 }}>
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ x: `${b.x}vw`, y: '110vh', opacity: 0 }}
          animate={{
            y: '-15vh',
            x: [`${b.x}vw`, `${b.x + (Math.random() > 0.5 ? 3 : -3)}vw`, `${b.x}vw`],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeOut',
          }}
          style={{ position: 'absolute' }}
        >
          {/* SVG Balloon */}
          <svg width={b.size} height={b.size * 1.4} viewBox="0 0 40 56" fill="none">
            <ellipse cx="20" cy="18" rx="16" ry="18" fill={b.color} fillOpacity="0.6" />
            <ellipse cx="20" cy="18" rx="16" ry="18" stroke={b.color} strokeWidth="1" strokeOpacity="0.3" />
            <ellipse cx="14" cy="12" rx="4" ry="6" fill="white" fillOpacity="0.2" />
            <polygon points="17,35 20,38 23,35" fill={b.color} fillOpacity="0.5" />
            <line x1="20" y1="38" x2="20" y2="56" stroke={b.color} strokeWidth="0.8" strokeOpacity="0.4" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Animated SVG Cake ───
function AnimatedCake({ size = 300 }) {
  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
        {/* Plate */}
        <ellipse cx="60" cy="108" rx="55" ry="8" fill="#f0e0e0" />
        {/* Bottom tier */}
        <rect x="15" y="72" width="90" height="36" rx="6" fill="#ff85a1" />
        <rect x="15" y="72" width="90" height="8" rx="4" fill="#FF4D6D" fillOpacity="0.3" />
        {/* Frosting drips */}
        <path d="M15 80 Q25 88 30 80 Q35 72 40 80 Q45 88 50 80 Q55 72 60 80 Q65 88 70 80 Q75 72 80 80 Q85 88 90 80 Q95 72 105 80" stroke="#ffc0cb" strokeWidth="3" fill="none" />
        {/* Top tier */}
        <rect x="28" y="44" width="64" height="30" rx="5" fill="#ffb6c1" />
        <rect x="28" y="44" width="64" height="7" rx="3" fill="#ff85a1" fillOpacity="0.3" />
        {/* Frosting drips top */}
        <path d="M28 51 Q35 58 40 51 Q45 44 50 51 Q55 58 60 51 Q65 44 70 51 Q75 58 80 51 Q85 44 92 51" stroke="#ffe0ea" strokeWidth="2.5" fill="none" />
        {/* Sprinkles */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={i}
            cx={22 + Math.random() * 76}
            cy={50 + Math.random() * 52}
            r={1.5}
            fill={['#ffd93d', '#e2bcff', '#b9e9ff', '#fff'][i % 4]}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
        {/* Candles */}
        {[38, 50, 60, 70, 82].map((cx, i) => (
          <g key={i}>
            <rect x={cx - 1.5} y="28" width="3" height="18" rx="1.5"
              fill={['#ffd93d', '#e2bcff', '#b9e9ff', '#ffb6c1', '#ff85a1'][i]} />
            {/* Flame */}
            <motion.ellipse
              cx={cx}
              cy="24"
              rx="4"
              ry="6"
              fill="#ffd93d"
              animate={{
                ry: [5, 7, 5],
                rx: [3.5, 4.5, 3.5],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 0.4 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx={cx}
              cy="24"
              rx="2"
              ry="3.5"
              fill="#fff"
              fillOpacity="0.7"
              animate={{ ry: [3, 4, 3] }}
              transition={{ duration: 0.3 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        ))}
        {/* Star on top */}
        <motion.g
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '60px 16px' }}
        >
          <polygon points="60,6 62,13 69,13 63,17 65,24 60,20 55,24 57,17 51,13 58,13"
            fill="#ffd93d" stroke="#ffc107" strokeWidth="0.5" />
        </motion.g>
      </svg>
    </div>
  );
}

// ─── Confetti Burst helper ───
function fireEntranceConfetti() {
  const colors = ['#ff85a1', '#ffd93d', '#e2bcff', '#ffb6c1', '#FF4D6D'];
  // Center burst
  confetti({ particleCount: 150, spread: 90, origin: { x: 0.5, y: 0.4 }, colors, scalar: 1.2 });
  // Left
  setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.6 }, colors, scalar: 1.1 }), 300);
  // Right
  setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.6 }, colors, scalar: 1.1 }), 500);
  // Top
  setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { x: 0.5, y: 0.2 }, colors, gravity: 1.2, scalar: 1.3 }), 800);
}

// ─── Intro Screen ───
function IntroScreen({ onEnter }) {
  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <motion.p
        className="intro-label"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        a celebration of you
      </motion.p>

      <motion.h1
        className="intro-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Happy<br />Birthday
      </motion.h1>

      <motion.p
        className="intro-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        Jashan
      </motion.p>

      <motion.button
        className="enter-btn"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={onEnter}
        whileTap={{ scale: 0.95 }}
      >
        Enter Your World
      </motion.button>
    </motion.div>
  );
}

// ─── Video Showcase ───
function VideoShowcase({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const videos = [
    '/images/vid1.mp4', '/images/vid2.mp4', '/images/vid3.mp4',
    '/images/vid4.mp4', '/images/vid5.mp4', '/images/vid6.mp4', '/images/vid7.mp4',
  ];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = videos[index];
    v.play().catch(() => {});

    const onTime = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, [index]);

  const onEnded = () => {
    if (index < videos.length - 1) {
      setIndex((i) => i + 1);
      setProgress(0);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      className="video-showcase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <video
        ref={videoRef}
        onEnded={onEnded}
        playsInline
        muted={false}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div className="video-overlay" />
      <p className="video-counter">
        {String(index + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
      </p>
      <div className="video-progress" style={{ width: `${progress}%` }} />
      <button className="skip-btn" onClick={onComplete}>
        <SkipForward size={14} /> Skip
      </button>
    </motion.div>
  );
}

// ─── Collage Gallery ───
const captions = [
  'Always blooming', 'Dancing queen', 'Born to shine', 'Free spirit',
  'My queen', 'Heart of gold', 'Wild flower', 'Stardust',
  'Drama & magic', 'Pure joy', 'Sweet smile', 'Golden hour',
  'Summer vibes', 'Lovely moments', 'Forever young', 'Beautiful soul',
  'Dreamer', 'Magic in her eyes', 'Simply the best', 'Radiant',
  'Stunning', 'Graceful', 'Playful', 'Charming', 'Eternal',
  'Breathtaking', 'The One',
];

// Collage layout sizes — some images span 2 cols or 2 rows
const collageLayout = [
  { col: 'span 2', row: 'span 2' },  // 1 - hero shot big
  { col: 'span 1', row: 'span 1' },  // 2
  { col: 'span 1', row: 'span 2' },  // 3 - tall
  { col: 'span 1', row: 'span 1' },  // 4
  { col: 'span 1', row: 'span 1' },  // 5
  { col: 'span 2', row: 'span 1' },  // 6 - wide
  { col: 'span 1', row: 'span 1' },  // 7
  { col: 'span 1', row: 'span 1' },  // 8
  { col: 'span 1', row: 'span 2' },  // 9 - tall
  { col: 'span 2', row: 'span 2' },  // 10 - hero shot
  { col: 'span 1', row: 'span 1' },  // 11
  { col: 'span 1', row: 'span 1' },  // 12
  { col: 'span 1', row: 'span 1' },  // 13
  { col: 'span 2', row: 'span 1' },  // 14 - wide
  { col: 'span 1', row: 'span 1' },  // 15
  { col: 'span 1', row: 'span 2' },  // 16 - tall
  { col: 'span 1', row: 'span 1' },  // 17
  { col: 'span 1', row: 'span 1' },  // 18
  { col: 'span 2', row: 'span 2' },  // 19 - hero shot
  { col: 'span 1', row: 'span 1' },  // 20
  { col: 'span 1', row: 'span 1' },  // 21
  { col: 'span 1', row: 'span 1' },  // 22
  { col: 'span 2', row: 'span 1' },  // 23 - wide
  { col: 'span 1', row: 'span 1' },  // 24
  { col: 'span 1', row: 'span 1' },  // 25
  { col: 'span 1', row: 'span 2' },  // 26 - tall
  { col: 'span 2', row: 'span 1' },  // 27 - wide
];

function CollagePhoto({ index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const layout = collageLayout[index] || { col: 'span 1', row: 'span 1' };

  return (
    <motion.div
      ref={ref}
      className="collage-card"
      style={{
        gridColumn: layout.col,
        gridRow: layout.row,
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: (index % 5) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={`/images/img${index + 1}.jpeg`}
        alt={captions[index]}
        loading="lazy"
        style={{ y }}
      />
      <div className="collage-overlay">
        <span className="collage-caption">{captions[index]}</span>
      </div>
    </motion.div>
  );
}

// ─── Main Site ───
function MainSite() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Fire confetti on load
  useEffect(() => {
    const timer = setTimeout(() => fireEntranceConfetti(), 600);
    return () => clearTimeout(timer);
  }, []);

  const fireConfetti = useCallback(() => {
    const colors = ['#ff85a1', '#ffd93d', '#e2bcff', '#ffb6c1'];
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.65 }, colors });
    setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.7 }, colors }), 200);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Particles />
      <FallingPetals />
      <RisingBalloons />

      {/* ── Hero ── */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero-bg" style={{ y: heroImgY }}>
          <img src="/images/img27.jpeg" alt="" />
        </motion.div>

        <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
          <motion.div
            className="hero-stickers"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Star size={28} color="#ffd93d" fill="#ffd93d" fillOpacity={0.3} />
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
              <Heart size={32} color="#ff85a1" fill="#ff85a1" fillOpacity={0.3} />
            </motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.2, repeat: Infinity, delay: 1 }}>
              <Sparkles size={28} color="#e2bcff" fill="#e2bcff" fillOpacity={0.3} />
            </motion.div>
          </motion.div>

          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Today is your magical day
          </motion.p>

          <motion.h1
            className="hero-heading"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="line1">Happy Birthday</span>
            <span className="line2">Jashan!</span>
          </motion.h1>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            with all the love in the universe
          </motion.p>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll</span>
          <ChevronDown size={18} />
        </motion.div>
      </section>

      {/* ── Gallery ── */}
      <section className="gallery">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Moments of Magic</h2>
          <p>Every picture tells our story</p>
        </motion.div>

        <div className="collage-grid">
          {Array.from({ length: 27 }, (_, i) => (
            <CollagePhoto key={i} index={i} />
          ))}
        </div>
      </section>

      {/* ── Wish Section ── */}
      <section className="wish-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AnimatedCake size={320} />
          </motion.div>

          <h2 className="wish-heading">Make a Wish, Jashan</h2>
          <p className="wish-sub">Close your eyes and dream big...</p>

          <div className="sticker-row">
            {[
              { Icon: Heart, color: '#ff85a1' },
              { Icon: Star, color: '#ffd93d' },
              { Icon: Gift, color: '#e2bcff' },
              { Icon: Flower2, color: '#ffb6c1' },
              { Icon: Sparkles, color: '#b9e9ff' },
              { Icon: PartyPopper, color: '#ffd93d' },
            ].map(({ Icon, color }, i) => (
              <motion.div
                key={i}
                className="sticker-item"
                whileHover={{ scale: 1.3, y: -10, rotate: 10 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  y: { duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
                }}
                onClick={fireConfetti}
                style={{ cursor: 'pointer' }}
              >
                <Icon size={28} color={color} strokeWidth={1.5} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Letter ── */}
      <section className="letter-section">
        <motion.div
          className="letter-paper"
          initial={{ opacity: 0, y: 60, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="letter-seal">
            <Heart size={24} fill="rgba(255,255,255,0.9)" strokeWidth={0} />
          </div>

          <p className="letter-date">April 27, 2026</p>
          <h3 className="letter-salutation">My Dearest Jashan,</h3>

          <div className="letter-body">
            <p>
              On this beautiful day, I want the whole universe to know just how
              extraordinary you are. You came into this world and made it
              immeasurably brighter, warmer, and infinitely more wonderful.
            </p>
            <p>
              There are galaxies inside your laughter, entire seasons change
              within your smile, and every time you walk into a room, the air
              itself seems to bloom with something magical and rare.
            </p>
            <p>
              You are the kind of person poems are written about &mdash; the kind
              that makes strangers feel at home, that turns ordinary Tuesday
              afternoons into memories worth keeping forever.
            </p>
            <p>
              On your birthday, I wish for you everything you&rsquo;ve ever dreamed
              of, everything you deserve (which is everything beautiful in the
              world), and so much more that your heart hasn&rsquo;t even thought
              to wish for yet.
            </p>
            <p>
              Thank you for existing. Thank you for being you. The world is a
              better place, a more beautiful place, simply because you are in it.
            </p>
            <p>
              May this year bring you all the joy, all the love, all the
              adventures and magic that your heart has been waiting for.
            </p>
          </div>

          <div className="letter-closing">
            <p>With all my love, always &amp; forever,</p>
            <span className="letter-signature">Your Biggest Admirer</span>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <motion.div
          className="footer-cake"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={fireConfetti}
        >
          <Cake size={56} color="#ff85a1" strokeWidth={1.2} />
        </motion.div>

        <h3 className="footer-heading">Happy Birthday, Jashan!</h3>
        <p className="footer-sub">Click the cake for a surprise</p>

        <div className="footer-stickers">
          {[Heart, Star, Flower2, Sparkles, Gift, Heart, Star, Flower2, Sparkles].map(
            (Icon, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                <Icon
                  size={20}
                  color={['#ff85a1', '#ffd93d', '#ffb6c1', '#e2bcff', '#b9e9ff'][i % 5]}
                  strokeWidth={1.5}
                />
              </motion.div>
            )
          )}
        </div>

        <p className="footer-credit">Made with love &amp; stickers</p>
      </footer>
    </motion.div>
  );
}

// ─── App Root ───
export default function App() {
  const [screen, setScreen] = useState('intro');

  return (
    <AnimatePresence mode="wait">
      {screen === 'intro' && (
        <IntroScreen key="intro" onEnter={() => setScreen('showcase')} />
      )}
      {screen === 'showcase' && (
        <VideoShowcase key="showcase" onComplete={() => setScreen('main')} />
      )}
      {screen === 'main' && <MainSite key="main" />}
    </AnimatePresence>
  );
}
