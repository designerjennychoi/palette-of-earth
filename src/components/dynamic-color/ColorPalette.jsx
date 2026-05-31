/**
 * ColorPalette 컴포넌트
 *
 * 지역 색 팔레트 칩 그룹. ColorChip 4개 + HEX 레이블 + ColorToast 제어.
 * 각 칩은 Framer Motion으로 순차 fade-up 등장.
 *
 * Props:
 * @param {string[]} colors   - HEX 색상 배열 (3–4개) [Required]
 * @param {boolean}  isVisible - 등장 애니메이션 트리거 [Optional, 기본값: true]
 * @param {string}   size     - 칩 크기 'sm' | 'md' [Optional, 기본값: 'md']
 *
 * Example usage:
 * <ColorPalette colors={['#1A1A1A', '#1C3D5A', '#5C6B73', '#3D5C38']} isVisible={inView} />
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ColorChip from './ColorChip.jsx';
import ColorToast from '../overlay-feedback/ColorToast.jsx';

function ColorPalette({ colors = [], isVisible = true, size = 'md' }) {
  const [toastColor, setToastColor] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  const handleCopy = useCallback((color) => {
    setToastColor(color);
    setToastOpen(true);
  }, []);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 2 }, alignItems: 'flex-start' }}>
        <AnimatePresence>
          {isVisible &&
            colors.map((color, i) => (
              <Box
                key={color}
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
              >
                <ColorChip color={color} onCopy={handleCopy} size={size} />
                <Typography
                  sx={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.625rem',
                    color: '#504D49',
                    letterSpacing: '0.04em',
                    userSelect: 'none',
                  }}
                >
                  {color.replace('#', '').toUpperCase()}
                </Typography>
              </Box>
            ))}
        </AnimatePresence>
      </Box>

      <ColorToast color={toastColor} isOpen={toastOpen} onClose={handleToastClose} />
    </>
  );
}

export default ColorPalette;
