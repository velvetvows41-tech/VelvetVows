import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

// Professional Line Icons for Admin Panel
const SliderIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const GalleryIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const ServicesIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const VideoIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const StatsIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const EnquiriesIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const CameraIcon = ({ size = 36, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const SearchIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const GlobeIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LogoutIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const TrashIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const InfoIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px', color: 'var(--gold)' }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

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
function ImagesGrid({ type, images, onDelete, onLabel, emptyMsg }) {
  const [editingImg, setEditingImg] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [previewImg, setPreviewImg] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Handle Escape key to close preview
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPreviewImg(null);
      }
    };
    if (previewImg) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewImg]);

  const startEdit = (img) => {
    setEditingImg(img);
    setEditLabel(img.label || '');
    setEditDescription(img.description || '');
  };

  const saveLabel = async () => {
    setIsSaving(true);
    const success = await onLabel(editingImg.id, editLabel.trim(), type === 'services' ? editDescription.trim() : undefined);
    setIsSaving(false);
    if (success !== false) {
      setEditingImg(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setDeletingId(id);
      await onDelete(id);
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="ig-grid" role="list">
        {images.length === 0 ? (
          <div className="ig-empty">
            <CameraIcon size={36} color="var(--gold-dark)" />
            <p>{emptyMsg}</p>
          </div>
        ) : (
          images.map((img, idx) => (
              <div className="ig-thumb" role="listitem" key={img.id}>
                <div className="ig-img-wrap" onClick={() => setPreviewImg(img)}>
                  <img src={img.src} alt={img.label} loading="lazy" />
                  <div className="ig-overlay" aria-hidden="true">
                    <span className="ig-zoom"><SearchIcon size={16} color="#fff" /></span>
                  </div>
                </div>
              <div className="ig-badge" aria-hidden="true">{idx + 1}</div>
              {!(type === 'hero' && (img.id === '1784374660326-hero' || img.src.includes('img-1784374660326-382082045.jpg'))) && (
                <button 
                  className="ig-delete" 
                  onClick={() => handleDelete(img.id)}
                  aria-label={`Delete ${img.label}`}
                  title="Delete"
                  disabled={deletingId === img.id}
                >
                  {deletingId === img.id ? '...' : '×'}
                </button>
              )}
              <div className="ig-label-row" onClick={() => startEdit(img)}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '4px 8px' }}>
                  <span
                    className="ig-label"
                    title="Click to edit label"
                    role="button"
                    tabIndex={0}
                    style={{ fontWeight: 'bold', display: 'block', cursor: 'pointer' }}
                  >
                    {img.label || 'Untitled'}
                  </span>
                  {type === 'services' && (
                    <p 
                      className="ig-desc-preview" 
                      style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px', cursor: 'pointer', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.2' }}
                      title="Click to edit description"
                    >
                      {img.description || 'No description provided.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editingImg && (
        <div className="edit-modal-overlay" role="dialog" aria-modal="true" onClick={() => setEditingImg(null)}>
          <div className="edit-modal-container" onClick={e => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>Edit Details</h3>
              <button className="edit-modal-close" onClick={() => setEditingImg(null)}>&times;</button>
            </div>
            <div className="edit-modal-body">
              <div className="edit-modal-preview">
                <img src={editingImg.src} alt="Preview" />
              </div>
              <div className="edit-modal-fields">
                <div className="edit-modal-field-group">
                  <label>Label / Title</label>
                  <input
                    type="text"
                    value={editLabel}
                    onChange={e => setEditLabel(e.target.value)}
                    placeholder="Enter label"
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveLabel();
                      if (e.key === 'Escape') setEditingImg(null);
                    }}
                    autoFocus
                  />
                </div>
                {type === 'services' && (
                  <div className="edit-modal-field-group">
                    <label>Description</label>
                    <textarea
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                      placeholder="Enter description"
                      rows={4}
                      onKeyDown={e => {
                        if (e.key === 'Escape') setEditingImg(null);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="edit-modal-footer">
              <button className="edit-modal-btn edit-modal-btn-cancel" onClick={() => setEditingImg(null)}>
                Cancel
              </button>
              <button className="edit-modal-btn edit-modal-btn-save" onClick={saveLabel} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {previewImg && (
        <div 
          className="ig-lightbox" 
          role="dialog" 
          aria-modal="true" 
          onClick={() => setPreviewImg(null)}
        >
          <button className="ig-lb-close" onClick={() => setPreviewImg(null)}>&times;</button>
          <img 
            src={previewImg.src} 
            alt={previewImg.label} 
            onClick={e => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
}

// Dashboard Panel managing lists
function DashPanel({ type, title, icon, headerClass, images, onAdd, onDelete, onLabel, onClear, showToast }) {
  const [pendingImages, setPendingImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);

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
          label: ''
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

    if (type === 'services') {
      const hasEmptyLabel = pendingImages.some(img => !img.label || !img.label.trim());
      if (hasEmptyLabel) {
        showToast('❌ Please specify a label for each service image.', 'error');
        return;
      }
    }

    setPublishing(true);
    const success = await onAdd(type, pendingImages);
    setPublishing(false);
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

  const handleUpdatePendingDescription = (id, newDesc) => {
    setPendingImages(prev => prev.map(img => img.id === id ? { ...img, description: newDesc } : img));
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
            <div className="dash-pending-list">
              {pendingImages.map(img => (
                <div className="dash-pending-card" key={img.id}>
                  <div className="dash-pending-card-aside">
                    <img src={img.src} alt="Pending preview" />
                    <button className="dash-pending-card-remove" onClick={() => handleRemovePending(img.id)}>✕ Remove</button>
                  </div>
                  <div className="dash-pending-card-fields">
                    <div className="dash-pending-field-group">
                      <label>Label</label>
                      <input
                        type="text"
                        placeholder="Add label..."
                        value={img.label || ''}
                        onChange={(e) => handleUpdatePendingLabel(img.id, e.target.value)}
                      />
                    </div>
                    {type === 'services' && (
                      <div className="dash-pending-field-group">
                        <label>Description</label>
                        <textarea
                          placeholder="Add description..."
                          value={img.description || ''}
                          onChange={(e) => handleUpdatePendingDescription(img.id, e.target.value)}
                          rows={2}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="dash-publish-btn" onClick={handlePublish} disabled={publishing}>
              {publishing ? '✦ PUBLISHING...' : `✦ PUBLISH ${pendingImages.length} IMAGE${pendingImages.length > 1 ? 's' : ''} TO {title.toUpperCase()}`}
            </button>
          </div>
        )}

        <div className="dash-current-label">CURRENT IMAGES ({images.length})</div>
        <ImagesGrid
          type={type}
          images={images}
          onDelete={handleDeleteCurrent}
          onLabel={async (id, label, description) => {
            const success = await onLabel(type, id, label, description);
            if (success) {
              showToast('Item updated!', 'success');
            }
            return success;
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
  const [isSaving, setIsSaving] = useState(false);

  // Helper to validate video
  const validateUrl = (val) => {
    if (!val.trim()) return true;
    // check for standard youtube parameters
    return /youtube\.com|youtu\.be/i.test(val);
  };

  const handleSave = async () => {
    if (validateUrl(inputUrl)) {
      setIsSaving(true);
      const success = await onSave(inputUrl);
      setIsSaving(false);
      if (success !== false) {
        showToast(inputUrl.trim() ? '✓ YouTube video saved!' : 'YouTube video cleared.', 'success');
      } else {
        showToast('❌ Failed to save video URL.', 'error');
      }
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
        <div className="yt-panel-title" style={{ display: 'flex', alignItems: 'center' }}>
          <VideoIcon size={20} color="var(--gold-dark)" />
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
          <button className="yt-save-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Video'}
          </button>
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
            <VideoIcon size={36} color="var(--muted)" />
            <p>No video set — paste a YouTube URL above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Stats values editing panel (MERN Premium Feature)
function StatsPanel({ stats, onSave, showToast }) {
  const [yearsOfGrace, setYearsOfGrace] = useState(stats.yearsOfGrace || '');
  const [eventsCrafted, setEventsCrafted] = useState(stats.eventsCrafted || '');
  const [happyClients, setHappyClients] = useState(stats.happyClients || '');
  const [citiesServed, setCitiesServed] = useState(stats.citiesServed || '');
  const [isSaving, setIsSaving] = useState(false);

  // Sync state with props
  useEffect(() => {
    setYearsOfGrace(stats.yearsOfGrace || '');
    setEventsCrafted(stats.eventsCrafted || '');
    setHappyClients(stats.happyClients || '');
    setCitiesServed(stats.citiesServed || '');
  }, [stats]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await onSave({
      yearsOfGrace,
      eventsCrafted,
      happyClients,
      citiesServed
    });
    setIsSaving(false);
    if (success) {
      showToast('✓ Story & Vision stats updated successfully!', 'success');
    } else {
      showToast('❌ Failed to update stats.', 'error');
    }
  };

  return (
    <div className="yt-panel">
      <div className="yt-panel-header" style={{ background: 'linear-gradient(135deg, #a88a38, var(--gold))' }}>
        <div className="yt-panel-title" style={{ display: 'flex', alignItems: 'center' }}>
          <StatsIcon size={20} color="var(--gold-dark)" />
          <h3>Our Story & Vision Stats</h3>
        </div>
      </div>

      <div className="yt-panel-body">
        <p className="yt-hint">
          Update the milestone counters displayed in the "Where Luxury Meets Tradition" section on the home page and about page.
        </p>

        <form onSubmit={handleSave} className="stats-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div className="stats-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brown)', fontFamily: 'Cinzel, serif' }}>Years of Grace</label>
              <input
                type="text"
                className="yt-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={yearsOfGrace}
                onChange={e => setYearsOfGrace(e.target.value)}
                placeholder="e.g. 2+"
              />
            </div>
            <div className="stats-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brown)', fontFamily: 'Cinzel, serif' }}>Events Crafted</label>
              <input
                type="text"
                className="yt-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={eventsCrafted}
                onChange={e => setEventsCrafted(e.target.value)}
                placeholder="e.g. 150+"
              />
            </div>
            <div className="stats-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brown)', fontFamily: 'Cinzel, serif' }}>Happy Clients</label>
              <input
                type="text"
                className="yt-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={happyClients}
                onChange={e => setHappyClients(e.target.value)}
                placeholder="e.g. 99%"
              />
            </div>
            <div className="stats-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brown)', fontFamily: 'Cinzel, serif' }}>Cities Served</label>
              <input
                type="text"
                className="yt-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={citiesServed}
                onChange={e => setCitiesServed(e.target.value)}
                placeholder="e.g. 12+"
              />
            </div>
          </div>
          <button type="submit" className="yt-save-btn" style={{ alignSelf: 'flex-start', padding: '10px 24px' }} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Stats'}
          </button>
        </form>
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
        <div className="dash-panel-title" style={{ display: 'flex', alignItems: 'center' }}>
          <EnquiriesIcon size={20} color="#fff" />
          <h3>Client Enquiries</h3>
        </div>
        <div className="dash-panel-meta">
          <span className="dash-count-badge">{enquiries.length} enquiries</span>
        </div>
      </div>

      <div className="dash-panel-body" style={{ padding: '0' }}>
        {enquiries.length === 0 ? (
          <div className="ig-empty" style={{ padding: '60px 20px' }}>
            <EnquiriesIcon size={36} color="var(--muted)" />
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
                    <td data-label="Client" style={{ padding: '16px 20px', fontWeight: 'bold' }}>{enq.name}</td>
                    <td data-label="Contact" style={{ padding: '16px 20px' }}>
                      <a href={`mailto:${enq.email}`} style={{ display: 'block', color: 'var(--gold-dark)', textDecoration: 'none', marginBottom: '4px' }}>{enq.email}</a>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{enq.phone || 'No phone'}</span>
                    </td>
                    <td data-label="Theme" style={{ padding: '16px 20px' }}>
                      <div style={{ textTransform: 'capitalize', fontWeight: '500', color: 'var(--brown)', marginBottom: '6px' }}>
                        {enq.subject ? enq.subject.replace('-', ' ') : 'General Enquiry'}
                      </div>
                      {enq.eventDate && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text)', marginBottom: '4px' }}>
                          <strong>Date:</strong> {enq.eventDate}
                        </div>
                      )}
                      {enq.location && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text)', marginBottom: '4px' }}>
                          <strong>Venue:</strong> {enq.location}
                        </div>
                      )}
                      {enq.guestCount && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text)' }}>
                          <strong>Guests:</strong> {enq.guestCount}
                        </div>
                      )}
                    </td>
                    <td data-label="Message" style={{ padding: '16px 20px', whiteSpace: 'pre-wrap', lineHeight: '1.5', maxWidth: '300px' }}>
                      {enq.message}
                      <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '8px' }}>
                        Submitted: {new Date(enq.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td data-label="Action" style={{ padding: '16px 20px' }}>
                      <button
                        onClick={() => handleDelete(enq._id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        title="Delete Enquiry"
                      >
                        <TrashIcon size={18} color="#c0392b" />
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

// Website Brand Copy editing panel (MERN Premium Feature)
function BrandTextPanel({ brandText, onSave, showToast }) {
  const [formData, setFormData] = useState({ ...brandText });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({ ...brandText });
  }, [brandText]);

  const handleChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await onSave(formData);
    setIsSaving(false);
    if (success) {
      showToast('✓ Brand texts updated successfully!', 'success');
    } else {
      showToast('❌ Failed to update brand texts.', 'error');
    }
  };

  return (
    <div className="yt-panel">
      <div className="yt-panel-header" style={{ background: 'linear-gradient(135deg, #2a080c, #160003)' }}>
        <div className="yt-panel-title" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>📝</span>
          <h3>Website Brand Copy & Texts</h3>
        </div>
      </div>

      <div className="yt-panel-body">
        <p className="yt-hint">
          Configure all the copy on the website dynamically. Changes will be reflected instantly on the Home Page and About Page.
        </p>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '16px' }}>
          {/* Section 1: Hero Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid rgba(184, 150, 46, 0.15)', paddingBottom: '20px' }}>
            <h4 style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-dark)', margin: '0 0 4px', fontSize: '0.95rem', letterSpacing: '1px' }}>1. Hero Banner Content</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Eyebrow Text</label>
                <input
                  type="text"
                  className="yt-input"
                  value={formData.heroEyebrow || ''}
                  onChange={e => handleChange('heroEyebrow', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Hero Title</label>
                <input
                  type="text"
                  className="yt-input"
                  value={formData.heroTitle || ''}
                  onChange={e => handleChange('heroTitle', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Hero Subtitle</label>
              <textarea
                className="yt-input"
                value={formData.heroSubtitle || ''}
                onChange={e => handleChange('heroSubtitle', e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', height: '60px', padding: '10px', resize: 'vertical' }}
              />
            </div>
          </div>

          {/* Section 2: Home Page About & Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid rgba(184, 150, 46, 0.15)', paddingBottom: '20px' }}>
            <h4 style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-dark)', margin: '0 0 4px', fontSize: '0.95rem', letterSpacing: '1px' }}>2. Home Intro ("Where Luxury Meets Tradition")</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>About Header Title</label>
              <input
                type="text"
                className="yt-input"
                value={formData.homeAboutTitle || ''}
                onChange={e => handleChange('homeAboutTitle', e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>About Subtitle Tagline</label>
              <textarea
                className="yt-input"
                value={formData.homeAboutTagline || ''}
                onChange={e => handleChange('homeAboutTagline', e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', height: '60px', padding: '10px', resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '6px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Philosophy Title</label>
                <input
                  type="text"
                  className="yt-input"
                  value={formData.homePhilosophyTitle || ''}
                  onChange={e => handleChange('homePhilosophyTitle', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Offerings Title</label>
                <input
                  type="text"
                  className="yt-input"
                  value={formData.homeOfferingsTitle || ''}
                  onChange={e => handleChange('homeOfferingsTitle', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Philosophy Description</label>
                <textarea
                  className="yt-input"
                  value={formData.homePhilosophyDesc || ''}
                  onChange={e => handleChange('homePhilosophyDesc', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', height: '100px', padding: '10px', resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Offerings Description</label>
                <textarea
                  className="yt-input"
                  value={formData.homeOfferingsDesc || ''}
                  onChange={e => handleChange('homeOfferingsDesc', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', height: '100px', padding: '10px', resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Tagline Journey Strip */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid rgba(184, 150, 46, 0.15)', paddingBottom: '20px' }}>
            <h4 style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-dark)', margin: '0 0 4px', fontSize: '0.95rem', letterSpacing: '1px' }}>3. Tagline Strip (CTA Banner)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Tagline Title</label>
              <input
                type="text"
                className="yt-input"
                value={formData.taglineTitle || ''}
                onChange={e => handleChange('taglineTitle', e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Tagline Subtitle</label>
              <textarea
                className="yt-input"
                value={formData.taglineSubtitle || ''}
                onChange={e => handleChange('taglineSubtitle', e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', height: '60px', padding: '10px', resize: 'vertical' }}
              />
            </div>
          </div>

          {/* Section 4: About Us Page Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '10px' }}>
            <h4 style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-dark)', margin: '0 0 4px', fontSize: '0.95rem', letterSpacing: '1px' }}>4. About Us Page Details</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Story Header Title</label>
                <input
                  type="text"
                  className="yt-input"
                  value={formData.aboutStoryTitle || ''}
                  onChange={e => handleChange('aboutStoryTitle', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Story Subtitle Tagline</label>
                <input
                  type="text"
                  className="yt-input"
                  value={formData.aboutStoryTagline || ''}
                  onChange={e => handleChange('aboutStoryTagline', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Philosophy Block Title</label>
                <input
                  type="text"
                  className="yt-input"
                  value={formData.aboutPhilosophyTitle || ''}
                  onChange={e => handleChange('aboutPhilosophyTitle', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Philosophy Block Description</label>
                <textarea
                  className="yt-input"
                  value={formData.aboutPhilosophyDesc || ''}
                  onChange={e => handleChange('aboutPhilosophyDesc', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', height: '80px', padding: '10px', resize: 'vertical' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Signature Block Title</label>
                <input
                  type="text"
                  className="yt-input"
                  value={formData.aboutSignatureTitle || ''}
                  onChange={e => handleChange('aboutSignatureTitle', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Signature Block Description</label>
                <textarea
                  className="yt-input"
                  value={formData.aboutSignatureDesc || ''}
                  onChange={e => handleChange('aboutSignatureDesc', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', height: '80px', padding: '10px', resize: 'vertical' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Execution Block Title</label>
                <input
                  type="text"
                  className="yt-input"
                  value={formData.aboutExecutionTitle || ''}
                  onChange={e => handleChange('aboutExecutionTitle', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>Execution Block Description</label>
                <textarea
                  className="yt-input"
                  value={formData.aboutExecutionDesc || ''}
                  onChange={e => handleChange('aboutExecutionDesc', e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', height: '80px', padding: '10px', resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="save-btn" style={{ padding: '14px 28px', background: 'var(--gold-dark)', color: '#fff', border: 'none', cursor: 'pointer', alignSelf: 'flex-start', marginTop: '10px' }} disabled={isSaving}>
            {isSaving ? '✦ SAVING COPY... ✦' : '✦ Save Brand Copy Text ✦'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Portfolio editing panel (MERN Premium Feature)
function PortfolioPanel({ portfolios, onAdd, onUpdate, onDelete, showToast }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Theme Curation');
  const [description, setDescription] = useState('');
  const [src, setSrc] = useState('');
  const [ctaText, setCtaText] = useState('Consult on Design');
  const [ctaLink, setCtaLink] = useState('/contact');
  
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

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

        const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
        setSrc(dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Theme Curation');
    setDescription('');
    setSrc('');
    setCtaText('Consult on Design');
    setCtaLink('/contact');
    setEditingId(null);
  };

  const handleEditClick = (p) => {
    setEditingId(p._id);
    setTitle(p.title);
    setCategory(p.category);
    setDescription(p.description);
    setSrc(p.src);
    setCtaText(p.ctaText || 'Consult on Design');
    setCtaLink(p.ctaLink || '/contact');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !src) {
      showToast('❌ Please specify a title, description, and upload an image.', 'error');
      return;
    }

    setIsSaving(true);
    let success = false;
    if (editingId) {
      success = await onUpdate(editingId, { title, category, description, src, ctaText, ctaLink });
      if (success) showToast('✓ Portfolio updated successfully!', 'success');
    } else {
      success = await onAdd({ title, category, description, src, ctaText, ctaLink });
      if (success) showToast('✓ Portfolio created successfully!', 'success');
    }
    setIsSaving(false);

    if (success) {
      resetForm();
    } else {
      showToast('❌ Failed to save portfolio.', 'error');
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this portfolio showcase?')) {
      setDeletingId(id);
      const success = await onDelete(id);
      setDeletingId(null);
      if (success) {
        showToast('✓ Portfolio deleted.', 'success');
      } else {
        showToast('❌ Failed to delete portfolio.', 'error');
      }
    }
  };

  return (
    <div className="yt-panel">
      <div className="yt-panel-header" style={{ background: 'linear-gradient(135deg, #160003, #2a080c)' }}>
        <div className="yt-panel-title" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>💼</span>
          <h3>Curated Portfolios Showcase</h3>
        </div>
      </div>

      <div className="yt-panel-body">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(74, 18, 26, 0.02)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(74, 18, 26, 0.08)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'var(--brown)', fontFamily: 'Cinzel, serif' }}>
            {editingId ? 'Edit Portfolio Showcase' : 'Create New Portfolio Showcase'}
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)' }}>Portfolio Title</label>
              <input
                type="text"
                className="yt-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Royal Rajputana Mandap Curation"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)' }}>Category / Tag</label>
              <input
                type="text"
                className="yt-input"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="e.g. Theme Curation or Scenography"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)' }}>Showcase Description</label>
            <textarea
              className="yt-input"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Detailed description of styling elements, marigolds, local weaves, custom arches..."
              style={{ width: '100%', boxSizing: 'border-box', height: '80px', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)' }}>CTA Button Text</label>
              <input
                type="text"
                className="yt-input"
                value={ctaText}
                onChange={e => setCtaText(e.target.value)}
                placeholder="e.g. Consult on Design"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)' }}>CTA Link Path</label>
              <input
                type="text"
                className="yt-input"
                value={ctaLink}
                onChange={e => setCtaLink(e.target.value)}
                placeholder="e.g. /contact"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '5px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)' }}>Showcase Cover Photo</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ fontSize: '0.85rem' }}
              />
              {src && (
                <div style={{ position: 'relative', width: '100px', height: '65px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gold)' }}>
                  <img src={src} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button type="submit" className="yt-save-btn" disabled={isSaving} style={{ padding: '10px 24px' }}>
              {isSaving ? 'Saving...' : editingId ? 'Update Showcase' : 'Create Showcase'}
            </button>
            {editingId && (
              <button type="button" className="yt-save-btn" onClick={resetForm} style={{ padding: '10px 24px', background: '#95a5a6' }}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div style={{ marginTop: '30px' }}>
          <h4 style={{ color: 'var(--brown)', borderBottom: '1px solid rgba(74, 18, 26, 0.08)', paddingBottom: '8px', fontFamily: 'Cinzel, serif' }}>
            Existing Portfolio Showcases ({portfolios.length})
          </h4>

          {portfolios.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px 0' }}>No portfolio items uploaded yet. Create one above!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '15px' }}>
              {portfolios.map(p => (
                <div 
                  key={p._id} 
                  style={{ display: 'flex', gap: '20px', padding: '16px', border: '1px solid rgba(74, 18, 26, 0.08)', borderRadius: '8px', background: '#fff', flexWrap: 'wrap' }}
                >
                  <div style={{ width: '120px', height: '80px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #eee', flexShrink: 0 }}>
                    <img src={p.src} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <h5 style={{ margin: '0', fontSize: '1.05rem', color: 'var(--brown)' }}>{p.title}</h5>
                      <span style={{ fontSize: '0.68rem', background: 'var(--gold-dark)', color: '#fff', padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}>{p.category}</span>
                    </div>
                    <p style={{ margin: '4px 0', fontSize: '0.86rem', color: 'var(--text)', lineHeight: '1.5' }}>{p.description}</p>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                      CTA: <strong>{p.ctaText}</strong> &rarr; <code>{p.ctaLink}</code>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', alignSelf: 'flex-start' }}>
                    <button 
                      onClick={() => handleEditClick(p)} 
                      style={{ padding: '6px 12px', fontSize: '0.78rem', background: 'var(--gold-dark)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(p._id)} 
                      disabled={deletingId === p._id}
                      style={{ padding: '6px 12px', fontSize: '0.78rem', background: '#c0392b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {deletingId === p._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Testimonials editing panel (MERN Premium Feature)
function TestimonialPanel({ testimonials, onAdd, onUpdate, onDelete, showToast }) {
  const [couple, setCouple] = useState('');
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const resetForm = () => {
    setCouple('');
    setText('');
    setEditingId(null);
  };

  const handleEditClick = (t) => {
    setEditingId(t._id);
    setCouple(t.couple);
    setText(t.text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!couple.trim() || !text.trim()) {
      showToast('❌ Please specify both couple names and the review text.', 'error');
      return;
    }

    setIsSaving(true);
    let success = false;
    if (editingId) {
      success = await onUpdate(editingId, { couple, text });
      if (success) showToast('✓ Testimonial updated successfully!', 'success');
    } else {
      success = await onAdd({ couple, text });
      if (success) showToast('✓ Testimonial added successfully!', 'success');
    }
    setIsSaving(false);

    if (success) {
      resetForm();
    } else {
      showToast('❌ Failed to save testimonial.', 'error');
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Delete this client testimonial?')) {
      setDeletingId(id);
      const success = await onDelete(id);
      setDeletingId(null);
      if (success) {
        showToast('✓ Testimonial deleted.', 'success');
      } else {
        showToast('❌ Failed to delete testimonial.', 'error');
      }
    }
  };

  return (
    <div className="yt-panel">
      <div className="yt-panel-header" style={{ background: 'linear-gradient(135deg, #160003, #2a080c)' }}>
        <div className="yt-panel-title" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>💬</span>
          <h3>Client Testimonials</h3>
        </div>
      </div>

      <div className="yt-panel-body">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(74, 18, 26, 0.02)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(74, 18, 26, 0.08)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'var(--brown)', fontFamily: 'Cinzel, serif' }}>
            {editingId ? 'Edit Testimonial' : 'Add New Client Testimonial'}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)' }}>Couple / Author Name</label>
            <input
              type="text"
              className="yt-input"
              value={couple}
              onChange={e => setCouple(e.target.value)}
              placeholder="e.g. Aditi & Kabir"
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--brown)' }}>Review Text</label>
            <textarea
              className="yt-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Write the couple's review quote here..."
              style={{ width: '100%', boxSizing: 'border-box', height: '100px', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button type="submit" className="yt-save-btn" disabled={isSaving} style={{ padding: '10px 24px' }}>
              {isSaving ? 'Saving...' : editingId ? 'Update Testimonial' : 'Add Testimonial'}
            </button>
            {editingId && (
              <button type="button" className="yt-save-btn" onClick={resetForm} style={{ padding: '10px 24px', background: '#95a5a6' }}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div style={{ marginTop: '30px' }}>
          <h4 style={{ color: 'var(--brown)', borderBottom: '1px solid rgba(74, 18, 26, 0.08)', paddingBottom: '8px', fontFamily: 'Cinzel, serif' }}>
            Active Client Testimonials ({testimonials.length})
          </h4>

          {testimonials.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px 0' }}>No testimonials added yet. Create one above!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '15px' }}>
              {testimonials.map(t => (
                <div 
                  key={t._id} 
                  style={{ display: 'flex', gap: '20px', padding: '16px', border: '1px solid rgba(74, 18, 26, 0.08)', borderRadius: '8px', background: '#fff', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ margin: '0', fontSize: '0.92rem', color: 'var(--text)', fontStyle: 'italic', lineHeight: '1.6' }}>
                      "{t.text}"
                    </p>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--gold-dark)', fontFamily: 'Cinzel, serif' }}>
                      — {t.couple}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button 
                      onClick={() => handleEditClick(t)} 
                      style={{ padding: '6px 12px', fontSize: '0.78rem', background: 'var(--gold-dark)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(t._id)} 
                      disabled={deletingId === t._id}
                      style={{ padding: '6px 12px', fontSize: '0.78rem', background: '#c0392b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {deletingId === t._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
    stats,
    brandText,
    portfolios,
    testimonials,
    enquiries,
    addImages,
    deleteImage,
    updateImageLabel,
    clearAll,
    saveYoutubeUrl,
    saveStats,
    saveBrandText,
    deleteEnquiry,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial
  } = useAdmin();

  const [activeTab, setActiveTab] = useState('hero');
  const [toast, setToast] = useState(null);

  const triggerToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
  };

  const tabs = [
    { id: 'hero', label: 'Hero Slider', icon: <SliderIcon />, count: heroImages.length },
    { id: 'gallery', label: 'Gallery', icon: <GalleryIcon />, count: galleryImages.length },
    { id: 'services', label: 'Service Images', icon: <ServicesIcon />, count: serviceImages.length },
    { id: 'portfolio', label: 'Portfolios', icon: <span style={{ marginRight: '6px' }}>💼</span>, count: portfolios.length },
    { id: 'testimonials', label: 'Testimonials', icon: <span style={{ marginRight: '6px' }}>💬</span>, count: testimonials.length },
    { id: 'youtube', label: 'YouTube Video', icon: <VideoIcon />, count: null },
    { id: 'stats', label: 'Milestone Stats', icon: <StatsIcon />, count: null },
    { id: 'brandText', label: 'Brand Copy Text', icon: <span style={{ marginRight: '6px' }}>📝</span>, count: null },
    { id: 'enquiries', label: 'Enquiries', icon: <EnquiriesIcon />, count: enquiries.length }
  ];

  const panels = {
    hero: {
      type: 'hero',
      title: 'Hero Slider',
      icon: <SliderIcon size={20} color="var(--gold-dark)" />,
      headerClass: 'dash-panel-header--hero',
      images: heroImages
    },
    gallery: {
      type: 'gallery',
      title: 'Gallery',
      icon: <GalleryIcon size={20} color="var(--gold-dark)" />,
      headerClass: 'dash-panel-header--gallery',
      images: galleryImages
    },
    services: {
      type: 'services',
      title: 'Service Images',
      icon: <ServicesIcon size={20} color="var(--gold-dark)" />,
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
          <Link to="/" className="admin-view-site" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <GlobeIcon size={14} color="var(--gold-dark)" /> View Site
          </Link>
          <button className="admin-logout-btn" onClick={logout} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <LogoutIcon size={14} color="#c0392b" /> Logout
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
          <span className="admin-stat-icon"><StatsIcon size={24} color="var(--gold-dark)" /></span>
          <span className="admin-stat-num">
            {heroImages.length + galleryImages.length + serviceImages.length + portfolios.length}
          </span>
          <span className="admin-stat-label">Total DB Items</span>
        </div>
      </div>

      {/* Main Content Area: Sidebar layout on desktop, responsive stack on mobile */}
      <div className="admin-main-container">
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
          ) : activeTab === 'stats' ? (
            <StatsPanel
              stats={stats}
              onSave={saveStats}
              showToast={triggerToast}
            />
          ) : activeTab === 'brandText' ? (
            <BrandTextPanel
              brandText={brandText}
              onSave={saveBrandText}
              showToast={triggerToast}
            />
          ) : activeTab === 'enquiries' ? (
            <EnquiriesPanel
              enquiries={enquiries}
              onDelete={deleteEnquiry}
              showToast={triggerToast}
            />
          ) : activeTab === 'portfolio' ? (
            <PortfolioPanel
              portfolios={portfolios}
              onAdd={addPortfolio}
              onUpdate={updatePortfolio}
              onDelete={deletePortfolio}
              showToast={triggerToast}
            />
          ) : activeTab === 'testimonials' ? (
            <TestimonialPanel
              testimonials={testimonials}
              onAdd={addTestimonial}
              onUpdate={updateTestimonial}
              onDelete={deleteTestimonial}
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
      </div>

      {/* Help Block */}
      <div className="admin-help">
        <h4 style={{ display: 'flex', alignItems: 'center' }}><InfoIcon /> How It Works</h4>
        <ul>
          <li>
            <strong>Hero Slider:</strong> Images show in the homepage slideshow. Seeding uploads them as real database records.
          </li>
          <li>
            <strong>Gallery:</strong> Images will display in the infinite scroll marquee gallery. Click labels to rename them.
          </li>
          <li>
            <strong>Portfolios:</strong> Manage the "Curated Portfolios" section on the homepage. Upload styling showcase images, set tags, and write custom descriptions.
          </li>
          <li>
            <strong>Testimonials:</strong> Add and configure multiple client reviews dynamically. The review slider updates automatically.
          </li>
          <li>
            <strong>Milestone Stats:</strong> Manage the live counters (e.g. Years of Grace, Events Crafted) shown on the homepage and about sections.
          </li>
          <li>
            <strong>Enquiries:</strong> Submissions from the contact form are stored in MongoDB. Authenticated admins can view or remove them here.
          </li>
        </ul>
      </div>
    </div>
  );
}
