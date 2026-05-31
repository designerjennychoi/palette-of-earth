/**
 * ProgressNav 컴포넌트
 *
 * 우측 고정 세로 도트 내비게이션. 현재 섹션 활성화 + 클릭 시 해당 섹션으로 스크롤.
 *
 * Props:
 * @param {Array}  sections      - { id, label, color } 배열 [Required]
 * @param {string} activeId      - 현재 활성 섹션 id [Required]
 * @param {function} onDotClick  - 도트 클릭 시 호출 (id 전달) [Optional]
 *
 * Example usage:
 * <ProgressNav sections={navSections} activeId={activeRegion} />
 */

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { motion, AnimatePresence } from 'framer-motion';

function ProgressNav({ sections = [], activeId, onDotClick }) {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    onDotClick?.(id);
  };

  return (
    <Box
      component="nav"
      aria-label="섹션 내비게이션"
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 32 },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      {sections.map(({ id, label, color }) => {
        const isActive = id === activeId;

        return (
          <Tooltip key={id} title={label} placement="left" arrow>
            <Box
              component="button"
              onClick={() => handleClick(id)}
              aria-label={label}
              aria-current={isActive ? 'true' : undefined}
              sx={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 28,
              }}
            >
              <Box
                component={motion.div}
                animate={
                  isActive
                    ? { width: 4, height: 24, borderRadius: '2px', backgroundColor: color || '#F0EBE3' }
                    : { width: 6, height: 6, borderRadius: '50%', backgroundColor: '#504D49' }
                }
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ backgroundColor: '#8A8278', scale: 1.2 }}
                sx={{ flexShrink: 0 }}
              />
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}

export default ProgressNav;
