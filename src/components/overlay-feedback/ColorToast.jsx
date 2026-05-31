/**
 * ColorToast 컴포넌트
 *
 * HEX 복사 완료 피드백 스낵바. 화면 하단 중앙 고정, 2초 후 자동 소멸.
 *
 * Props:
 * @param {string}  color    - 복사된 HEX 색상값 [Required]
 * @param {boolean} isOpen   - 표시 여부 [Required]
 * @param {function} onClose - 소멸 후 호출 [Optional]
 *
 * Example usage:
 * <ColorToast color="#1A1A1A" isOpen={show} onClose={() => setShow(false)} />
 */

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ColorToast({ color, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => onClose?.(), 2000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          sx={{
            position: 'fixed',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1400,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2.5,
            py: 1.25,
            bgcolor: '#1A1917',
            border: '1px solid #2E2C28',
            borderRadius: '100px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {/* 색상 미리보기 점 */}
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: color,
              flexShrink: 0,
              boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
            }}
          />
          <Typography
            sx={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.8125rem',
              color: '#8A8278',
              letterSpacing: '0.02em',
            }}
          >
            Copied{' '}
            <Box component="span" sx={{ color: '#F0EBE3' }}>
              {color.toUpperCase()}
            </Box>
          </Typography>
        </Box>
      )}
    </AnimatePresence>
  );
}

export default ColorToast;
