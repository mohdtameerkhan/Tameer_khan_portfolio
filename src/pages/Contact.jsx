import React, { useState } from "react";
import { motion } from "framer-motion";
import ImgSrc from "../assets/IMG_7222.PNG";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // 🔄 Added loading state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyZVJDnsgWtdxnZi_SB4NYD8JoKwnPBZfwWIg8WS44uYyUaOmV2YLeE4WT10fq61q0z/exec";

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("message", formData.message);

      const response = await fetch(scriptURL, {
        method: "POST",
        body: form,
      });

      // Show success message right after sending
      alert("Hey! It's me Tameer, I will revert you soon! 📩");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("⚠️ Error: " + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-[90%] sm:w-[85%] lg:w-[70%] mx-auto mt-10 flex flex-col md:flex-row gap-6 p-4 rounded-lg shadow-lg shadow-purple-950">
      {/* Left - Image */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={ImgSrc}
          alt="Contact"
          className="max-w-full max-h-96 object-contain"
        />
      </motion.div>

      {/* Right - Form */}
      <motion.div
        className="flex-1 text-center text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Let's Connect</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="p-3 w-full rounded bg-[#a1d6e277] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="p-3 w-full rounded bg-[#a1d6e277] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="p-3 w-full rounded bg-[#a1d6e277] focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={6}
          ></textarea>

          {/* Button with smooth loading animation */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            className={`mt-2 p-3 rounded text-white transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1995AD] hover:bg-[#107193]"
            }`}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
                className="inline-block"
              >
                🔄 Sending...
              </motion.span>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
