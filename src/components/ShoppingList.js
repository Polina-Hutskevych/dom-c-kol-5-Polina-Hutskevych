import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import './ShoppingList.css';
import EditTitle from './EditTitle';
import InviteModal from './InviteModal';
import InvitedUsers from './InvitedUsers';
import DisplayItems from './DisplayItems';
import AddItem from './AddItem';
import FilterItems from './FilterItems';

const COLORS = ['#0088FE', '#FF8042'];

const InitialData = [
  {
    id: '1',
    title: 'Grocery Planner',
    owner: 'user',
    currentUser: 'user',
    invitedUsers: ['user2', 'user3'],
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
    owner: 'user',
    currentUser: 'user',
    invitedUsers: ['user4', 'user5'],
    items: [
      { id: 1, name: 'Carrot', resolved: false },
      { id: 2, name: 'Potatoes', resolved: true },
      { id: 3, name: 'Lettuce', resolved: true },
    ],
  },
];

function ShoppingList({ translations }) {  
  const { id } = useParams();
  const [shoppingList, setShoppingList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const list = InitialData.find((list) => list.id === id);
    setShoppingList(list || null);
  }, [id]);

  if (!shoppingList) {
    return <div>{translations.shoppingListNotFound}</div>;
  }

  const updateTitle = (newTitle) => {
    setShoppingList({ ...shoppingList, title: newTitle });
  };

  const canEdit = shoppingList.owner === shoppingList.currentUser;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleRemoveUser = (username) => {
    setShoppingList((prevList) => ({
      ...prevList,
      invitedUsers: prevList.invitedUsers.filter((user) => user !== username),
    }));
  };

  const handleLogout = () => {
    setShoppingList((prevList) => ({
      ...prevList,
      invitedUsers: prevList.invitedUsers.filter((user) => user !== shoppingList.currentUser),
    }));
  };

  const handleToggleItem = (id) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      ),
    }));
  };

  const handleDeleteItem = (id) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((item) => item.id !== id),
    }));
  };

  const handleAddItem = (itemName) => {
    const newItem = {
      id: shoppingList.items.length + 1,
      name: itemName,
      resolved: false,
    };
    setShoppingList((prevList) => ({
      ...prevList,
      items: [...prevList.items, newItem],
    }));
  };

  const applyFilter = (items) => {
    if (filter === 'notCompleted') {
      return items.filter((item) => !item.resolved);
    } else if (filter === 'completed') {
      return items.filter((item) => item.resolved);
    }
    return items;
  };

  const filteredItems = applyFilter(shoppingList.items);

  // Data for Pie Chart
  const resolvedCount = shoppingList.items.filter((item) => item.resolved).length;
  const unresolvedCount = shoppingList.items.length - resolvedCount;
  const pieData = [
    { name: translations.resolved, value: resolvedCount },
    { name: translations.unresolved, value: unresolvedCount },
  ];

  return (
    <section className="shopping-list-section">
      <EditTitle
        title={shoppingList.title}
        onTitleChange={updateTitle}
        canEdit={canEdit}
      />

      {shoppingList.owner === shoppingList.currentUser ? (
        <button onClick={handleOpenModal} className="invite-button">
          {translations.invite}
        </button>
      ) : (
        <button onClick={handleLogout} className="logout-button">
          {translations.logout}
        </button>
      )}
      {isModalOpen && <InviteModal onClose={handleCloseModal} />}
      <AddItem onAdd={handleAddItem} />
      <FilterItems filter={filter} setFilter={setFilter} translations={translations}/>
      <InvitedUsers
        invitedUsers={shoppingList.invitedUsers}
        isOwner={shoppingList.owner === shoppingList.currentUser}
        onRemoveUser={handleRemoveUser}
      />

      <div className="owner-display">
        <span>{translations.owner}: {shoppingList.owner}</span>
      </div>

      <DisplayItems
        items={filteredItems}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
      />

      <div className="vertical-line"></div>

      <div className="pie-chart-container">
        <h3>{translations.itemStatus}</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </section>
  );
}

export default ShoppingList;
