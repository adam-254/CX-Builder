import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <h1>Resume & Cover Letter Builder</h1>
      </div>
      <div className="header-right">
        <button className="btn-primary active">Builder</button>
        <button className="btn-secondary">History</button>
      </div>
    </header>
  )
}

export default Header
