/**
 * ColorChip 컴포넌트
 *
 * 단일 색상 칩. hover 시 scale + 툴팁(HEX/RGB), click 시 클립보드 복사 피드백 전달.
 *
 * Props:
 * @param {string}   color      - HEX 색상값 (예: '#1A1A1A') [Required]
 * @param {string}   name       - 색상 이름 (aria-label, 툴팁 표시) [Optional]
 * @param {function} onCopy     - 복사 완료 시 호출 (color 값 전달) [Optional]
 * @param {string}   size       - 칩 크기 'sm' | 'md' (기본값: 'md') [Optional, 기본값: 'md']
 *
 * Example usage:
 * <ColorChip color="#1A1A1A" name="현무암 검정" onCopy={(c) => showToast(c)} />
 */

import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

/** HEX → {r, g, b} */
function hexToRgb(hex) {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(cleaned, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

const SIZE = {
  sm: { chip: 40, radius: '4px' },
  md: { chip: 52, radius: '6px' },
};

function ColorChip({ color, name = '', onCopy, size = 'md' }) {
  const [copied, setCopied] = useState(false);
  const { r, g, b } = hexToRgb(color);
  const dim = SIZE[size] || SIZE.md;

  const handleClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(color);
    } catch {
      // clipboard 접근 불가 환경에서도 onCopy 콜백은 실행
    }
    setCopied(true);
    onCopy?.(color);
    setTimeout(() => setCopied(false), 600);
  }, [color, onCopy]);

  const tooltipContent = (
    <Box sx={{ textAlign: 'center', lineHeight: 1.6 }}>
      <Typography
        component="span"
        sx={{
          display: 'block',
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.04em',
          color: '#F0EBE3',
        }}
      >
        {color.toUpperCase()}
      </Typography>
      <Typography
        component="span"
        sx={{
          display: 'block',
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.6875rem',
          color: '#8A8278',
        }}
      >
        {`rgb(${r}, ${g}, ${b})`}
      </Typography>
    </Box>
  );

  return (
    <Tooltip title={tooltipContent} placement="top" arrow>
      <Box
        component="button"
        onClick={handleClick}
        aria-label={`${name || color} — 클릭하면 HEX 복사`}
        sx={{
          width: dim.chip,
          height: dim.chip,
          bgcolor: color,
          borderRadius: dim.radius,
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
          position: 'relative',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease',
          transform: copied ? 'scale(0.94)' : 'scale(1)',
          '@media (hover: hover)': {
            '&:hover': {
              transform: 'scale(1.12) translateY(-6px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            },
          },
          '&:focus-visible': {
            outline: '2px solid #F0EBE3',
            outlineOffset: 2,
          },
        }}
      >
        {/* 복사 완료 체크 */}
        {copied && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'inherit',
              bgcolor: 'rgba(0,0,0,0.35)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8l3.5 3.5L13 4.5"
                stroke="#F0EBE3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        )}
      </Box>
    </Tooltip>
  );
}

export default ColorChip;
