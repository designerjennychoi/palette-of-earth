export const regions = [
  {
    id: 'jeju',
    name: 'Jeju',
    nameEn: 'Jeju',
    element: 'Black Basalt',
    description: 'Volcanic island of raw contrast — where black lava meets deep blue sea',
    images: {
      layer1: '/images/regions/jeju-basalt.jpg',
      layer2: '/images/regions/jeju-sea.jpg',
    },
    palette: ['#373431', '#6b6c6e', '#789dba', '#c3d5e6'],
    coords: { lat: 33.3, lng: 126.5 },
  },
  {
    id: 'norway',
    name: 'Norway',
    nameEn: 'Norway',
    element: 'Fjord Waters',
    description: 'Cold and clear tones of Northern Europe — the color of deep valleys and glacial rivers',
    images: {
      layer1: '/images/regions/norway-fjord.jpg',
      layer2: '/images/regions/norway-ice.jpg',
    },
    palette: ['#242e38', '#404a56', '#76a1da', '#cdd9e7'],
    coords: { lat: 61.0, lng: 8.0 },
  },
  {
    id: 'morocco',
    name: 'Morocco',
    nameEn: 'Morocco',
    element: 'Desert Sand',
    description: 'Warm earthy tones of the African continent — a palette shaped by sand and ochre',
    images: {
      layer1: '/images/regions/morocco-sand.jpg',
      layer2: '/images/regions/morocco-earth.jpg',
    },
    palette: ['#2d2827', '#533e31', '#9f683f', '#ebb58a'],
    coords: { lat: 31.7, lng: -7.1 },
  },
  {
    id: 'newzealand',
    name: 'New Zealand',
    nameEn: 'New Zealand',
    element: 'Alpine Lakes',
    description: 'Fresh and clear colors of the southern hemisphere — sulphur lakes and ancient forests',
    images: {
      layer1: '/images/regions/nz-lake.jpg',
      layer2: '/images/regions/nz-forest.jpg',
    },
    palette: ['#161c1f', '#4b5945', '#8a9ea0', '#d4e3dc'],
    coords: { lat: -41.3, lng: 174.8 },
  },
  {
    id: 'iceland',
    name: 'Iceland',
    nameEn: 'Iceland',
    element: 'Black Lava',
    description: 'Where volcanoes meet glaciers — the most raw and dramatic palette on earth',
    images: {
      layer1: '/images/regions/iceland-lava.jpg',
      layer2: '/images/regions/iceland-glacier.jpg',
    },
    palette: ['#08101b', '#a03826', '#88b2d4', '#d2deec'],
    coords: { lat: 64.9, lng: -18.0 },
  },
];

export const getRegionById = (id) => regions.find((r) => r.id === id) || null;

export default regions;
