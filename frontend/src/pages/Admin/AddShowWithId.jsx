import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import Spinner from "../../components/loaders/Spinner";

const AddShowWithId = () => {
  const { movieId } = useParams();

  const [form, setForm] = useState({
    showDate: "",
    showTime: "",
    price: "",
    totalSeats: 100,
    screen: "Screen 1",
    format: "2D",
    language: "Hindi",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // ===== Handle Input Change =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ===== Handle Submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Merge date + time → Date
      const showDateTime = new Date(`${form.showDate}T${form.showTime}`);

      // 2. Prevent past show
      if (showDateTime < new Date()) {
        return toast.error("Cannot create show in the past");
      }

      setLoading(true);

      const response = await axiosInstance.post(
        "/api/show/admin/create",
        {
          movieId,
          showDateTime,
          price: Number(form.price),
          totalSeats: Number(form.totalSeats),
          screen: form.screen.trim(),
          format: form.format.trim(),
          language: form.language.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Show created successfully");

      // 3. Reset full form
      setForm({
        showDate: "",
        showTime: "",
        price: "",
        totalSeats: 100,
        screen: "Screen 1",
        format: "2D",
        language: "Hindi",
      });

    } catch (error) {
      console.error("Create show error:", error);
      toast.error(error?.response?.data?.message || "Failed to create show");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Add Show</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Date */}
        <input
          type="date"
          name="showDate"
          value={form.showDate}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          min={new Date().toISOString().split("T")[0]}
          required
        />

        {/* Time */}
        <input
          type="time"
          name="showTime"
          value={form.showTime}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
          min={0}
        />

        {/* Total Seats */}
        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={form.totalSeats}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          min={1}
        />

        {/* Screen */}
        <input
          name="screen"
          placeholder="Screen"
          value={form.screen}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        {/* Format */}
        <input
          name="format"
          placeholder="Format"
          value={form.format}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        {/* Language */}
        <input
          name="language"
          placeholder="Language"
          value={form.language}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        {/* Submit */}
        <button
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-red-600 px-6 py-2 rounded hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Spinner /> Creating...
            </>
          ) : (
            "Create Show"
          )}
        </button>

      </form>
    </section>
  );
};

export default AddShowWithId;
