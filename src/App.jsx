import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const storedTabs = JSON.parse(localStorage.getItem('tabs'));
    if (storedTabs) {
      setTabs(storedTabs);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  const dropTab = () => {
    if (window.chrome && window.chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (chromeTabs) => {
        const newTab = { id: Date.now(), url: chromeTabs[0].url, title: chromeTabs[0].title };
        setTabs([...tabs, newTab]);
      });
    } else {
      // Fallback for development
      const newTab = { id: Date.now(), url: `https://example.com/${Date.now()}`, title: `Example Tab ${Date.now()}` };
      setTabs([...tabs, newTab]);
    }
  };

  const emptyTub = () => {
    if (window.confirm("Are you sure you want to empty the tub?")) {
      setTabs([]);
    }
  };

  const deleteTab = (id) => {
    setTabs(tabs.filter(tab => tab.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src="/icons/icon_48x48.png" alt="Tab Tub" className="logo" />
        <h1>Tab Tub</h1>
      </header>
      <div className="button-group">
        <button onClick={dropTab} className="action-button">Drop Current Tab</button>
        <button onClick={emptyTub} className="action-button secondary">Empty Tub</button>
      </div>
      <main className="tub-container">
        {tabs.length === 0 ? (
          <p className="empty-message">Your tub is empty!</p>
        ) : (
          <ul className="tab-list">
            {tabs.map(tab => (
              <li key={tab.id} className="tab-item">
                <a href={tab.url} target="_blank" rel="noopener noreferrer" title={tab.url}>
                  <img src={`https://www.google.com/s2/favicons?domain=${tab.url}`} alt="" className="favicon"/>
                  <span className="tab-title">{tab.title}</span>
                </a>
                <button onClick={() => deleteTab(tab.id)} className="delete-button">
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
