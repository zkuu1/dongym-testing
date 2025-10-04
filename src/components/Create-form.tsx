"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateUserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    membershipId: "",
    status: "nonactive",
    startDate: "",
    endDate: "",
    type: "basic",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔍 Validasi tambahan di frontend
    if (formData.membershipId) {
      if (!formData.startDate || !formData.endDate || !formData.type) {
        toast.error("Kalau Membership ID diisi, Start Date, End Date, dan Type wajib diisi!");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("User berhasil dibuat!");
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        toast.error(result.message || "Gagal membuat user");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    
    <div>
      <ToastContainer position="top-center" autoClose={1500} theme="dark" />

      <form onSubmit={handleSubmit} className="w-full">
       
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Name */}
    <div>
      <label htmlFor="name" className="block text-sm font-medium mb-1 text-black">
        Nama Lengkap
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
        required
      />
    </div>

    {/* Email */}
    <div>
      <label htmlFor="email" className="block text-sm font-medium mb-1 text-black">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
        required
      />
    </div>

    {/* Password - full width */}
    <div className="col-span-2">
      <label htmlFor="password" className="block text-sm font-medium mb-1 text-black">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
        required
        minLength={6}
      />
    </div>

    {/* Role */}
    <div>
      <label htmlFor="role" className="block text-sm font-medium mb-1 text-black">
        Role
      </label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    {/* Membership ID */}
    <div>
      <label htmlFor="membershipId" className="block text-sm font-medium mb-1 text-black">
        Membership ID
      </label>
      <input
        type="text"
        id="membershipId"
        name="membershipId"
        value={formData.membershipId}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
        placeholder="Kosongkan jika tidak ada"
      />
    </div>

    {/* Start Date */}
    <div>
      <label htmlFor="startDate" className="block text-sm font-medium mb-1 text-black">
        Tanggal Mulai
      </label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
        disabled={!formData.membershipId}
      />
    </div>

    {/* End Date */}
    <div>
      <label htmlFor="endDate" className="block text-sm font-medium mb-1 text-black">
        Tanggal Selesai
      </label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
        disabled={!formData.membershipId}
      />
    </div>

    {/* Status - full width */}
    <div className="col-span-2">
      <label htmlFor="status" className="block text-sm font-medium mb-1 text-black">
        Status Membership
      </label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
        disabled={!formData.membershipId}
      >
        <option value="active">Active</option>
        <option value="nonactive">Nonactive</option>
      </select>
    </div>
  </div>

  {/* Buttons */}
  <div className="flex justify-end space-x-3 mt-6">
    <button
      type="button"
      onClick={() => router.push("/admin")}
      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 text-sm"
    >
      Kembali
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-base_purple text-white rounded hover:bg-purple-700 disabled:bg-purple-400 text-sm"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Membuat..." : "Buat User"}
    </button>
  </div>
</form>

    </div>
  );
};

export default CreateUserForm;
