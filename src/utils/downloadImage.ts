/**
 * Utility to reliably download jewelry images across desktop & mobile browsers,
 * including handling cross-origin URLs, Data URLs, and Blobs without iframe blocking.
 */

export async function downloadJewelryImage(imageUrl: string, filename?: string): Promise<boolean> {
  const safeFilename = (filename || 'shree-hari-jewelry')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .concat('.jpg');

  if (!imageUrl) return false;

  // Case 1: Data URL
  if (imageUrl.startsWith('data:')) {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = safeFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch {
      return false;
    }
  }

  // Case 2: Try fetching as Blob (works for same-origin and CORS-enabled domains)
  try {
    const res = await fetch(imageUrl, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
    });

    if (res.ok) {
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = safeFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
      return true;
    }
  } catch {
    // If fetch failed (likely CORS), proceed to canvas fallback
  }

  // Case 3: Canvas rendering with crossOrigin
  try {
    const success = await new Promise<boolean>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width || 800;
          canvas.height = img.naturalHeight || img.height || 800;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(false);

          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (!blob) return resolve(false);
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = safeFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
            resolve(true);
          }, 'image/jpeg', 0.95);
        } catch {
          resolve(false);
        }
      };
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });

    if (success) return true;
  } catch {
    // Canvas fallback failed
  }

  // Case 4: Final Anchor fallback with target=_blank
  try {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank';
    link.download = safeFilename;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch {
    return false;
  }
}
