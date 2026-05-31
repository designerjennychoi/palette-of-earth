import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import paletteOfEarthTheme from '../../styles/themes/palette-of-earth.js';
import { DocumentTitle, PageContainer, SectionTitle } from '../storybookDocumentation';
import Globe from './Globe.jsx';
import regions from '../../data/regions.js';

const darkDecorator = (Story) => (
  <ThemeProvider theme={paletteOfEarthTheme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

export default {
  title: 'Component/4. Media/Globe',
  component: Globe,
  tags: ['autodocs'],
  decorators: [darkDecorator],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0D0C0B' }] },
    docs: {
      description: {
        component: `
## Globe

Three.js 기반 인터랙티브 지구본. 지역 핀 hover 시 라벨 표시,
click 시 해당 섹션으로 스무스 스크롤. 768px 미만에서 SVG 폴백으로 전환.
        `,
      },
    },
  },
  argTypes: {
    size:     { control: { type: 'range', min: 200, max: 600, step: 20 }, description: 'Canvas 크기(px)' },
    activeId: { control: 'select', options: [null, ...regions.map((r) => r.id)], description: '활성 지역 id' },
  },
};

export const Default = {
  args: { size: 480, activeId: null },
  render: (args) => {
    const [active, setActive] = useState(args.activeId);
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Globe
          regions={regions}
          activeId={active}
          onRegionClick={setActive}
          size={args.size}
        />
      </Box>
    );
  },
};

export const WithActiveRegion = {
  render: () => {
    const [active, setActive] = useState('jeju');
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Globe regions={regions} activeId={active} onRegionClick={setActive} size={440} />
        <Stack direction="row" spacing={1.5}>
          {regions.map((r) => (
            <Box
              key={r.id}
              component="button"
              onClick={() => setActive(r.id)}
              sx={{
                px: 2, py: 0.75, border: '1px solid',
                borderColor: active === r.id ? 'text.primary' : 'divider',
                bgcolor: 'background.paper', color: 'text.primary',
                cursor: 'pointer', fontSize: 11,
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              {r.nameEn}
            </Box>
          ))}
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: '"DM Mono", monospace' }}>
          active: {active || 'none'}
        </Typography>
      </Box>
    );
  },
};

export const MobileFallback = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => {
    const [active, setActive] = useState(null);
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3, display: 'flex', alignItems: 'center' }}>
        <Globe regions={regions} activeId={active} onRegionClick={setActive} size={320} />
      </Box>
    );
  },
};

export const Documentation = {
  render: () => {
    const [active, setActive] = useState(null);
    return (
      <>
        <DocumentTitle
          title="Globe"
          status="Available"
          note="Three.js 인터랙티브 지구본 — 지역 핀 hover/click · SVG 모바일 폴백"
          brandName="Media"
          systemName="Palette of Earth"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Globe</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            React Three Fiber 기반 3D 지구본. 지역 핀을 hover하면 라벨이 표시되고,
            click하면 해당 섹션으로 스무스 스크롤된다.
            768px 미만에서는 Three.js Canvas 대신 SVG 세계지도로 자동 전환한다.
          </Typography>

          <SectionTitle title="Props" />
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', '& th, & td': { p: 1.5, textAlign: 'left', borderBottom: '1px solid', borderColor: 'divider' }, '& th': { fontWeight: 600 } }}>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>regions</code></td><td>object[]</td><td>[]</td><td>regions.js 데이터 배열 (coords 필수)</td></tr>
              <tr><td><code>activeId</code></td><td>string</td><td>-</td><td>현재 활성 지역 id (핀 강조)</td></tr>
              <tr><td><code>onRegionClick</code></td><td>function</td><td>-</td><td>핀 클릭 시 호출 (region.id 전달)</td></tr>
              <tr><td><code>size</code></td><td>number</td><td>480</td><td>Canvas 크기(px), 정사각형</td></tr>
            </tbody>
          </Box>

          <SectionTitle title="기술 구성" />
          <Box component="pre" sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', p: 3, fontSize: 12, fontFamily: '"DM Mono", monospace', lineHeight: 1.8 }}>
{`Canvas (@react-three/fiber, alpha: true)
  ├── Lights (ambient + 2x directional)
  ├── GlobeMesh
  │     ├── Sphere (solid, #1A1917)
  │     └── Sphere (wireframe, opacity 0.25)
  ├── RegionPin × 5
  │     ├── sphereGeometry (r=0.032)
  │     └── Html label (hover/active 시)
  └── OrbitControls (zoom/pan disabled)

Mobile (<768px): SVG 폴백
  └── 원형 투영 지도 + 지역 마커`}
          </Box>

          <SectionTitle title="인터랙티브 데모" description="핀을 클릭해 활성 지역을 변경하세요." />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Globe regions={regions} activeId={active} onRegionClick={setActive} size={400} />
            <Stack direction="row" spacing={1.5} flexWrap="wrap" justifyContent="center">
              {regions.map((r) => (
                <Box
                  key={r.id}
                  component="button"
                  onClick={() => setActive(r.id)}
                  sx={{
                    px: 2, py: 0.75, border: '1px solid',
                    borderColor: active === r.id ? 'text.primary' : 'divider',
                    bgcolor: 'background.paper', color: 'text.primary',
                    cursor: 'pointer', fontSize: 11,
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {r.nameEn}
                </Box>
              ))}
            </Stack>
          </Box>
        </PageContainer>
      </>
    );
  },
};
