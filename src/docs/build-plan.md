# 「Palette of Earth」구현 계획

**마지막 업데이트:** 2026.05.29
**기반 문서:** `plan.md`, `ux.md`, `visual-direction.md`

---

## 전제 결정사항

| 항목 | 결정 | 이유 |
|------|------|------|
| 지구본 vs 지도 | **Three.js 지구본** (데스크톱) + **SVG 세계지도** (모바일 fallback) | 모바일 Three.js 성능 위험 분리 |
| 스타일링 | **MUI sx** (기존 프로젝트 컨벤션 유지) | plan.md의 Tailwind 제안 → 프로젝트 룰 우선 |
| 색 비교 섹션 | **포함** (마지막 섹션) | 서사 완결감 제공 |
| TypeScript | **JSX 유지** (기존 프로젝트 `.jsx` 컨벤션) | |

---

## 추가 패키지

```bash
pnpm add three @react-three/fiber @react-three/drei  # 지구본
pnpm add framer-motion                                 # 이미 있을 가능성 높음
pnpm add color-thief-ts                                # 색 추출
```

---

## Phase 1 — 데이터 & 토대 (1일)

**목표:** 지역 데이터 구조 확정, 정적 뼈대 페이지 구성

```
src/data/regions.js        ← 지역별 팔레트·이미지·텍스트 데이터
src/styles/theme.js        ← (기존 테마에) 지역 팔레트 토큰 추가
public/images/regions/     ← 자연 사진 2장씩 (레이어1, 레이어2)
```

**regions.js 구조 예시:**

```js
export const regions = [
  {
    id: 'jeju',
    name: '제주도',
    nameEn: 'Jeju',
    element: '검은 현무암',
    description: '화산섬의 강렬한 색감',
    images: {
      layer1: '/images/regions/jeju-basalt.jpg',
      layer2: '/images/regions/jeju-sea.jpg',
    },
    palette: ['#1A1A1A', '#1C3D5A', '#5C6B73', '#3D5C38'],
  },
  // 노르웨이, 모로코, 뉴질랜드, 아이슬란드 ...
];
```

---

## Phase 2 — 핵심 컴포넌트 (2–3일)

개발 우선순위 순서:

### 1. `ColorChip` + `ColorPalette` (가장 단순, 먼저 완성)

- Hover → scale 1.12 + translateY -8px + 툴팁 (HEX/RGB)
- Click → 클립보드 복사 + `ColorToast` 피드백
- 파일: `src/components/dynamic-color/ColorChip.jsx`
- 파일: `src/components/dynamic-color/ColorPalette.jsx`

### 2. `ImageBlend` (핵심 비주얼)

- Intersection Observer로 뷰포트 진입 감지
- Framer Motion `useAnimation`으로 5단계 시퀀스 제어
- `mix-blend-mode: multiply` CSS로 레이어 합성
- 파일: `src/components/media/ImageBlend.jsx`

### 3. `RegionSection` (섹션 래퍼)

- 배경색 연동 (Context로 현재 지역 관리)
- 좌텍스트 40% + 우이미지 60% 비대칭 레이아웃 (MUI Grid)
- 파일: `src/components/layout/RegionSection.jsx`

### 4. `ProgressNav` (우측 고정 도트)

- `position: fixed`, right: 24px
- 현재 섹션 Intersection Observer로 추적
- 활성 도트: 지역 대표색 캡슐형 바로 전환
- 파일: `src/components/navigation/ProgressNav.jsx`

### 5. `ColorToast` (복사 피드백)

- 화면 하단 중앙 고정, 2초 후 자동 소멸
- 파일: `src/components/overlay-feedback/ColorToast.jsx`

---

## Phase 3 — Hero & 지구본 (2일)

### Globe 컴포넌트 (Three.js)

```
Idle:   자동 회전 (y축, ~30초/바퀴)
Hover:  지역 핀 hover → 해당 팔레트 색 하이라이트
Click:  팔레트 전체 색 전환 (2–3초 lerp) → scrollTo 해당 섹션
```

- 모바일 (<768px): Three.js Canvas 대신 SVG 세계지도 + 지역 마커 fallback
- MVP 지구본: 단색 구체(`#1A1917`) + 와이어프레임 격자 + 지역 핀만 표시 → 텍스처는 후순위
- 파일: `src/components/media/Globe.jsx`

### Hero 섹션 진입 애니메이션

1. 배경 fade-in (0 → 0.3s)
2. 지구본 scale-up + fade-in (0.3 → 1.0s)
3. CTA 텍스트 fade-up (0.8 → 1.3s)

---

## Phase 4 — 연결 & 마감 (1일)

- 배경색 전역 연동 (`RegionContext` → `currentRegion` state)
- 색 비교 섹션 (`ColorComparison`) — SVG 연결선 draw 애니메이션 (`stroke-dashoffset`)
- `prefers-reduced-motion` 분기 처리 전체 적용
- 이미지 lazy-load (`loading="lazy"` + blur placeholder)
- 모바일 터치 대응 (hover → tap, 롱프레스 500ms)
- 파일: `src/components/dynamic-color/ColorComparison.jsx`

---

## 디렉토리 구조 (신규 파일)

```
src/
├── components/
│   ├── media/
│   │   ├── Globe.jsx               # Three.js 지구본
│   │   └── ImageBlend.jsx          # 이미지 레이어 블렌드 애니메이션
│   ├── dynamic-color/
│   │   ├── ColorChip.jsx
│   │   ├── ColorPalette.jsx
│   │   └── ColorComparison.jsx
│   ├── navigation/
│   │   └── ProgressNav.jsx
│   ├── overlay-feedback/
│   │   └── ColorToast.jsx
│   └── layout/
│       └── RegionSection.jsx
├── data/
│   └── regions.js
└── pages/
    └── PaletteOfEarth.jsx          # 전체 페이지 조합
```

---

## 리스크 & 대응

| 리스크 | 대응 |
|--------|------|
| `mix-blend-mode` 자연 사진에서 예상과 다른 결과 | Phase 2 초반에 실제 이미지로 즉시 테스트, `screen`/`overlay` 등 값 탐색 |
| Three.js 지구본 구현 시간 초과 | MVP는 단색 구체 + 지역 마커만, 텍스처는 후순위 |
| 배경색 전환 시 텍스트 가독성 저하 | 팔레트 최밝은 색 대신 가장 어두운 색을 `opacity 0.08`로 배경에 사용 |
| 모바일 Canvas 성능 | 768px 미만에서 SVG 지도로 자동 fallback |

---

## 개발 시작 순서 (권장)

```
regions.js 데이터 작성
  → ColorChip
    → ColorPalette
      → ColorToast
        → ImageBlend (실제 이미지로 blend 테스트)
          → RegionSection
            → ProgressNav
              → Globe (Hero)
                → ColorComparison
                  → PaletteOfEarth (전체 조합)
```

Globe 없이도 지역 섹션 단위로 중간 결과를 브라우저에서 확인할 수 있어 피드백 루프가 빠르다.
