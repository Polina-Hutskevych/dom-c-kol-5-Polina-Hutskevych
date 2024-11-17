import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingListOverview.css'
import DeleteShoppingList from './DeleteShoppingList';
import AddShoppingList from './AddShoppingList';

const InitialData = [
  {
    id: '1',
    title: 'Grocery Planner',
  },
  {
    id: '2',
    title: 'Vegetables',
  }
  
];

function ShoppingListOverview() {

    const [shoppingLists, setShoppingLists] = useState(InitialData);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);  
    const [selectedList, setSelectedList] = useState(null);
  
    const openDeleteModal = (list) => {
      setSelectedList(list);
      setDeleteModalOpen(true);
    };
  
    const closeDeleteModal = () => {
      setDeleteModalOpen(false);
      setSelectedList(null);
    };
  
    const openAddModal = () => {
        setAddModalOpen(true); 
      };
    
      const closeAddModal = () => {
        setAddModalOpen(false);  
      };

    const deleteShoppingList = () => {
      setShoppingLists((prevLists) =>
        prevLists.filter((list) => list.id !== selectedList.id)
      );
      closeDeleteModal(); 
    };


    const addShoppingList = (newTitle) => {
        const newList = {
          id: (shoppingLists.length + 1).toString(),
          title: newTitle,
        };
        setShoppingLists((prevLists) => [...prevLists, newList]);
      };

  return (
<div className="shopping-lists-overview">
      <h1 className="shopping-list-title">My Shopping Lists</h1>
      <button className="add-list-button" onClick={openAddModal}>
        Add Shopping List
      </button>
      <div className="shopping-list-container">
        {shoppingLists.map((list) => (
          <div key={list.id} className="shopping-list-item">
            <Link to={`/shopping-list/${list.id}`}>
              <h2>{list.title}</h2>
            </Link>
            <button
              onClick={() => openDeleteModal(list)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {isDeleteModalOpen && (
        <DeleteShoppingList
          onClose={closeDeleteModal}
          onDelete={deleteShoppingList}
          listTitle={selectedList.title}
        />
      )}

{isAddModalOpen && (
        <AddShoppingList
          onClose={closeAddModal}
          onAdd={addShoppingList}
        />
      )}

    </div>
  );
}

export default ShoppingListOverview;
