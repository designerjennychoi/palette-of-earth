import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import paletteOfEarthTheme from '../../styles/themes/palette-of-earth.js';
import { DocumentTitle, PageContainer, SectionTitle } from '../storybookDocumentation';
import ColorComparison from './ColorComparison.jsx';

const darkDecorator = (Story) => (
  <ThemeProvider theme={paletteOfEarthTheme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

const defaultPairs = [
  {
    label: '01 — 화산이 남긴 검정',
    description: '서로 다른 화산섬이지만, 용암이 식으며 남기는 색은 같다.',
    items: [
      { regionId: 'jeju',    colorIndex: 0, label: '현무암' },
      { regionId: 'iceland', colorIndex: 0, label: '용암 지형' },
    ],
  },
  {
    label: '02 — 차가운 물의 청회',
    description: '깊은 물은 위도를 가리지 않고 같은 무게의 파랑을 띤다.',
    items: [
      { regionId: 'norway',     colorIndex: 1, label: '피오르드' },
      { regionId: 'newzealand', colorIndex: 0, label: '호수' },
    ],
  },
  {
    label: '03 — 대지의 따뜻한 갈색',
    description: '사막의 모래와 화산재, 출처는 달라도 흙빛 팔레트는 닮아 있다.',
    items: [
      { regionId: 'morocco', colorIndex: 1, label: '사막 모래' },
      { regionId: 'iceland', colorIndex: 2, label: '화산재' },
    ],
  },
];

export default {
  title: 'Component/11. Dynamic Color/ColorComparison',
  component: ColorComparison,
  tags: ['autodocs'],
  decorators: [darkDecorator],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0D0C0B' }] },
    docs: {
      description: {
        component: `
## ColorComparison

지역 간 같은 톤 색상이 나타나는 현상을 나란히 비교하는 섹션.
뷰포트 진입 시 칩 사이를 SVG 연결선 draw 애니메이션으로 시각적 연결을 표현한다.
        `,
      },
    },
  },
};

export const Default = {
  render: () => (
    <Box sx={{ bgcolor: 'background.default' }}>
      <ColorComparison pairs={defaultPairs} />
    </Box>
  ),
};

export const SinglePair = {
  render: () => (
    <Box sx={{ bgcolor: 'background.default' }}>
      <ColorComparison
        pairs={[{
          label: '01 — 화산이 남긴 검정',
          description: '서로 다른 화산섬이지만, 용암이 식으며 남기는 색은 같다.',
          items: [
            { regionId: 'jeju',    colorIndex: 0, label: '현무암' },
            { regionId: 'iceland', colorIndex: 0, label: '용암 지형' },
          ],
        }]}
      />
    </Box>
  ),
};

export const Documentation = {
  render: () => (
    <>
      <DocumentTitle
        title="ColorComparison"
        status="Available"
        note="지역 간 색 비교 — SVG 연결선 draw 애니메이션 · Intersection Observer 트리거"
        brandName="Dynamic Color"
        systemName="Palette of Earth"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>ColorComparison</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          다른 지역에서 같은 톤이 발생하는 현상을 칩 나란히 배치 + SVG 연결선으로 표현.
          뷰포트 진입 시 연결선이 0.8s에 걸쳐 draw된다.
        </Typography>

        <SectionTitle title="Props" />
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', '& th, & td': { p: 1.5, textAlign: 'left', borderBottom: '1px solid', borderColor: 'divider' }, '& th': { fontWeight: 600 } }}>
          <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr>
              <td><code>pairs</code></td>
              <td>{'{ label, description?, items: [{ regionId, colorIndex, label? }][] }[]'}</td>
              <td>비교 쌍 배열 (필수)</td>
            </tr>
          </tbody>
        </Box>

        <SectionTitle title="pair 데이터 구조" />
        <Box component="pre" sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', p: 3, fontSize: 12, fontFamily: '"DM Mono", monospace', lineHeight: 1.8 }}>
{`{
  label: '01 — 화산이 남긴 검정',       // 쌍 레이블
  description: '설명 문장',              // (선택) 하단 이탤릭 설명
  items: [
    { regionId: 'jeju',    colorIndex: 0, label: '현무암' },
    { regionId: 'iceland', colorIndex: 0, label: '용암 지형' },
  ]
}`}
        </Box>

        <SectionTitle title="전체 비교 섹션" />
        <ColorComparison pairs={defaultPairs} />
      </PageContainer>
    </>
  ),
};
