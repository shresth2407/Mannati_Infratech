const API_BASE_URL = "";

/* =======================
   AUTH
======================= */

export const loginAdmin = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/* =======================
   ENQUIRY (PUBLIC)
======================= */

export const submitEnquiry = async (enquiryData) => {
  const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enquiryData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Enquiry submission failed");
  }

  return data;
};

/* =======================
   ENQUIRY (ADMIN)
======================= */

export const getAllEnquiries = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch enquiries");

  return data.enquiries;
};

export const updateEnquiryStatus = async (id, status, token) => {
  const response = await fetch(
    `${API_BASE_URL}/api/enquiries/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error("Failed to update status");

  return data;
};

/* =======================
   GALLERY (PUBLIC)
======================= */

export const getGalleryImages = async () => {
  const response = await fetch(`${API_BASE_URL}/api/gallery`);
  const data = await response.json();
  return data.images;
};

/* =======================
   GALLERY (ADMIN)
======================= */

export const uploadGalleryImage = async (formData, token) => {
  const res = await fetch("/api/gallery", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};


/* =======================
   DASHBOARD
======================= */

export const getDashboardStats = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Failed to load dashboard stats");

  return data.stats;
};

/* =======================
   CATEGORY (ADMIN)
======================= */

export const getCategories = async () => {
  const res = await fetch("/api/categories");
  const data = await res.json();
  return data.categories;
};

export const createCategory = async (name, token) => {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const deleteCategory = async (id, token) => {
  const res = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

/* =======================
   GALLERY (ADMIN FULL CONTROL)
======================= */

export const getAdminGallery = async (token) => {
  const res = await fetch("/api/gallery/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.images;
};

export const updateGallery = async (id, payload, token) => {
  const res = await fetch(`/api/gallery/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteGallery = async (id, token) => {
  const res = await fetch(`/api/gallery/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
