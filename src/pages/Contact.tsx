import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="animate-fade-in section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Collaborate</span>
          <h1 className="section-title">Consultation Inquiries</h1>
          <div className="section-divider"></div>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          <div className="contact-info-col">
            <h2>Let's engineer your power solution.</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Whether you need utility-scale solar block layouts, Single Line Diagrams (SLDs), PVSyst yield simulations, DC/AC cabling optimizations, or on-site MEPF project management, I am equipped to design, optimize, and document your electrical engineering needs.
            </p>

            {/* Service Availability Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
              <span className="skill-badge expert">Available for Design Review</span>
              <span className="skill-badge expert">As-Built Drawings</span>
              <span className="skill-badge expert">PEC Compliance Check</span>
            </div>

            <div className="contact-details" style={{ marginBottom: '2.5rem' }}>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <div className="contact-text">
                  <h5>Office Coordinates</h5>
                  <p>Las Piñas City, Metro Manila, Philippines</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="contact-text">
                  <h5>Direct Mobile Liaison</h5>
                  <p>+63 997 364 7886</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-text">
                  <h5>Electronic Mail</h5>
                  <p>jeanbenazirb@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Character References Section */}
            <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '1.5rem', fontFamily: 'var(--serif)' }}>Professional References</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <h5 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Engr. Jennylene Baluyot</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Plant Manager, BulacanSol &middot; MGen Renewable Energy</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Contact: 0927 895 5849</p>
                </div>
                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <h5 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Engr. Carlito Derije</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>EDD Manager, Cornersteel Systems Corp.</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Contact: 0998 557 8490</p>
                </div>
                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <h5 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Engr. Marrion M. Marteja</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Lead MEPF, DMCI Homes</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Contact: 0935 428 6844</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-col offset-border-frame">
            <h3 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'left' }}>
              Project Scope RFP
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Client Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="form-control"
                  placeholder="e.g. Alexander Wright"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Interface *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="form-control"
                  placeholder="e.g. client@solarprojects.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Solar Project / Scope</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder="e.g. 528kWp Rooftop PV Installation"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Parameters & Target Metrics *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="form-control"
                  placeholder="List your target capacity (kWp), rooftop area, shading constraints, grid-tied/hybrid needs, and required engineering deliverables..."
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem' }}
              >
                {isSubmitting ? 'Transmitting RFP...' : 'Transmit Project RFP'}
              </button>

              {submitStatus === 'success' && (
                <div className="form-status-message form-status-success animate-fade-in">
                  ✓ Specifications received. I will review the electrical scope and get back to you shortly.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-status-message" style={{ background: 'rgba(231, 76, 60, 0.15)', border: '1px solid #e74c3c', color: '#e74c3c' }}>
                  ✗ Signal Interrupted: Please fill in all required (*) coordinate fields.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
