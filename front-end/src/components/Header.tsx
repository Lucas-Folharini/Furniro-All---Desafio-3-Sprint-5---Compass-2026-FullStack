import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "@assets/logo.svg";
import iconCart from "@assets/iconCart.svg";
import iconProfile from "@assets/iconProfile.svg";
import { useCartStore } from "@store/useCartStore";
import { useAuthStore } from "@store/useAuthStore";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); 

  const hasCartItems = useCartStore((state) => state.items.length > 0);
  const { token, logout } = useAuthStore(); 
  const navigate = useNavigate();

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleProfileClick() {
    if (!token) {
      navigate("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  }

  function handleLogout() {
    logout();
    setIsProfileOpen(false);
    closeMenu();
  }

  return (
    <>
      <header className="fixed top-0 left-0 z-[999] w-full bg-white transition-all flex justify-center shadow-sm h-[100px]">
        <div className="w-full max-w-[1183px] px-5 lg:px-0 flex items-center justify-between h-full">
          {/* =========================================
              LOGO
          ========================================= */}
          <Link
            to="/"
            className="flex flex-1 items-center justify-start relative focus:outline-none"
          >
            <img
              src={logo}
              alt="Furniro Logo"
              className="w-10 md:w-12 h-auto mr-[5px] lg:absolute lg:right-full lg:mr-0"
            />

            <span className="font-montserrat font-bold text-[28px] md:text-[34px] leading-none tracking-tight text-[#000000] lg:pl-[5px]">
              Furniro
            </span>
          </Link>

          {/* =========================================
              MENU DESKTOP
          ========================================= */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-[75px] font-poppins font-medium text-[#000000] text-base">
            <Link to="/" className="hover:text-[#B88E2F] transition-colors">
              Home
            </Link>

            <Link to="/shop" className="hover:text-[#B88E2F] transition-colors">
              Shop
            </Link>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#B88E2F] transition-colors cursor-pointer"
            >
              About
            </a>

            <Link to="/contact" className="hover:text-[#B88E2F] transition-colors">
              Contact
            </Link>
          </nav>

          {/* =========================================
              AÇÕES
          ========================================= */}
          <div className="flex flex-1 items-center justify-end gap-5 lg:gap-[35px] text-[#000000]">
            
            <div className="relative">
              <img
                src={iconProfile}
                alt="Perfil"
                onClick={handleProfileClick}
                className="w-6 lg:w-auto cursor-pointer hover:opacity-75 transition-opacity"
              />

              {isProfileOpen && token && (
                <div className="absolute right-0 mt-3 w-28 bg-white border border-gray-100 rounded-md shadow-lg flex flex-col z-50">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-left hover:bg-gray-50 hover:text-[#B88E2F] font-poppins text-sm text-black transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative">
              <img
                src={iconCart}
                alt="Carrinho"
                className="w-6 lg:w-auto cursor-pointer hover:opacity-75 transition-opacity"
              />

              {hasCartItems && (
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </Link>

            {/* =========================================
                BOTÃO HAMBURGER
            ========================================= */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden flex items-center justify-center p-1 hover:text-[#B88E2F] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================
          OVERLAY
      ========================================= */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/40 z-[998] transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* =========================================
          MENU MOBILE
      ========================================= */}
      <aside
        className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-xl z-[999] transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-5">
          <button onClick={closeMenu} className="text-3xl hover:text-[#B88E2F]">
            ×
          </button>
        </div>

        <nav className="flex flex-col px-8 gap-8 font-poppins text-lg">
          <Link to="/" onClick={closeMenu} className="hover:text-[#B88E2F]">
            Home
          </Link>

          <Link to="/shop" onClick={closeMenu} className="hover:text-[#B88E2F]">
            Shop
          </Link>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
            }}
            className="hover:text-[#B88E2F] cursor-pointer"
          >
            About
          </a>

          <Link to="/contact" onClick={closeMenu} className="hover:text-[#B88E2F]">
            Contact
          </Link>

          <hr />

          <Link to="/cart" onClick={closeMenu} className="relative w-fit hover:text-[#B88E2F]">
            Cart
            {hasCartItems && (
              <span className="absolute -right-4 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
            )}
          </Link>

          {token ? (
            <button onClick={handleLogout} className="text-left hover:text-red-500 transition-colors">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={closeMenu} className="hover:text-[#B88E2F]">
              Login / Register
            </Link>
          )}
        </nav>
      </aside>
    </>
  );
}