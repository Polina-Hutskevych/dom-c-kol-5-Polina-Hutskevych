import React from 'react';
import ShoppingList from './ShoppingList';
import ShoppingListOverview from './ShoppingListOverview';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    // <div>
    //   <ShoppingList />
    // </div>

    <Router>
      <div>
        <Routes>
        <Route path="/" element={<ShoppingListOverview />} />
          <Route path="/shopping-list/:id" element={<ShoppingList />} />
          
        </Routes>
      </div>
    </Router>
  );
}
export default App;