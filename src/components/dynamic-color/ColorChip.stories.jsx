import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import paletteOfEarthTheme from '../../styles/themes/palette-of-earth.js';
import { DocumentTitle, PageContainer, SectionTitle } from '../storybookDocumentation';
import ColorChip from './ColorChip.jsx';
import regions from '../../data/regions.js';

const darkDecorator = (Story) => (
  <ThemeProvider theme={paletteOfEarthTheme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

export default {
  title: 'Component/11. Dynamic Color/ColorChip',
  component: ColorChip,
  tags: ['autodocs'],
  decorators: [darkDecorator],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0D0C0B' }] },
    docs: {
      description: {
        component: `
## ColorChip

자연에서 추출한 색상을 표시하는 단일 칩 컴포넌트.
hover 시 HEX + RGB 툴팁, click 시 클립보드 복사 피드백을 제공한다.
        `,
      },
    },
  },
  argTypes: {
    color: { control: 'color', description: 'HEX 색상값' },
    name:  { control: 'text',  description: '색상 이름 (aria-label)' },
    size:  { control: 'select', options: ['sm', 'md'], description: '칩 크기' },
  },
};

export const Default = {
  args: { color: '#1C3D5A', name: '피오르드 블루', size: 'md' },
  render: (args) => (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <ColorChip {...args} onCopy={(c) => console.log('copied:', c)} />
    </Box>
  ),
};

export const Sizes = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" spacing={4} alignItems="flex-end">
        <Box sx={{ textAlign: 'center' }}>
          <ColorChip color="#C17B3E" size="sm" />
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>sm · 40px</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <ColorChip color="#C17B3E" size="md" />
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>md · 52px</Typography>
        </Box>
      </Stack>
    </Box>
  ),
};

export const AllRegionColors = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Stack spacing={5}>
        {regions.map((region) => (
          <Box key={region.id}>
            <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 2, letterSpacing: '0.12em' }}>
              {region.nameEn} — {region.name}
            </Typography>
            <Stack direction="row" spacing={2}>
              {region.palette.map((color) => (
                <Box key={color} sx={{ textAlign: 'center' }}>
                  <ColorChip color={color} name={`${region.name} 팔레트`} />
                  <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.disabled', fontFamily: '"DM Mono", monospace', fontSize: '0.625rem' }}>
                    {color.replace('#', '')}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  ),
};

export const CopyInteraction = {
  render: () => {
    const [lastCopied, setLastCopied] = useState('');
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          칩을 클릭하면 HEX값이 클립보드에 복사됩니다.
        </Typography>
        <Stack direction="row" spacing={2}>
          {['#1A1A1A', '#1C3D5A', '#5C6B73', '#3D5C38'].map((color) => (
            <ColorChip key={color} color={color} onCopy={setLastCopied} />
          ))}
        </Stack>
        {lastCopied && (
          <Typography variant="caption" sx={{ display: 'block', mt: 3, color: 'text.secondary', fontFamily: '"DM Mono", monospace' }}>
            마지막 복사: {lastCopied.toUpperCase()}
          </Typography>
        )}
      </Box>
    );
  },
};

export const Documentation = {
  render: () => (
    <>
      <DocumentTitle
        title="ColorChip"
        status="Available"
        note="자연색 칩 — hover 툴팁 · click 클립보드 복사"
        brandName="Dynamic Color"
        systemName="Palette of Earth"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>ColorChip</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          자연 팔레트의 단일 색상 칩. hover 시 HEX/RGB 툴팁, click 시 클립보드 복사 피드백.
        </Typography>

        <SectionTitle title="Props" />
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', '& th, & td': { p: 1.5, textAlign: 'left', borderBottom: '1px solid', borderColor: 'divider' }, '& th': { fontWeight: 600 } }}>
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>color</code></td><td>string</td><td>-</td><td>HEX 색상값 (필수)</td></tr>
            <tr><td><code>name</code></td><td>string</td><td>''</td><td>색상 이름 (aria-label)</td></tr>
            <tr><td><code>onCopy</code></td><td>function</td><td>-</td><td>복사 완료 콜백 (color 전달)</td></tr>
            <tr><td><code>size</code></td><td>'sm' | 'md'</td><td>'md'</td><td>칩 크기 (sm: 40px, md: 52px)</td></tr>
          </tbody>
        </Box>

        <SectionTitle title="모든 지역 팔레트" description="5개 지역에서 추출한 팔레트 색상들." />
        <Stack spacing={5}>
          {regions.map((region) => (
            <Box key={region.id}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                {region.nameEn} — {region.element}
              </Typography>
              <Stack direction="row" spacing={2}>
                {region.palette.map((color) => (
                  <Box key={color} sx={{ textAlign: 'center' }}>
                    <ColorChip color={color} />
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.disabled', fontFamily: '"DM Mono", monospace', fontSize: '0.625rem' }}>
                      {color.replace('#', '')}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>

        <SectionTitle title="Usage" />
        <Box component="pre" sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', p: 3, fontSize: 13, fontFamily: '"DM Mono", monospace', overflow: 'auto', lineHeight: 1.7 }}>
{`import ColorChip from '@/components/dynamic-color/ColorChip';

// 기본
<ColorChip color="#1C3D5A" />

// 복사 콜백 포함
<ColorChip
  color="#1C3D5A"
  name="피오르드 블루"
  onCopy={(hex) => showToast(hex)}
  size="sm"
/>`}
        </Box>
      </PageContainer>
    </>
  ),
};
