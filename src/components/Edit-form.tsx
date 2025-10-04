"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from "@/lib/data";



type EditFormProps = {
  user: {
    id: string;
    name: string | null;
    email?: string | null;
    role: string | null;
    membershipId: string | null;
    membership?: {
      status: string | null;
      startDate: string | null;
      endDate: string | null;
    } | null;
  };
};

export default function EditUserForm({ user }: EditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

const [formData, setFormData] = useState({
  name: user.name ?? "",
  role: user.role ?? "user",
  membershipId: user.membershipId ?? "",
  status: user.membership?.status ?? "nonactive",
  startDate: user.membership?.startDate
    ? new Date(user.membership.startDate).toISOString().split("T")[0]
    : "",
  endDate: user.membership?.endDate
    ? new Date(user.membership.endDate).toISOString().split("T")[0]
    : "",
});


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/admin/edit/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Gagal update user");
      } else {
        toast.success("User berhasil diupdate!");
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <form
  id="edit-user-form"
  onSubmit={handleSubmit}
  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
>
  {/* Kiri */}
  <div className="space-y-6">
    {/* Name */}
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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

    {/* Role */}
    <div>
      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
        Role
      </label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
        required
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    {/* Membership ID */}
    <div>
      <label
        htmlFor="membershipId"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Membership ID
      </label>
      <input
        type="number"
        id="membershipId"
        name="membershipId"
        value={formData.membershipId || ""}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
        placeholder="Kosongkan jika tidak ada"
      />
    </div>
  </div>

  {/* Kanan */}
  <div className="space-y-6">
    {/* Start Date */}
    <div>
      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
        Tanggal Mulai
      </label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        value={formData.startDate || ""}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
      />
    </div>

    {/* End Date */}
    <div>
      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
        Tanggal Selesai
      </label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        value={formData.endDate || ""}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
      />
    </div>

    {/* Status */}
    <div>
      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
        Status Membership
      </label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
      >
        <option value="active">Active</option>
        <option value="nonactive">Nonactive</option>
      </select>
    </div>
  </div>

  {/* Buttons bawah */}
  <div className="lg:col-span-2 flex justify-end space-x-3">
    <button
      type="button"
      onClick={() => router.push("/admin")}
      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 text-sm"
    >
      Batal
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-base_purple text-white rounded hover:bg-purple-700 disabled:bg-purple-400 text-sm"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Updating..." : "Update User"}
    </button>
  </div>
</form>
</div>
  );
}
