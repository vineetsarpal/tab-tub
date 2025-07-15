import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    if (window.chrome && window.chrome.storage) {
      chrome.storage.sync.get(['tabs'], (result) => {
        if (result.tabs) {
          setTabs(result.tabs);
        }
      });

      const handleStorageChange = (changes, namespace) => {
        if (namespace === 'sync' && changes.tabs) {
          setTabs(changes.tabs.newValue);
        }
      };

      chrome.storage.sync.onChanged.addListener(handleStorageChange);

      return () => {
        chrome.storage.sync.onChanged.removeListener(handleStorageChange);
      };
    } else {
      const storedTabs = JSON.parse(localStorage.getItem('tabs'));
      if (storedTabs) {
        setTabs(storedTabs);
      }
    }
  }, []);

  useEffect(() => {
    if (window.chrome && window.chrome.storage) {
      chrome.storage.sync.set({ tabs: tabs });
    } else {
      localStorage.setItem('tabs', JSON.stringify(tabs));
    }
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

  const dropAllTabs = () => {
    if (window.chrome && window.chrome.tabs) {
      chrome.tabs.query({ currentWindow: true }, (chromeTabs) => {
        const existingUrls = new Set(tabs.map(tab => tab.url));
        const newTabsToAdd = chromeTabs
          .map(tab => ({ id: tab.id, url: tab.url, title: tab.title }))
          .filter(newTab => !existingUrls.has(newTab.url));
        setTabs([...tabs, ...newTabsToAdd]);
      });
    } else {
      // Fallback for development
      const newTabs = [
        { id: Date.now(), url: `https://example.com/${Date.now()}`, title: `Example Tab ${Date.now()}` },
        { id: Date.now() + 1, url: `https://example.com/${Date.now() + 1}`, title: `Example Tab ${Date.now() + 1}` },
      ];
      setTabs([...tabs, ...newTabs]);
    }
  };

  const deleteTab = (id) => {
    setTabs(tabs.filter(tab => tab.id !== id));
  };

  const emptyTub = () => {
    if (window.confirm("Are you sure you want to empty the tub?")) {
      setTabs([]);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src="/icons/icon_48x48.png" alt="TabTub" className="logo" />
        <h1>TabTub</h1>
      </header>
      <div className="top-buttons">
        <button onClick={dropTab} className="action-button full-width">Tub It</button>
      </div>
      <div className="button-group split-buttons">
        <button onClick={dropAllTabs} className="action-button">Tub 'em All</button>
        <button onClick={emptyTub} className="action-button secondary">Empty Tub</button>
      </div>
      <div className="tub-wrapper">
        <main className="tub-container">
        {tabs.length === 0 ? (
          <p className="empty-message">Your Tub is empty!</p>
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
      <img src="/icons/tub_only.png" alt="Tub" className="tub-image" />
    </div>
  );
}

export default App;
