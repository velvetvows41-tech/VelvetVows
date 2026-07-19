import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

// Toast Notification helper
function Toast({ message, type, onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast--${type}`} role="alert">
      <span>{type === 'success' ? '✓' : '⚠️'}</span>
      <span>{message}</span>
    </div>
  );
}

// Upload zone component
function UploadZone({ onFiles, uploading }) {
  const fileInputRef = React.useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      onFiles(files);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      onFiles(files);
    }
  };

  return (
    <div
      className={`upload-zone ${isDragOver ? 'upload-zone--drag' : ''} ${uploading ? 'upload-zone--loading' : ''}`}
      onClick={() => !uploading && fileInputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label="Upload images — click or drag and drop"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {uploading ? (
        <>
          <div className="upload-spinner"></div>
          <p className="upload-label">Processing images…</p>
        </>
      ) : (
        <>
          <div className="upload-icon">{isDragOver ? '📂' : '🖼️'}</div>
          <h4 className="upload-heading">{isDragOver ? 'Drop to upload' : 'Click or drag images here'}</h4>
          <p className="upload-hint">JPG, PNG, WEBP · Multiple files OK</p>
        </>
      )}
    </div>
  );
}

// Current images grid manager
function ImagesGrid({ images, onDelete, onLabel, emptyMsg }) {
  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [previewImg, setPreviewImg] = useState(null);

  const startEdit = (img) => {
    setEditingId(img.id);
    setEditLabel(img.label || '');
  };

  const saveLabel = (id) => {
    if (editLabel.trim()) {
      onLabel(id, editLabel.trim());
    }
    setEditingId(null);
  };

  return (
    <>
      <div className="ig-grid" role="list">
        {images.length === 0 ? (
          <div className="ig-empty">
            <span>📷</span>
            <p>{emptyMsg}</p>
          </div>
        ) : (
          images.map((img, idx) => (
            <div className="ig-thumb" role="listitem" key={img.id}>
              <div className="ig-img-wrap" onClick={() => setPreviewImg(img)}>
                <img src={img.src} alt={img.label} loading="lazy" />
                <div className="ig-overlay" aria-hidden="true">
                  <span className="ig-zoom">🔍</span>
                </div>
              </div>
              <div className="ig-badge" aria-hidden="true">{idx + 1}</div>
              <button 
                className="ig-delete" 
                onClick={() => onDelete(img.id)}
                aria-label={`Delete ${img.label}`}
                title="Delete"
              >
                &times;
              </button>
              <div className="ig-label-row">
                {editingId === img.id ? (
                  <input
                    className="ig-label-input"
                    value={editLabel}
                    onChange={e => setEditLabel(e.target.value)}
                    onBlur={() => saveLabel(img.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveLabel(img.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    autoFocus
                    aria-label="Edit image label"
                  />
                ) : (
                  <span
                    className="ig-label"
                    onClick={() => startEdit(img)}
                    title="Click to edit label"
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && startEdit(img)}
                  >
                    {img.label || 'Untitled'}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {previewImg && (
        <div className="ig-lightbox" role="dialog" aria-modal="true" onClick={() => setPreviewImg(null)}>
          <button className="ig-lb-close" onClick={() => setPreviewImg(null)}>&times;</button>
          <img src={previewImg.src} alt={previewImg.label} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

// Dashboard Panel managing lists
function DashPanel({ type, title, icon, headerClass, images, onAdd, onDelete, onLabel, onClear, showToast }) {
  const [pendingImages, setPendingImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          // Maintain aspect ratio while sizing down if necessary
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 0.75 quality to drastically reduce payload size for serverless limits
          const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
          resolve(dataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files) => {
    setUploading(true);
    const loaded = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const compressedSrc = await compressImage(file);
        loaded.push({
          id: `${Date.now()}-${i}`,
          src: compressedSrc,
          label: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
        });
      } catch (err) {
        console.error('Failed to compress image:', err);
      }
    }
    
    setPendingImages(prev => [...loaded, ...prev]);
    setUploading(false);
  };

  const handlePublish = async () => {
    if (pendingImages.length === 0) return;
    const success = await onAdd(type, pendingImages);
    if (success) {
      showToast(`✓ ${pendingImages.length} image${pendingImages.length > 1 ? 's' : ''} published to ${title}!`, 'success');
      setPendingImages([]);
    } else {
      showToast(`❌ Failed to publish images. Please check the backend server logs.`, 'error');
    }
  };

  const handleRemovePending = (id) => {
    setPendingImages(prev => prev.filter(img => img.id !== id));
  };

  const handleUpdatePendingLabel = (id, newLabel) => {
    setPendingImages(prev => prev.map(img => img.id === id ? { ...img, label: newLabel } : img));
  };

  const handleDeleteCurrent = async (id) => {
    if (window.confirm('Remove this image?')) {
      await onDelete(type, id);
      showToast('Image removed.', 'success');
    }
  };

  const handleClearAll = async () => {
    if (window.confirm(`Clear ALL ${images.length} images from ${title}?`)) {
      await onClear(type);
      showToast(`${title} cleared.`, 'success');
    }
  };

  return (
    <div className="dash-panel">
      <div className={`dash-panel-header ${headerClass}`}>
        <div className="dash-panel-title">
          <span>{icon}</span>
          <h3>{title}</h3>
        </div>
        <div className="dash-panel-meta">
          <span className="dash-count-badge">{images.length} images</span>
          {images.length > 0 && (
            <button className="dash-clear-btn" onClick={handleClearAll}>Clear all</button>
          )}
        </div>
      </div>

      <div className="dash-panel-body">
        <div className="dash-step-label">STEP 1 — Select images</div>
        <UploadZone onFiles={handleFiles} uploading={uploading} />

        {pendingImages.length > 0 && (
          <div className="dash-pending">
            <div className="dash-pending-header">
              <span className="dash-pending-label">
                {pendingImages.length} image{pendingImages.length > 1 ? 's' : ''} ready
              </span>
              <button className="dash-pending-clear" onClick={() => setPendingImages([])}>✕ Clear</button>
            </div>
            <div className="dash-pending-row">
              {pendingImages.map(img => (
                <div className="dash-pending-item" key={img.id}>
                  <div className="dash-pending-thumb">
                    <img src={img.src} alt={img.label} />
                    <button className="dash-pending-remove" onClick={() => handleRemovePending(img.id)}>&times;</button>
                  </div>
                  <input
                    type="text"
                    className="dash-pending-input"
                    placeholder="Add label..."
                    value={img.label || ''}
                    onChange={(e) => handleUpdatePendingLabel(img.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button className="dash-publish-btn" onClick={handlePublish}>
              ✦ PUBLISH {pendingImages.length} IMAGE{pendingImages.length > 1 ? 's' : ''} TO {title.toUpperCase()}
            </button>
          </div>
        )}

        <div className="dash-current-label">CURRENT IMAGES ({images.length})</div>
        <ImagesGrid
          images={images}
          onDelete={handleDeleteCurrent}
          onLabel={(id, label) => {
            onLabel(type, id, label);
            showToast('Label updated!', 'success');
          }}
          emptyMsg={`No ${title.toLowerCase()} images yet — upload some above.`}
        />
      </div>
    </div>
  );
}

// Youtube config panel
function YoutubePanel({ url, onSave, showToast }) {
  const [inputUrl, setInputUrl] = useState(url);

  // Helper to validate video
  const validateUrl = (val) => {
    if (!val.trim()) return true;
    // check for standard youtube parameters
    return /youtube\.com|youtu\.be/i.test(val);
  };

  const handleSave = () => {
    if (validateUrl(inputUrl)) {
      onSave(inputUrl);
      showToast(inputUrl.trim() ? '✓ YouTube video saved!' : 'YouTube video cleared.', 'success');
    } else {
      showToast('❌ Could not recognise a YouTube URL. Please try again.', 'error');
    }
  };

  const youtubeId = (val => {
    if (!val) return null;
    const c = val.trim();
    const u = c.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/);
    if (u) return u[1];
    const f = c.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    if (f) return f[1];
    const p = c.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
    if (p) return p[1];
    return /^[A-Za-z0-9_-]{11}$/.test(c) ? c : null;
  })(url);

  return (
    <div className="yt-panel">
      <div className="yt-panel-header">
        <div className="yt-panel-title">
          <span>🎬</span>
          <h3>YouTube Video</h3>
        </div>
      </div>

      <div className="yt-panel-body">
        <p className="yt-hint">
          Set the background video for the highlights section on the home page. Paste a standard YouTube link below.
        </p>

        <div className="yt-input-row">
          <input
            type="text"
            className="yt-input"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            placeholder="e.g. https://www.youtube.com/watch?v=PehgmzwIYKw"
          />
          <button className="yt-save-btn" onClick={handleSave}>Save Video</button>
        </div>

        {youtubeId ? (
          <div className="yt-preview">
            <div className="yt-preview-label">
              <span>✓ ACTIVE VIDEO PREVIEW</span>
              <a 
                href={`https://www.youtube.com/watch?v=${youtubeId}`} 
                target="_blank" 
                rel="noreferrer" 
                className="yt-watch-link"
              >
                Watch on YouTube
              </a>
            </div>
            <div className="yt-iframe-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                title="Preview"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="yt-empty">
            <span>🎬</span>
            <p>No video set — paste a YouTube URL above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Enquiries panel (MERN Premium Feature)
function EnquiriesPanel({ enquiries, onDelete, showToast }) {
  const handleDelete = async (id) => {
    if (window.confirm('Delete this contact enquiry?')) {
      await onDelete(id);
      showToast('Enquiry deleted.', 'success');
    }
  };

  return (
    <div className="dash-panel">
      <div className="dash-panel-header" style={{ background: 'linear-gradient(135deg, #6b4c2a, var(--brown))' }}>
        <div className="dash-panel-title">
          <span>✉️</span>
          <h3>Client Enquiries</h3>
        </div>
        <div className="dash-panel-meta">
          <span className="dash-count-badge">{enquiries.length} enquiries</span>
        </div>
      </div>

      <div className="dash-panel-body" style={{ padding: '0' }}>
        {enquiries.length === 0 ? (
          <div className="ig-empty" style={{ padding: '60px 20px' }}>
            <span>✉️</span>
            <p>No enquiries received yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(184,150,46,0.15)', background: '#faf7f2', color: 'var(--brown)', fontFamily: 'Cinzel, serif' }}>
                  <th style={{ padding: '16px 20px' }}>Client</th>
                  <th style={{ padding: '16px 20px' }}>Contact</th>
                  <th style={{ padding: '16px 20px' }}>Theme Interest</th>
                  <th style={{ padding: '16px 20px' }}>Message Details</th>
                  <th style={{ padding: '16px 20px', width: '80px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map(enq => (
                  <tr key={enq._id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', verticalAlign: 'top', color: 'var(--text)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 'bold' }}>{enq.name}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <a href={`mailto:${enq.email}`} style={{ display: 'block', color: 'var(--gold-dark)', textDecoration: 'none', marginBottom: '4px' }}>{enq.email}</a>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{enq.phone || 'No phone'}</span>
                    </td>
                    <td style={{ padding: '16px 20px', textTransform: 'capitalize' }}>
                      {enq.subject.replace('-', ' ')}
                    </td>
                    <td style={{ padding: '16px 20px', whiteSpace: 'pre-wrap', lineHeight: '1.5', maxWidth: '300px' }}>
                      {enq.message}
                      <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '8px' }}>
                        Submitted: {new Date(enq.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <button
                        onClick={() => handleDelete(enq._id)}
                        style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#c0392b' }}
                        title="Delete Enquiry"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const {
    logout,
    heroImages,
    galleryImages,
    serviceImages,
    youtubeUrl,
    enquiries,
    addImages,
    deleteImage,
    updateImageLabel,
    clearAll,
    saveYoutubeUrl,
    deleteEnquiry
  } = useAdmin();

  const [activeTab, setActiveTab] = useState('hero');
  const [toast, setToast] = useState(null);

  const triggerToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
  };

  const tabs = [
    { id: 'hero', label: 'Hero Slider', icon: '🎠', count: heroImages.length },
    { id: 'gallery', label: 'Gallery', icon: '🖼️', count: galleryImages.length },
    { id: 'services', label: 'Service Images', icon: '💍', count: serviceImages.length },
    { id: 'youtube', label: 'YouTube Video', icon: '🎬', count: null },
    { id: 'enquiries', label: 'Enquiries', icon: '✉️', count: enquiries.length }
  ];

  const panels = {
    hero: {
      type: 'hero',
      title: 'Hero Slider',
      icon: '🎠',
      headerClass: 'dash-panel-header--hero',
      images: heroImages
    },
    gallery: {
      type: 'gallery',
      title: 'Gallery',
      icon: '🖼️',
      headerClass: 'dash-panel-header--gallery',
      images: galleryImages
    },
    services: {
      type: 'services',
      title: 'Service Images',
      icon: '💍',
      headerClass: 'dash-panel-header--services',
      images: serviceImages
    }
  };

  return (
    <div className="admin-dashboard">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Topbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <img src="/images/logo.jpg" alt="Velvet Vows" className="admin-topbar-logo" />
          <div>
            <h1 className="admin-topbar-title">ADMIN PANEL</h1>
            <p className="admin-topbar-sub">Velvet Vows Wedding Planner</p>
          </div>
        </div>
        <div className="admin-topbar-right">
          <Link to="/" className="admin-view-site">
            <span>🌐</span> View Site
          </Link>
          <button className="admin-logout-btn" onClick={logout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </header>

      {/* Stats Summary cards */}
      <div className="admin-stats-row">
        {tabs.filter(t => t.count !== null).map(tab => (
          <div className="admin-stat-card" key={tab.id}>
            <span className="admin-stat-icon">{tab.icon}</span>
            <span className="admin-stat-num">{tab.count}</span>
            <span className="admin-stat-label">{tab.label}</span>
          </div>
        ))}
        <div className="admin-stat-card admin-stat-card--total">
          <span className="admin-stat-icon">📊</span>
          <span className="admin-stat-num">
            {heroImages.length + galleryImages.length + serviceImages.length}
          </span>
          <span className="admin-stat-label">Total DB Images</span>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="admin-tabs" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'admin-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            {tab.label}
            {tab.count !== null && (
              <span className="admin-tab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Panel body */}
      <div className="admin-panel-wrap">
        {activeTab === 'youtube' ? (
          <YoutubePanel
            url={youtubeUrl}
            onSave={saveYoutubeUrl}
            showToast={triggerToast}
          />
        ) : activeTab === 'enquiries' ? (
          <EnquiriesPanel
            enquiries={enquiries}
            onDelete={deleteEnquiry}
            showToast={triggerToast}
          />
        ) : (
          <DashPanel
            {...panels[activeTab]}
            onAdd={addImages}
            onDelete={deleteImage}
            onLabel={updateImageLabel}
            onClear={clearAll}
            showToast={triggerToast}
            key={activeTab}
          />
        )}
      </div>

      {/* Help Block */}
      <div className="admin-help">
        <h4>💡 How It Works</h4>
        <ul>
          <li>
            <strong>Hero Slider:</strong> Images show in the homepage slideshow. Seeding uploads them as real database records.
          </li>
          <li>
            <strong>Gallery:</strong> Images will display in the infinite scroll marquee gallery. Click labels to rename them.
          </li>
          <li>
            <strong>Enquiries:</strong> Submissions from the contact form are stored in MongoDB. Authenticated admins can view or remove them here.
          </li>
        </ul>
      </div>
    </div>
  );
}
