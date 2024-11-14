import React, { useState, useEffect } from 'react';
import './App.css';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function App() {
  const [palette, setPalette] = useState([]);
  const [savedPalettes, setSavedPalettes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedPalettes'));
    if (saved) {
      setSavedPalettes(saved);
    }
  }, []);

  const generatePalette = () => {
    const newPalette = Array.from({ length: 5 }, () => generateRandomColor());
    setPalette(newPalette);
  };

  const savePalette = () => {
    if (palette.length > 0) {
      const updatedPalettes = [...savedPalettes, palette];
      setSavedPalettes(updatedPalettes);
      localStorage.setItem('savedPalettes', JSON.stringify(updatedPalettes));
    }
  };

  const deletePalette = (index) => {
    const updatedPalettes = savedPalettes.filter((_, i) => i !== index);
    setSavedPalettes(updatedPalettes);
    localStorage.setItem('savedPalettes', JSON.stringify(updatedPalettes));
  };

  return (
    <div className="App">
      <h1>Color Palette Generator</h1>
      <button onClick={generatePalette} className="generate-btn">Generate Palette</button>
      <div className="palette">
        {palette.map((color, index) => (
          <div key={index} className="color-block" style={{ backgroundColor: color }}>
            {color}
          </div>
        ))}
      </div>
      {palette.length > 0 && (
        <button onClick={savePalette} className="save-btn">Save Palette</button>
      )}
      <h2>Saved Palettes</h2>
      <div className="saved-palettes">
        {savedPalettes.map((savedPalette, index) => (
          <div key={index} className="saved-palette">
            {savedPalette.map((color, colorIndex) => (
              <div key={colorIndex} className="color-block" style={{ backgroundColor: color }}>
                {color}
              </div>
            ))}
            <button onClick={() => deletePalette(index)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
