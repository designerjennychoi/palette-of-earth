import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import paletteOfEarthTheme from '../../styles/themes/palette-of-earth.js';
import { DocumentTitle, PageContainer, SectionTitle } from '../storybookDocumentation';
import ProgressNav from './ProgressNav.jsx';
import regions from '../../data/regions.js';

const darkDecorator = (Story) => (
  <ThemeProvider theme={paletteOfEarthTheme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

const navSections = [
  { id: 'hero', label: 'Intro', color: '#F0EBE3' },
  ...regions.map((r) => ({ id: r.id, label: `${r.name} / ${r.nameEn}`, color: r.palette[2] })),
];

export default {
  title: 'Component/10. Navigation/ProgressNav',
  component: ProgressNav,
  tags: ['autodocs'],
  decorators: [darkDecorator],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0D0C0B' }] },
  },
};

export const Default = {
  render: () => {
    const [active, setActive] = useState('hero');
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', position: 'relative', p: 4 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          우측 도트를 클릭하면 activeId가 변경됩니다.
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: '"DM Mono", monospace' }}>
          active: {active}
        </Typography>
        <ProgressNav sections={navSections} activeId={active} onDotClick={setActive} />
      </Box>
    );
  },
};

export const AllStates = {
  render: () => (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', position: 'relative', p: 4 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        각 지역이 활성화된 상태를 시뮬레이션합니다.
      </Typography>
      <Box sx={{ display: 'flex', gap: 8 }}>
        {navSections.map((section) => (
          <Box key={section.id} sx={{ position: 'relative', height: 220 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              active: {section.id}
            </Typography>
            <ProgressNav sections={navSections} activeId={section.id} />
          </Box>
        ))}
      </Box>
    </Box>
  ),
};

export const Documentation = {
  render: () => {
    const [active, setActive] = useState('jeju');
    return (
      <>
        <DocumentTitle
          title="ProgressNav"
          status="Available"
          note="우측 고정 세로 도트 내비게이션 — 활성 섹션 캡슐 바 전환"
          brandName="Navigation"
          systemName="Palette of Earth"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>ProgressNav</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            현재 섹션을 색상 캡슐 바로 표시하는 우측 고정 내비게이션.
            비활성 섹션은 6px 원, 활성 섹션은 지역 대표색 캡슐(4×24px)로 전환된다.
            도트 클릭 시 해당 섹션으로 스무스 스크롤.
          </Typography>

          <SectionTitle title="Props" />
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', '& th, & td': { p: 1.5, textAlign: 'left', borderBottom: '1px solid', borderColor: 'divider' }, '& th': { fontWeight: 600 } }}>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>sections</code></td><td>{'{ id, label, color }[]'}</td><td>[]</td><td>섹션 목록 (id: 요소의 HTML id와 일치)</td></tr>
              <tr><td><code>activeId</code></td><td>string</td><td>-</td><td>현재 활성 섹션 id</td></tr>
              <tr><td><code>onDotClick</code></td><td>function</td><td>-</td><td>도트 클릭 시 호출 (id 전달)</td></tr>
            </tbody>
          </Box>

          <SectionTitle title="인터랙티브 데모" description="섹션 버튼을 눌러 활성 상태를 변경하세요." />
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            {navSections.map((s) => (
              <Box
                key={s.id}
                component="button"
                onClick={() => setActive(s.id)}
                sx={{
                  px: 2, py: 0.75, border: '1px solid', cursor: 'pointer',
                  borderColor: active === s.id ? 'text.primary' : 'divider',
                  bgcolor: 'background.paper', color: 'text.primary', fontSize: 12,
                }}
              >
                {s.label}
              </Box>
            ))}
          </Box>
          <Box sx={{ position: 'relative', height: 240 }}>
            <ProgressNav sections={navSections} activeId={active} onDotClick={setActive} />
          </Box>
        </PageContainer>
      </>
    );
  },
};
