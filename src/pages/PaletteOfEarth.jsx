import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import paletteOfEarthTheme from '../styles/themes/palette-of-earth.js';
import regions from '../data/regions.js';
import Globe from '../components/media/Globe.jsx';
import RegionSection from '../components/layout/RegionSection.jsx';
import ProgressNav from '../components/navigation/ProgressNav.jsx';

export const RegionContext = createContext({
  activeRegion: null,
  setActiveRegion: () => {},
});

export const useRegion = () => useContext(RegionContext);

function RegionProvider({ children }) {
  const [activeRegion, setActiveRegion] = useState(null);
  const handleSet = useCallback((id) => setActiveRegion(id), []);
  return (
    <RegionContext.Provider value={{ activeRegion, setActiveRegion: handleSet }}>
      {children}
    </RegionContext.Provider>
  );
}

const navSections = [
  { id: 'hero', label: 'Intro', color: '#F0EBE3' },
  ...regions.map((r) => ({
    id:    r.id,
    label: r.nameEn,
    color: r.palette[2] || '#F0EBE3',
  })),
];

function HeroSection() {
  const heroRef = useRef(null);
  const { activeRegion, setActiveRegion } = useRegion();

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveRegion('hero'); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setActiveRegion]);

  return (
    <Box
      ref={heroRef}
      component="section"
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'space-between' },
        px: { xs: 3, md: 8, lg: 12 },
        py: { xs: 10, md: 0 },
        gap: { xs: 8, md: 0 },
        position: 'relative',
      }}
    >
      <Box sx={{ flex: '0 0 auto', maxWidth: 380 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Typography
            variant="overline"
            sx={{ display: 'block', color: 'text.secondary', mb: 2, letterSpacing: '0.16em' }}
          >
            A visual journey
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
            Palette<br />of Earth
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 4 }}>
            Explore the colors shaped by nature across different regions of the world.
            Click a pin on the globe or scroll to begin.
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
        >
          <Box
            component={motion.div}
            animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            sx={{ width: 32, height: 1, bgcolor: 'text.disabled', transformOrigin: 'left' }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}>
            scroll
          </Typography>
        </Box>
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        sx={{ flex: '0 0 auto' }}
      >
        <Globe regions={regions} activeId={activeRegion} size={480} />
      </Box>
    </Box>
  );
}

function PaletteInner() {
  const { activeRegion } = useRegion();

  return (
    <Box component="main" sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <HeroSection />
      {regions.map((region, index) => (
        <RegionSection key={region.id} region={region} index={index} />
      ))}
      <ProgressNav sections={navSections} activeId={activeRegion} />
    </Box>
  );
}

function PaletteOfEarth() {
  return (
    <ThemeProvider theme={paletteOfEarthTheme}>
      <CssBaseline />
      <RegionProvider>
        <PaletteInner />
      </RegionProvider>
    </ThemeProvider>
  );
}

export default PaletteOfEarth;
