import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const COUNTRIES = [
  { id: 'jp', name: 'Japan', note: 'Cherry blossom', color: '#F4B8C8' },
  { id: 'is', name: 'Iceland', note: 'Glacial blue', color: '#A6D3E0' },
  { id: 'eg', name: 'Egypt', note: 'Desert sand', color: '#E2C290' },
  { id: 'br', name: 'Brazil', note: 'Rainforest', color: '#2F8F5B' },
  { id: 'ma', name: 'Morocco', note: 'Atlas clay', color: '#C96B45' },
  { id: 'gr', name: 'Greece', note: 'Aegean', color: '#2E79C9' },
  { id: 'ke', name: 'Kenya', note: 'Savanna', color: '#D9A441' },
  { id: 'no', name: 'Norway', note: 'Fjord', color: '#3E6E80', existing: '/images/regions/norway-fjord.jpg' },
  { id: 'in', name: 'India', note: 'Marigold', color: '#F2A00C' },
  { id: 'au', name: 'Australia', note: 'Red centre', color: '#C0492F' },
  { id: 'ca', name: 'Canada', note: 'Autumn maple', color: '#C0392B' },
  { id: 'th', name: 'Thailand', note: 'Jade', color: '#1FA37A' },
  { id: 'pe', name: 'Peru', note: 'Andean ochre', color: '#C77B2B' },
  { id: 'it', name: 'Italy', note: 'Tuscan olive', color: '#8A9A4E' },
  { id: 'ch', name: 'Switzerland', note: 'Alpine ice', color: '#CFE0E8' },
  { id: 'za', name: 'South Africa', note: 'Canyon green', color: '#5A8040' },
  { id: 'id', name: 'Indonesia', note: 'Volcanic teal', color: '#15897A' },
  { id: 'mx', name: 'Mexico', note: 'Agave', color: '#6FA07A' },
  { id: 'cn', name: 'China', note: 'Loess earth', color: '#D6B05E' },
  { id: 'nz', name: 'New Zealand', note: 'Fern', color: '#2F7B43', existing: '/images/regions/nz-lake.jpg' },
  { id: 'us', name: 'United States', note: 'Canyon', color: '#CE6B3E' },
  { id: 'es', name: 'Spain', note: 'Saffron', color: '#D79A22' },
  { id: 'fr', name: 'France', note: 'Lavender', color: '#9A86C4' },
  { id: 'fi', name: 'Finland', note: 'Aurora', color: '#4FC79A' },
  { id: 'cl', name: 'Chile', note: 'Atacama copper', color: '#B5651D' },
  { id: 'mg', name: 'Madagascar', note: 'Baobab', color: '#A0522D' },
  { id: 'vn', name: 'Vietnam', note: 'Rice paddy', color: '#7DAA52' },
  { id: 'tr', name: 'Türkiye', note: 'Turquoise', color: '#19A0A0' },
  { id: 'ar', name: 'Argentina', note: 'Pampas wheat', color: '#D2B877' },
  { id: 'tz', name: 'Tanzania', note: 'Serengeti', color: '#CB9A4E' },
  { id: 'np', name: 'Nepal', note: 'Himalaya snow', color: '#BFD7E0' },
  { id: 'pt', name: 'Portugal', note: 'Azulejo', color: '#2E6FB0' },
  { id: 'ie', name: 'Ireland', note: 'Emerald', color: '#2E8B57' },
  { id: 'mn', name: 'Mongolia', note: 'Steppe', color: '#C4A35A' },
  { id: 'co', name: 'Colombia', note: 'Coffee & emerald', color: '#4E7D3A' },
  { id: 'ph', name: 'Philippines', note: 'Coral sea', color: '#1E8299' },
  { id: 'gb', name: 'United Kingdom', note: 'Scottish Highlands', color: '#7A9E7E' },
  { id: 'de', name: 'Germany', note: 'Black Forest', color: '#5C7A4E' },
  { id: 'kr', name: 'South Korea', note: 'Autumn maple', color: '#C4825A' },
  { id: 'my', name: 'Malaysia', note: 'Jungle green', color: '#2D7A3A' },
  { id: 'se', name: 'Sweden', note: 'Nordic forest', color: '#A8C5D0' },
  { id: 'at', name: 'Austria', note: 'Alpine meadow', color: '#A8C5DA' },
  { id: 'hr', name: 'Croatia', note: 'Adriatic coast', color: '#3A8FA8' },
  { id: 'et', name: 'Ethiopia', note: 'Danakil earth', color: '#C4813B' },
  { id: 'na', name: 'Namibia', note: 'Namib sand', color: '#D4A86A' },
  { id: 'ae', name: 'UAE', note: 'Desert dunes', color: '#D4B483' },
  { id: 'ir', name: 'Iran', note: 'Persian clay', color: '#C07840' },
  { id: 'kz', name: 'Kazakhstan', note: 'Golden steppe', color: '#C4B06A' },
  { id: 've', name: 'Venezuela', note: 'Angel Falls', color: '#3A9E6A' },
  { id: 'ec', name: 'Ecuador', note: 'Andean green', color: '#4A9E7A' },
  { id: 'cr', name: 'Costa Rica', note: 'Volcanic forest', color: '#3A8C4A' },
  { id: 'cu', name: 'Cuba', note: 'Tropical valley', color: '#4AAF7C' },
  { id: 'ug', name: 'Uganda', note: 'Gorilla highlands', color: '#4A8C4A' },
  { id: 'gh', name: 'Ghana', note: 'West African coast', color: '#C4824A' },
  { id: 'ru', name: 'Russia', note: 'Taiga & Baikal', color: '#8B9E7A' },
  { id: 'sa', name: 'Saudi Arabia', note: 'AlUla desert', color: '#C9A87A' },
];

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  const ll = l / 100;
  const a = (s * Math.min(ll, 1 - ll)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const c = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function buildPalette(hex) {
  try {
    const [h, s, l] = hexToHsl(hex);
    return [
      hslToHex(h, Math.min(s * 0.55, 100), Math.min(l + 28, 88)),
      hslToHex(h, Math.min(s * 0.80, 100), Math.min(l + 12, 78)),
      hex,
      hslToHex(h, Math.min(s * 1.05, 100), Math.max(l - 22, 8)),
    ];
  } catch {
    return [hex, hex, hex, hex];
  }
}

function PhotoGallery() {
  return (
    <Box sx={{ bgcolor: '#0a0a0a', minHeight: '100vh', p: 4 }}>
      <Typography sx={{ fontSize: 28, fontWeight: 500, color: '#fff', mb: 1 }}>
        Photo Gallery
      </Typography>
      <Typography sx={{ fontSize: 14, color: '#666', mb: 4 }}>
        {COUNTRIES.length}개국 · 사진 + 컬러 팔레트 확인용
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 2,
        }}
      >
        {COUNTRIES.map((c) => {
          const src = c.existing || `/images/regions/${c.id}-nature.jpg`;
          const palette = buildPalette(c.color);
          return (
            <Box key={c.id} sx={{ bgcolor: '#111', borderRadius: 1, overflow: 'hidden' }}>
              {/* 사진 */}
              <Box sx={{ position: 'relative', aspectRatio: '4/3' }}>
                <Box
                  component="img"
                  src={src}
                  alt={c.name}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                  }}
                />
                <Box sx={{ position: 'absolute', bottom: 12, left: 14 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 500, color: '#fff', lineHeight: 1.2 }}>
                    {c.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', mt: 0.25 }}>
                    {c.note} · <code style={{ fontSize: 11 }}>{c.id}</code>
                  </Typography>
                </Box>
              </Box>

              {/* 컬러 팔레트 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5 }}>
                {palette.map((color, i) => (
                  <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: color,
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    />
                    <Typography sx={{ fontSize: 9, color: '#666', fontFamily: 'monospace', letterSpacing: '0.02em' }}>
                      {color.toUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default PhotoGallery;
