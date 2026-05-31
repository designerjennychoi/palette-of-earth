import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import paletteOfEarthTheme from '../../styles/themes/palette-of-earth.js';
import { DocumentTitle, PageContainer, SectionTitle } from '../storybookDocumentation';
import ColorPalette from './ColorPalette.jsx';
import regions from '../../data/regions.js';

const darkDecorator = (Story) => (
  <ThemeProvider theme={paletteOfEarthTheme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

export default {
  title: 'Component/11. Dynamic Color/ColorPalette',
  component: ColorPalette,
  tags: ['autodocs'],
  decorators: [darkDecorator],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0D0C0B' }] },
  },
  argTypes: {
    isVisible: { control: 'boolean', description: '등장 애니메이션 트리거' },
    size: { control: 'select', options: ['sm', 'md'], description: '칩 크기' },
  },
};

export const Default = {
  args: {
    colors: ['#1B2E3C', '#3B5E6E', '#6B8A7A', '#C8D4D0'],
    isVisible: true,
    size: 'md',
  },
  render: (args) => (
    <Box sx={{ p: 4 }}>
      <ColorPalette {...args} />
    </Box>
  ),
};

export const AnimationDemo = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          버튼을 눌러 순차 등장 애니메이션을 확인하세요.
        </Typography>
        <Box
          component="button"
          onClick={() => setVisible((v) => !v)}
          sx={{ mb: 4, px: 3, py: 1, bgcolor: 'background.paper', color: 'text.primary', border: '1px solid', borderColor: 'divider', cursor: 'pointer' }}
        >
          {visible ? 'Reset' : 'Reveal Palette'}
        </Box>
        <ColorPalette
          colors={['#1C1C1E', '#2E4A4E', '#6A8E8A', '#D8E8E4']}
          isVisible={visible}
        />
      </Box>
    );
  },
};

export const AllRegions = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Stack spacing={6}>
        {regions.map((region) => (
          <Box key={region.id}>
            <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 1, letterSpacing: '0.12em' }}>
              {region.nameEn}
            </Typography>
            <Typography variant="h3" component="p" sx={{ mb: 3 }}>{region.name}</Typography>
            <ColorPalette colors={region.palette} isVisible />
          </Box>
        ))}
      </Stack>
    </Box>
  ),
};

export const Documentation = {
  render: () => (
    <>
      <DocumentTitle
        title="ColorPalette"
        status="Available"
        note="지역 색 팔레트 그룹 — 순차 fade-up 애니메이션 + 복사 피드백"
        brandName="Dynamic Color"
        systemName="Palette of Earth"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>ColorPalette</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          ColorChip 3–4개를 묶어 순차 등장 애니메이션과 HEX 레이블로 표시하는 팔레트 그룹.
          <code>isVisible</code>이 <code>true</code>가 되는 시점에 칩이 0.15s 간격으로 fade-up 등장한다.
        </Typography>

        <SectionTitle title="Props" />
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', '& th, & td': { p: 1.5, textAlign: 'left', borderBottom: '1px solid', borderColor: 'divider' }, '& th': { fontWeight: 600 } }}>
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>colors</code></td><td>string[]</td><td>[]</td><td>HEX 색상 배열 (3–4개 권장)</td></tr>
            <tr><td><code>isVisible</code></td><td>boolean</td><td>true</td><td>등장 애니메이션 트리거</td></tr>
            <tr><td><code>size</code></td><td>'sm' | 'md'</td><td>'md'</td><td>칩 크기</td></tr>
          </tbody>
        </Box>

        <SectionTitle title="5개 지역 팔레트" description="각 지역의 자연에서 추출한 색상 묶음." />
        <Stack spacing={6}>
          {regions.map((region) => (
            <Box key={region.id}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>{region.nameEn}</Typography>
              <Typography variant="h3" component="p" sx={{ mb: 2 }}>{region.name} — {region.element}</Typography>
              <ColorPalette colors={region.palette} isVisible />
            </Box>
          ))}
        </Stack>

        <SectionTitle title="Usage" />
        <Box component="pre" sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', p: 3, fontSize: 13, fontFamily: '"DM Mono", monospace', overflow: 'auto', lineHeight: 1.7 }}>
{`import ColorPalette from '@/components/dynamic-color/ColorPalette';

// ImageBlend 완료 후 팔레트 등장
const [visible, setVisible] = useState(false);

<ImageBlend ... onReveal={() => setVisible(true)} />
<ColorPalette
  colors={region.palette}
  isVisible={visible}
/>`}
        </Box>
      </PageContainer>
    </>
  ),
};
