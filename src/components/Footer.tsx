export default function Footer() {
  return (
    <footer className="footer" style={{ background: '#0A1931', color: '#ffffff', padding: '4rem 0 3rem', borderTop: 'none' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        
        {/* Left column: Brand & License */}
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 1rem', color: '#ffffff' }}>Jean</h3>
          <p style={{ color: '#a8cce8', fontSize: '0.85rem', margin: '0 0 0.25rem' }}>
            © {new Date().getFullYear()} Jean Benazir T. Buaya. All rights reserved.
          </p>
          <p style={{ color: '#a8cce8', fontSize: '0.85rem', margin: 0 }}>
            Registered Electrical Engineer.
          </p>
        </div>

        {/* Right column: Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '150px' }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#ffffff', margin: '0 0 0.5rem' }}>Links</h4>
          <a href="#" style={{ color: '#a8cce8', fontSize: '0.85rem', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#a8cce8', fontSize: '0.85rem', textDecoration: 'none' }}>Terms of Service</a>
          <a href="https://linkedin.com/in/jean-benazir" target="_blank" rel="noopener noreferrer" style={{ color: '#a8cce8', fontSize: '0.85rem', textDecoration: 'none' }}>LinkedIn</a>
        </div>

      </div>
    </footer>
  );
}
