const API_BASE_URL = "http://localhost:5000";

/* =======================
   AUTH HEADER HELPER
======================= */
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};

/* =======================
   AUTH – ADMIN LOGIN
======================= */
export const loginAdmin = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("adminToken", data.token);
  return data;
};

/* =======================
   AUTH – FORGOT / RESET
======================= */
export const requestPasswordReset = async (payload) => {
  const res = await fetch(
    `${API_BASE_URL}/api/auth/forgot-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to send reset link");
  }

  return data;
};

export const resetPassword = async (token, payload) => {
  const res = await fetch(
    `${API_BASE_URL}/api/auth/reset-password/${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Password reset failed");
  }

  return data;
};

/* =======================
   GALLERY – ADMIN
======================= */
export const uploadGalleryFiles = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/api/gallery/upload`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });
  return res.json();
};

export const getAdminGallery = async () => {
  const res = await fetch(`${API_BASE_URL}/api/gallery/admin`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  return data.items || [];
};

export const updateGalleryItem = async (id, payload) => {
  const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteGalleryItem = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
};

/* =======================
   DASHBOARD – ADMIN
======================= */
export const getDashboardStats = async () => {
  const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load dashboard stats");
  }

  return data;
};

/* =======================
   GALLERY – PUBLIC (FIX)
======================= */
export const getGalleryImages = async () => {
  const res = await fetch("http://localhost:5000/api/gallery");

  const data = await res.json();

  // backend returns: { success, galleries }
  // Events.jsx expects images → flatten files
  const images = [];

  if (data.galleries) {
    data.galleries.forEach((gallery) => {
      gallery.files.forEach((file) => {
        if (file.type === "image") {
          images.push({
            _id: file.publicId,
            imageUrl: file.fileUrl,
            title: gallery.title,
          });
        }
      });
    });
  }

  return images;
};


/* =======================
   ENQUIRY – PUBLIC
======================= */
export const submitEnquiry = async (enquiryData) => {
  const res = await fetch("http://localhost:5000/api/enquiries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enquiryData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to submit enquiry");
  }

  return data;
};
