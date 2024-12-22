import React, { useState, useEffect } from 'react';
import ShoppingList from './ShoppingList';
 import ShoppingListOverview from './ShoppingListOverview';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import { translations } from './translation';
import LanguageSwitch from './LanguageSwitch';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); 

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <div>
        <LanguageSwitch onChangeLanguage={changeLanguage} /> 
        <button onClick={toggleTheme}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>

        <Routes>
          <Route
            path="/"
            element={
              <ShoppingListOverview
                translations={translations[language]} 
              />
            }
          />
          <Route
            path="/shopping-list/:id"
            element={
              <ShoppingList
                translations={translations[language]} 
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;