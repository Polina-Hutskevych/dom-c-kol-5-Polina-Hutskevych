import React from 'react';
import './FilterItems.css';

function FilterItems({ filter, setFilter,  translations  }) {
    return (
        <div className="filter-items">
            <button 
                onClick={() => setFilter('notCompleted')} 
                className={`filter-button ${filter === 'notCompleted' ? 'active' : ''}`}
            >
                {translations.showNotCompleted}
                {filter === 'notCompleted' && (
                    <span onClick={() => setFilter('all')} className="clear-filter">✕</span>
                )}
            </button>

            <button 
                onClick={() => setFilter('completed')} 
                className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            >
                {translations.showCompleted}
                {filter === 'completed' && (
                    <span onClick={() => setFilter('all')} className="clear-filter">✕</span>
                )}
            </button>

            <button 
        
                onClick={() => setFilter('all')} 
                className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            >
                {translations.showAll}
            </button>
        </div>
    );
}

export default FilterItems;


