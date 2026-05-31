/**
 * Media Components
 *
 * 미디어 관련 컴포넌트 모음
 * 이미지, 비디오 등 다양한 미디어 처리 컴포넌트를 제공
 */

// AspectMedia - 고정 비율 이미지/비디오
export { default as AspectMedia } from './AspectMedia.jsx';

// ImageTransition - 인덱스 기반 이미지 트랜지션
export { ImageTransition } from './ImageTransition.jsx';

// ImageCarousel - 이미지 캐러셀 + 인디케이터
export { ImageCarousel } from './ImageCarousel.jsx';

// Indicator - 범용 인디케이터 (common/ui에서 재노출)
export { Indicator } from '../../common/ui/Indicator.jsx';

// CarouselIndicator - 레거시 호환용 (Indicator 사용 권장)
export { CarouselIndicator } from './CarouselIndicator.jsx';

// ImageBlend - 두 이미지 레이어 블렌드 애니메이션
export { default as ImageBlend } from './ImageBlend.jsx';

// GlobeD3 - d3-geo 정사영 SVG 지구본 (자동 회전 · 드래그 · hover 색상 칩)
export { default as GlobeD3 } from './GlobeD3.jsx';
