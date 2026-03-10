import { useState } from 'react'
import Builder from './pages/Builder'
import History from './pages/History'
import Header from './components/Header'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('builder')
  const [loadedDocument, setLoadedDocument] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavigate = (page) => {
    setCurrentPage(page)
    if (page === 'builder' && !loadedDocument) {
      // Reset to new document
      setLoadedDocument(null)
    }
  }

  const handleLoadDocument = (doc) => {
    setLoadedDocument(doc)
  }

  return (
    <div className="app">
      <Header 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        onMenuToggle={() => setSidebarOpen(true)}
      />
      {currentPage === 'builder' ? (
        <Builder 
          loadedDocument={loadedDocument}
          onClearDocument={() => setLoadedDocument(null)}
          sidebarOpen={sidebarOpen}
          onCloseSidebar={() => setSidebarOpen(false)}
        />
      ) : (
        <History 
          onNavigate={handleNavigate}
          onLoadDocument={handleLoadDocument}
        />
      )}
    </div>
  )
}

export default App
