import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../../api/auth";

import loginImage from "../../assets/login-hero.svg";
import logo from "../../assets/logo.svg";

export function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", {
        style: { background: "#E97171", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#E97171" },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const nameFallback = formData.email.split("@")[0];

      await authApi.register({
        name: nameFallback,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created! Please log in.", {
        style: {
          background: "#2EC1AC",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#2EC1AC",
        },
      });
      navigate("/login");
    } catch {
      toast.error("Error creating account.", {
        style: { background: "#E97171", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#E97171" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // TODO conferir a responsibilidade depois
  return (
    <div className="flex min-h-[80vh] w-full bg-white font-sans">
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImage})` }}
      />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-[360px] flex flex-col items-center">
          <img src={logo} alt="Furniro Logo" className="w-24 mb-6" />
          <h2 className="text-3xl font-bold mb-10 text-black">Sign up</h2>

          <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
            <div className="relative w-full">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="email"
                className="w-full bg-[#E8E8E8] text-black font-bold placeholder-black py-4 pl-4 pr-12 outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>

            <div className="relative w-full">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="password"
                className="w-full bg-[#E8E8E8] text-black font-bold placeholder-black py-4 pl-4 pr-12 outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
            </div>

            <div className="relative w-full">
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="confirm password"
                className="w-full bg-[#E8E8E8] text-black font-bold placeholder-black py-4 pl-4 pr-12 outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white font-bold py-4 mt-4 hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isSubmitting ? "PROCESSING..." : "Sign up"}
            </button>
          </form>

          {/* TODO perguntar para o rauny se está tudo bem esse link de retorno */}
          <div className="mt-8 text-sm text-black">
            Already registered?{" "}
            <Link to="/login" className="font-bold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
