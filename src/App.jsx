import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PaletteOfEarth from './pages/PaletteOfEarth.jsx';
import PhotoGallery from './pages/PhotoGallery.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PaletteOfEarth />} />
        <Route path="/gallery" element={<PhotoGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
