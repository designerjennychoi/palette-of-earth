import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import paletteOfEarthTheme from '../../styles/themes/palette-of-earth.js';
import { DocumentTitle, PageContainer, SectionTitle } from '../storybookDocumentation';
import ColorToast from './ColorToast.jsx';
import regions from '../../data/regions.js';

const darkDecorator = (Story) => (
  <ThemeProvider theme={paletteOfEarthTheme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

export default {
  title: 'Component/9. Overlay & Feedback/ColorToast',
  component: ColorToast,
  tags: ['autodocs'],
  decorators: [darkDecorator],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0D0C0B' }] },
  },
  argTypes: {
    color:  { control: 'color',   description: '복사된 HEX 색상값' },
    isOpen: { control: 'boolean', description: '토스트 표시 여부' },
  },
};

export const Default = {
  args: { color: '#1C3D5A', isOpen: true },
};

export const Interactive = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState('#1C3D5A');
    const colors = regions.flatMap((r) => r.palette);

    const triggerRandom = () => {
      setColor(colors[Math.floor(Math.random() * colors.length)]);
      setOpen(true);
    };

    return (
      <Box sx={{ p: 4, minHeight: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          버튼을 클릭해 랜덤 팔레트 색상의 복사 토스트를 확인하세요.
        </Typography>
        <Box
          component="button"
          onClick={triggerRandom}
          sx={{ alignSelf: 'flex-start', px: 3, py: 1.5, bgcolor: 'background.paper', color: 'text.primary', border: '1px solid', borderColor: 'divider', cursor: 'pointer' }}
        >
          랜덤 색상 복사
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 1 }}>
          {colors.map((c) => (
            <Box
              key={c}
              component="button"
              onClick={() => { setColor(c); setOpen(true); }}
              sx={{ width: 36, height: 36, bgcolor: c, border: 'none', cursor: 'pointer', borderRadius: '3px' }}
            />
          ))}
        </Box>
        <ColorToast color={color} isOpen={open} onClose={() => setOpen(false)} />
      </Box>
    );
  },
};

export const Documentation = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <DocumentTitle
          title="ColorToast"
          status="Available"
          note="HEX 복사 피드백 — 하단 pill 스낵바, 2초 자동 소멸"
          brandName="Overlay & Feedback"
          systemName="Palette of Earth"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>ColorToast</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            ColorChip 클릭 시 HEX값 복사를 알리는 pill 형태 토스트.
            화면 하단 중앙 고정, 2초 후 자동 소멸.
          </Typography>

          <SectionTitle title="Props" />
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', '& th, & td': { p: 1.5, textAlign: 'left', borderBottom: '1px solid', borderColor: 'divider' }, '& th': { fontWeight: 600 } }}>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>color</code></td><td>string</td><td>-</td><td>복사된 HEX 색상값 (필수)</td></tr>
              <tr><td><code>isOpen</code></td><td>boolean</td><td>-</td><td>토스트 표시 여부 (필수)</td></tr>
              <tr><td><code>onClose</code></td><td>function</td><td>-</td><td>소멸 후 호출 콜백</td></tr>
            </tbody>
          </Box>

          <SectionTitle title="데모" description="버튼을 클릭해 토스트를 확인하세요." />
          <Stack direction="row" spacing={2}>
            {['#1A1A1A', '#1C3D5A', '#C17B3E', '#6A8E8A', '#D8E8E4'].map((c) => (
              <Box
                key={c}
                component="button"
                onClick={() => { setOpen(true); }}
                sx={{ width: 44, height: 44, bgcolor: c, border: 'none', cursor: 'pointer', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
              />
            ))}
          </Stack>
          <ColorToast color="#1C3D5A" isOpen={open} onClose={() => setOpen(false)} />
        </PageContainer>
      </>
    );
  },
};
