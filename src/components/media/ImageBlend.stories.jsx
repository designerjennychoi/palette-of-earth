import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import paletteOfEarthTheme from '../../styles/themes/palette-of-earth.js';
import { DocumentTitle, PageContainer, SectionTitle } from '../storybookDocumentation';
import ImageBlend from './ImageBlend.jsx';
import regions from '../../data/regions.js';

const darkDecorator = (Story) => (
  <ThemeProvider theme={paletteOfEarthTheme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

export default {
  title: 'Component/4. Media/ImageBlend',
  component: ImageBlend,
  tags: ['autodocs'],
  decorators: [darkDecorator],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0D0C0B' }] },
    docs: {
      description: {
        component: `
## ImageBlend

두 자연 이미지를 겹쳐 색이 발굴되는 5단계 애니메이션 컴포넌트.
Intersection Observer로 뷰포트 진입 시 1회 트리거되며, \`onReveal\` 콜백으로 ColorPalette 등장을 체인한다.
        `,
      },
    },
  },
  argTypes: {
    blendMode: {
      control: 'select',
      options: ['multiply', 'screen', 'overlay', 'soft-light', 'color-burn'],
      description: 'CSS mix-blend-mode',
    },
  },
};

const jeju = regions.find((r) => r.id === 'jeju');

export const Default = {
  args: {
    layer1: jeju.images.layer1,
    layer2: jeju.images.layer2,
    alt: '제주도 — 검은 현무암',
    blendMode: 'multiply',
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ImageBlend {...args} onReveal={() => console.log('revealed')} />
    </Box>
  ),
};

export const BlendModes = {
  render: () => {
    const modes = ['multiply', 'screen', 'overlay', 'soft-light'];
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          같은 이미지 쌍에 다른 mix-blend-mode를 적용한 비교. 실제 자연 사진으로 가장 적합한 값을 선택한다.
        </Typography>
        <Grid container spacing={2}>
          {modes.map((mode) => (
            <Grid key={mode} size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.secondary', fontFamily: '"DM Mono", monospace' }}>
                {mode}
              </Typography>
              <ImageBlend
                layer1={jeju.images.layer1}
                layer2={jeju.images.layer2}
                alt="제주도"
                blendMode={mode}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  },
};

export const AllRegions = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        5개 지역의 이미지 블렌드. 스크롤하면 뷰포트 진입 시 각각 애니메이션이 트리거된다.
      </Typography>
      <Stack spacing={3}>
        {regions.map((region) => (
          <Box key={region.id}>
            <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              {region.nameEn} — {region.element}
            </Typography>
            <Box sx={{ maxWidth: 700 }}>
              <ImageBlend
                layer1={region.images.layer1}
                layer2={region.images.layer2}
                alt={`${region.name} — ${region.element}`}
              />
            </Box>
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
        title="ImageBlend"
        status="Available"
        note="두 이미지 레이어 블렌드 애니메이션 — Intersection Observer · mix-blend-mode"
        brandName="Media"
        systemName="Palette of Earth"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>ImageBlend</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          레이어1(토양·암석)과 레이어2(물·식생)를 mix-blend-mode로 합성해
          색 팔레트가 발굴되는 느낌을 연출한다.
          뷰포트 진입 시 1회만 재생되고, 완료 후 <code>onReveal</code> 콜백으로 ColorPalette를 트리거한다.
        </Typography>

        <SectionTitle title="Props" />
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', '& th, & td': { p: 1.5, textAlign: 'left', borderBottom: '1px solid', borderColor: 'divider' }, '& th': { fontWeight: 600 } }}>
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>layer1</code></td><td>string</td><td>-</td><td>레이어1 이미지 src (토양·암석) [필수]</td></tr>
            <tr><td><code>layer2</code></td><td>string</td><td>-</td><td>레이어2 이미지 src (물·식생) [필수]</td></tr>
            <tr><td><code>alt</code></td><td>string</td><td>''</td><td>접근성 대체 텍스트</td></tr>
            <tr><td><code>onReveal</code></td><td>function</td><td>-</td><td>블렌드 완료 후 콜백 (팔레트 등장 트리거)</td></tr>
            <tr><td><code>blendMode</code></td><td>string</td><td>'multiply'</td><td>CSS mix-blend-mode 값</td></tr>
          </tbody>
        </Box>

        <SectionTitle title="애니메이션 시퀀스" />
        <Box component="pre" sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', p: 3, fontSize: 12, fontFamily: '"DM Mono", monospace', lineHeight: 1.8 }}>
{`뷰포트 진입 감지 (threshold: 0.3)
  └─ 0.0s  레이어1 fade-in 시작
  └─ 0.8s  레이어1 완료 → 레이어2 overlay fade-in 시작
  └─ 1.6s  레이어2 opacity 0.75 도달
  └─ 1.8s  onReveal() 호출 → ColorPalette 등장`}
        </Box>

        <SectionTitle title="5개 지역 실제 이미지" />
        <Grid container spacing={2}>
          {regions.map((region) => (
            <Grid key={region.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.secondary' }}>
                {region.nameEn}
              </Typography>
              <ImageBlend
                layer1={region.images.layer1}
                layer2={region.images.layer2}
                alt={region.name}
              />
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </>
  ),
};
