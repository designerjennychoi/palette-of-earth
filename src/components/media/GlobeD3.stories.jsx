import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DocumentTitle, PageContainer, SectionTitle } from '../storybookDocumentation';
import GlobeD3 from './GlobeD3.jsx';

const darkDecorator = (Story) => (
  <Box sx={{ bgcolor: '#07090d', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
    <Story />
  </Box>
);

export default {
  title: 'Component/4. Media/GlobeD3',
  component: GlobeD3,
  tags: ['autodocs'],
  decorators: [darkDecorator],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#07090d' }] },
    docs: {
      description: {
        component: `
## GlobeD3

d3-geo 정사영 기반 SVG 지구본. 천천히 자동 회전하며 드래그로 직접 돌릴 수 있다.
각 마커는 자연에서 비롯된 대표 색으로 칠해지고, 마커에 hover하면 색상 칩이 표시된다.
3D 의존성 없이 d3-geo만 사용한다.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 240, max: 640, step: 20 },
      description: '렌더링 크기(px), 정사각형',
    },
    countries: {
      control: 'object',
      description: '마커 데이터 배열 (id, name, note, color, lat, lng)',
    },
  },
};

export const Default = {
  args: { size: 480 },
};

export const Documentation = {
  decorators: [],
  parameters: { backgrounds: { default: 'light' } },
  render: () => (
    <>
      <DocumentTitle
        title="GlobeD3"
        status="Available"
        note="d3-geo 정사영 지구본 — 자동 회전 · 드래그 · 마커 hover 색상 칩"
        brandName="Media"
        systemName="Palette of Earth"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>GlobeD3</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          d3-geo 정사영 기반 SVG 지구본. 천천히 자동 회전하며 드래그로 직접 돌릴 수 있고,
          마커에 hover하면 해당 지점의 대표 색상 칩이 나타난다. prefers-reduced-motion
          환경에서는 자동 회전을 멈춘다.
        </Typography>

        <SectionTitle title="Props" />
        <Box
          component="table"
          sx={{
            width: '100%', borderCollapse: 'collapse',
            '& th, & td': { p: 1.5, textAlign: 'left', borderBottom: '1px solid', borderColor: 'divider' },
            '& th': { fontWeight: 600 },
          }}
        >
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>countries</code></td><td>object[]</td><td>COUNTRIES (36개국)</td><td>마커 데이터 배열 (id, name, note, color, lat, lng)</td></tr>
            <tr><td><code>size</code></td><td>number</td><td>480</td><td>렌더링 크기(px), 정사각형</td></tr>
          </tbody>
        </Box>

        <SectionTitle title="인터랙티브 데모" description="드래그로 회전하고, 마커에 hover해 색상을 확인하세요." />
        <Box sx={{ bgcolor: '#07090d', borderRadius: 1, p: 4, display: 'flex', justifyContent: 'center' }}>
          <GlobeD3 size={440} />
        </Box>
      </PageContainer>
    </>
  ),
};
