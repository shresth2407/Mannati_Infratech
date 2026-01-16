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
  if (!res.ok) throw new Error(data.message || "Login failed");

  localStorage.setItem("adminToken", data.token);
  return data;
};

/* =======================
   AUTH – FORGOT / RESET
======================= */
export const requestPasswordReset = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
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
  if (!res.ok) throw new Error(data.message);
  return data;
};

/* =======================
   GALLERY – ADMIN
======================= */
export const uploadGalleryFiles = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/api/gallery`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data;
};

export const getAdminGallery = async () => {
  const res = await fetch(`${API_BASE_URL}/api/gallery/admin`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Failed to load gallery");
  return data.galleries || [];
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
   GALLERY – PUBLIC
======================= */
export const getPublicGallery = async () => {
  const res = await fetch(`${API_BASE_URL}/api/gallery`);
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to load gallery");

  const files = [];
  if (Array.isArray(data.galleries)) {
    data.galleries.forEach((gallery) => {
      if (Array.isArray(gallery.files)) {
        gallery.files.forEach((file) => {
          files.push({
            _id: file.publicId,
            type: file.type,
            fileUrl: file.fileUrl,
            title: gallery.title,
            category: gallery.category,
            createdAt: gallery.createdAt,
          });
        });
      }
    });
  }
  return files;
};

export const getGalleryImages = async () => {
  const files = await getPublicGallery();
  return files.filter((f) => f.type === "image");
};

export const getGalleryVideos = async () => {
  const files = await getPublicGallery();
  return files.filter((f) => f.type === "video");
};

/* =======================
   ENQUIRY – PUBLIC
======================= */
export const submitEnquiry = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

/* =======================
   DASHBOARD – ADMIN
======================= */
export const getDashboardStats = async () => {
  const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

/* ================= PROJECTS ================= */

export const getAdminProjects = async () => {
  const res = await fetch("http://localhost:5000/api/projects/admin", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Projects load failed");
  return data.projects;
};

export const createProject = async (payload) => {
  const res = await fetch("http://localhost:5000/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const getPublicProjects = async () => {
  const res = await fetch("http://localhost:5000/api/projects");
  const data = await res.json();
  if (!res.ok) throw new Error("Public projects load failed");
  return data.projects;
};

export const updateProject = async (id, payload) => {
  const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Update failed");
  return data;
};

