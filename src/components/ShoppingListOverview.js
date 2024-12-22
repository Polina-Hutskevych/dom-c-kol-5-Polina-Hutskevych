import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingListOverview.css';
import DeleteShoppingList from './DeleteShoppingList';
import AddShoppingList from './AddShoppingList';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const InitialData = [
  {
    id: '1',
    title: 'Grocery Planner',
    items: [
      { id: 1, name: 'Milk', resolved: false },
      { id: 2, name: 'Bread', resolved: true },
      { id: 3, name: 'Eggs', resolved: false },
      { id: 4, name: 'Meat', resolved: false },
    ],
  },
  {
    id: '2',
    title: 'Vegetables',
    items: [
      { id: 1, name: 'Carrot', resolved: false },
      { id: 2, name: 'Potatoes', resolved: true },
      { id: 3, name: 'Lettuce', resolved: true },
    ],
  },
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
      items: [],
    };
    setShoppingLists((prevLists) => [...prevLists, newList]);
  };

  const itemCounts = shoppingLists.map((list) => ({
    name: list.title,
    itemCount: list.items.length,
  }));

  return (
    <div className="shopping-lists-overview">
      <h1 className="shopping-list-title">My Shopping Lists</h1>
      <button className="add-list-button" onClick={openAddModal}>
        Add Shopping List
      </button>

      <div className="bar-chart-container">
  <h3>Shopping List Item Counts</h3>
  <BarChart width={300} height={200} data={itemCounts}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="itemCount" fill="#8884d8" />
  </BarChart>
</div>

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