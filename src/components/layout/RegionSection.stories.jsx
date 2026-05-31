import { useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import paletteOfEarthTheme from '../../styles/themes/palette-of-earth.js';
import { DocumentTitle, PageContainer, SectionTitle } from '../storybookDocumentation';
import RegionSection from './RegionSection.jsx';
import { RegionContext } from '../../pages/PaletteOfEarth.jsx';
import regions from '../../data/regions.js';

/** RegionSection은 RegionContext를 필요로 하므로 MockProvider로 감싼다 */
function MockRegionProvider({ children }) {
  const [activeRegion, setActiveRegion] = useState(null);
  const handleSet = useCallback((id) => setActiveRegion(id), []);
  return (
    <RegionContext.Provider value={{ activeRegion, setActiveRegion: handleSet }}>
      {children}
    </RegionContext.Provider>
  );
}

const darkDecorator = (Story) => (
  <ThemeProvider theme={paletteOfEarthTheme}>
    <CssBaseline />
    <MockRegionProvider>
      <Story />
    </MockRegionProvider>
  </ThemeProvider>
);

export default {
  title: 'Component/8. Layout/RegionSection',
  component: RegionSection,
  tags: ['autodocs'],
  decorators: [darkDecorator],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0D0C0B' }] },
    docs: {
      description: {
        component: `
## RegionSection

지역 섹션 래퍼 컴포넌트. Intersection Observer로 뷰포트 진입을 감지해
텍스트 순차 등장 → ImageBlend 시작 → ColorPalette 순차 등장을 체인한다.
RegionContext를 통해 현재 활성 지역을 전역에 알린다.
        `,
      },
    },
  },
};

const jeju = regions[0];
const norway = regions[1];

export const Default = {
  render: () => (
    <Box sx={{ bgcolor: 'background.default' }}>
      <RegionSection region={jeju} index={0} />
    </Box>
  ),
};

export const AlternatingLayout = {
  render: () => (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Typography variant="body2" sx={{ p: 3, color: 'text.secondary' }}>
        짝수 index → 이미지 우측, 홀수 index → 이미지 좌측 (비대칭 레이아웃)
      </Typography>
      <RegionSection region={jeju}   index={0} />
      <RegionSection region={norway} index={1} />
    </Box>
  ),
};

export const AllRegions = {
  render: () => (
    <Box sx={{ bgcolor: 'background.default' }}>
      {regions.map((region, i) => (
        <RegionSection key={region.id} region={region} index={i} />
      ))}
    </Box>
  ),
};

export const Documentation = {
  render: () => (
    <>
      <DocumentTitle
        title="RegionSection"
        status="Available"
        note="지역 섹션 래퍼 — 배경 오버레이 · 텍스트 등장 · ImageBlend · ColorPalette 체인"
        brandName="Layout"
        systemName="Palette of Earth"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>RegionSection</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          뷰포트 진입 시 배경 오버레이 → 텍스트 순차 등장 → ImageBlend → ColorPalette까지
          전체 지역 섹션 연출을 담당하는 래퍼 컴포넌트.
          <code>RegionContext</code>를 통해 <code>activeRegion</code>을 업데이트한다.
        </Typography>

        <SectionTitle title="Props" />
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', '& th, & td': { p: 1.5, textAlign: 'left', borderBottom: '1px solid', borderColor: 'divider' }, '& th': { fontWeight: 600 } }}>
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>region</code></td><td>object</td><td>-</td><td>regions.js 지역 데이터 객체 [필수]</td></tr>
            <tr><td><code>index</code></td><td>number</td><td>-</td><td>섹션 순서 (짝수: 이미지 우측, 홀수: 좌측) [필수]</td></tr>
          </tbody>
        </Box>

        <SectionTitle title="애니메이션 체인" />
        <Box component="pre" sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', p: 3, fontSize: 12, fontFamily: '"DM Mono", monospace', lineHeight: 1.8 }}>
{`뷰포트 40% 진입
  └─ RegionContext.setActiveRegion(id) 호출
  └─ 배경 오버레이 fade-in (0.8s)
  └─ 지역 코드 / 지역명 / 자연요소 / 설명 순차 등장 (0.1s 간격)
  └─ ImageBlend 시퀀스 시작 (레이어1 → 레이어2)
        └─ onReveal() → ColorPalette isVisible=true
              └─ 칩 4개 순차 fade-up (0.15s 간격)`}
        </Box>

        <SectionTitle title="제주도 섹션 (index=0)" />
        <RegionSection region={jeju} index={0} />
      </PageContainer>
    </>
  ),
};
