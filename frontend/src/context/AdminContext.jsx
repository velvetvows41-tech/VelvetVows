import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AdminContext = createContext(null);

// Dynamically resolve API base:
// 1. Checks VITE_API_BASE environment variable (ideal for production builds)
// 2. Falls back to localhost:5000 for local development
// 3. Defaults to the custom domain's host /api under window.location.origin
const API_BASE = import.meta.env.VITE_API_BASE || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : `${window.location.origin}/api`
);

// Instantly pre-fetch items and video URL at the module level as soon as this script is loaded.
// This executes the request way before React mounts and enters its rendering cycle.
const initialItemsPromise = fetch(`${API_BASE}/items`)
  .then(res => res.ok ? res.json() : null)
  .catch(err => {
    console.error('Module-level pre-fetch items error:', err);
    return null;
  });

const initialVideoPromise = fetch(`${API_BASE}/video`)
  .then(res => res.ok ? res.json() : null)
  .catch(err => {
    console.error('Module-level pre-fetch video error:', err);
    return null;
  });

const formatImgSrc = (src) => {
  if (src.startsWith('/uploads/')) {
    const origin = API_BASE.replace('/api', '');
    return `${origin}${src}`;
  }
  return src;
};

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('velvet_token');
  });
  const [loginError, setLoginError] = useState('');
  
  // Initialize state synchronously from localStorage cache for instant first-frame rendering
  const [heroImages, setHeroImages] = useState(() => {
    try {
      const cached = localStorage.getItem('velvet_items');
      if (cached) {
        const items = JSON.parse(cached);
        return items.filter(item => item.type === 'hero').map(i => ({ ...i, src: formatImgSrc(i.src) }));
      }
    } catch (err) {
      console.error('Error parsing cached hero images:', err);
    }
    return [];
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    try {
      const cached = localStorage.getItem('velvet_items');
      if (cached) {
        const items = JSON.parse(cached);
        return items.filter(item => item.type === 'gallery').map(i => ({ ...i, src: formatImgSrc(i.src) }));
      }
    } catch (err) {
      console.error('Error parsing cached gallery images:', err);
    }
    return [];
  });

  const [serviceImages, setServiceImages] = useState(() => {
    try {
      const cached = localStorage.getItem('velvet_items');
      if (cached) {
        const items = JSON.parse(cached);
        return items.filter(item => item.type === 'services').map(i => ({ ...i, src: formatImgSrc(i.src) }));
      }
    } catch (err) {
      console.error('Error parsing cached service images:', err);
    }
    return [];
  });

  const [youtubeUrl, setYoutubeUrl] = useState(() => {
    try {
      return localStorage.getItem('velvet_video_url') || '';
    } catch (err) {
      return '';
    }
  });

  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial data (can resolve the pre-fetched promises on mount)
  const fetchData = useCallback(async (isInitial = false) => {
    try {
      let items = null;
      if (isInitial) {
        items = await initialItemsPromise;
      }

      // Fallback: if pre-fetch was not ready or we are doing a manual refetch
      if (!items) {
        const imgRes = await fetch(`${API_BASE}/items`);
        if (imgRes.ok) {
          items = await imgRes.json();
        }
      }

      if (items) {
        localStorage.setItem('velvet_items', JSON.stringify(items));
        setHeroImages(items.filter(item => item.type === 'hero').map(i => ({ ...i, src: formatImgSrc(i.src) })));
        setGalleryImages(items.filter(item => item.type === 'gallery').map(i => ({ ...i, src: formatImgSrc(i.src) })));
        setServiceImages(items.filter(item => item.type === 'services').map(i => ({ ...i, src: formatImgSrc(i.src) })));
      }

      let videoData = null;
      if (isInitial) {
        videoData = await initialVideoPromise;
      }

      if (!videoData) {
        const videoRes = await fetch(`${API_BASE}/video`);
        if (videoRes.ok) {
          videoData = await videoRes.json();
        }
      }

      if (videoData) {
        const url = videoData.url || '';
        localStorage.setItem('velvet_video_url', url);
        setYoutubeUrl(url);
      }
    } catch (err) {
      console.error('Error fetching public data:', err);
    }
  }, []);

  // Fetch enquiries if authenticated
  const fetchEnquiries = useCallback(async () => {
    const token = localStorage.getItem('velvet_token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/enquiries`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    }
  }, []);

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnquiries();
    } else {
      setEnquiries([]);
    }
  }, [isAuthenticated, fetchEnquiries]);

  // Login action
  const login = useCallback(async (username, password) => {
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('velvet_token', data.token);
        setIsAuthenticated(true);
        return true;
      } else {
        setLoginError(data.message || 'Invalid username or password.');
        return false;
      }
    } catch (err) {
      setLoginError('Server error logging in.');
      return false;
    }
  }, []);

  // Logout action
  const logout = useCallback(() => {
    localStorage.removeItem('velvet_token');
    setIsAuthenticated(false);
  }, []);

  // Add/Publish images
  const addImages = useCallback(async (type, newImages) => {
    const token = localStorage.getItem('velvet_token');
    if (!token) return false;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type, images: newImages })
      });

      if (res.ok) {
        await fetchData();
        return true;
      }
      if (res.status === 401) {
        logout();
      }
      return false;
    } catch (err) {
      console.error('Error adding images:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, logout]);

  // Delete image
  const deleteImage = useCallback(async (type, id) => {
    const token = localStorage.getItem('velvet_token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        await fetchData();
      } else if (res.status === 401) {
        logout();
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  }, [fetchData, logout]);

  // Update label
  const updateImageLabel = useCallback(async (type, id, label) => {
    const token = localStorage.getItem('velvet_token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/items/${id}/label`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ label })
      });

      if (res.ok) {
        await fetchData();
      } else if (res.status === 401) {
        logout();
      }
    } catch (err) {
      console.error('Error updating label:', err);
    }
  }, [fetchData, logout]);

  // Clear all images of a type
  const clearAll = useCallback(async (type) => {
    const token = localStorage.getItem('velvet_token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/items?type=${type}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        await fetchData();
      } else if (res.status === 401) {
        logout();
      }
    } catch (err) {
      console.error('Error clearing images:', err);
    }
  }, [fetchData, logout]);

  // Save YouTube Video URL
  const saveYoutubeUrl = useCallback(async (url) => {
    const token = localStorage.getItem('velvet_token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url })
      });

      if (res.ok) {
        const v = await res.json();
        const newUrl = v.url || '';
        localStorage.setItem('velvet_video_url', newUrl);
        setYoutubeUrl(newUrl);
      } else if (res.status === 401) {
        logout();
      }
    } catch (err) {
      console.error('Error saving YouTube URL:', err);
    }
  }, [logout]);

  // Submit Enquiry
  const submitEnquiry = useCallback(async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      return res.ok;
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      return false;
    }
  }, []);

  // Delete Enquiry
  const deleteEnquiry = useCallback(async (id) => {
    const token = localStorage.getItem('velvet_token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/enquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        await fetchEnquiries();
      } else if (res.status === 401) {
        logout();
      }
    } catch (err) {
      console.error('Error deleting enquiry:', err);
    }
  }, [fetchEnquiries, logout]);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        loginError,
        login,
        logout,
        heroImages,
        galleryImages,
        serviceImages,
        youtubeUrl,
        enquiries,
        isLoading,
        addImages,
        deleteImage,
        updateImageLabel,
        clearAll,
        saveYoutubeUrl,
        submitEnquiry,
        deleteEnquiry
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be inside <AdminProvider>');
  }
  return context;
}
