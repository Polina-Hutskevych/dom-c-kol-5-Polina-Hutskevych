// import React, { useState } from 'react';
// import './AddShoppingList.css'

// function AddShoppingList({ onClose, onAdd }) {
//     const [listName, setListName] = useState('');
  
//     const handleSubmit = () => {
//       if (listName.trim()) {
//         onAdd(listName);  
//         onClose();  
//       }
//     };
//   return (
//     <div className="add-modal-overlay">
//       <div className="add-modal">
//         <h3>Add a New Shopping List</h3>
//         <input
//           type="text"
//           value={listName}
//           onChange={(e) => setListName(e.target.value)}
//           placeholder="Enter list name"
//           className="add-input"
//         />
//         <div className="modal-buttons">
//           <button onClick={handleSubmit} className="confirm-button">
//             Add List
//           </button>
//           <button onClick={onClose} className="cancel-button">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddShoppingList;

import React, { useState } from 'react';
import './AddShoppingList.css';
import { translations } from './translation'; // Import translations

function AddShoppingList({ onClose, onAdd }) { // Removed translations prop
  const [listName, setListName] = useState('');
  
  const handleSubmit = () => {
    if (listName.trim()) {
      onAdd(listName);  
      onClose();  
    }
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal">
        <h3>{translations.addShoppingList}</h3> {/* Translated title */}
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder={translations.newListName} 
          className="add-input"
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit} className="confirm-button">
            {translations.addList} {/* Translated button */}
          </button>
          <button onClick={onClose} className="cancel-button">
            {translations.cancel} {/* Translated button */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddShoppingList;