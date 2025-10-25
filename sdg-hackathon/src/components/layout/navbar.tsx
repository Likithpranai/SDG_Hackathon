"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Palette,
  Users,
  ChevronRight,
  Sparkles,
  Zap,
  LogOut,
  ShoppingBag,
  Search,
  Calendar,
  UserPlus,
  User,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuth } from "@/contexts/auth-context";
import { CartButton } from "@/components/cart";

export function Navbar() {
  const { isLoggedIn, isArtist, isBuyer, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed left-0 top-0 h-full z-40 bg-white dark:bg-[#121225] border-r border-indigo-100 dark:border-indigo-900/30 w-64 flex flex-col shadow-lg overflow-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#6366f1_1px,transparent_1px)] bg-size-[20px_20px]"></div>
      </div>
      {/* Logo */}
      <div className="p-6 border-b border-indigo-100 dark:border-indigo-900/30 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <Link href="/" className="flex items-center justify-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            ArtConnect
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="flex-1 flex flex-col justify-center items-center space-y-10 py-8 px-4">
        {isLoggedIn && isArtist ? (
          // Artist Logged In Navigation
          <>
            <Link
              href="/artists/dashboard"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mb-4 mr-3">
                  <Palette className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-indigo-700 dark:text-indigo-300">
                  You
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Your profile, artwork and stats
              </p>
            </Link>

            <Link
              href="/artists/messages"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full mb-4 mr-3">
                  <MessageCircle className="h-7 w-7 text-pink-600 dark:text-pink-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-pink-700 dark:text-pink-300">
                  Messages
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Respond to buyer inquiries and commissions
              </p>
            </Link>

            <Link
              href="/artists/collaboration"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4 mr-3">
                  <Sparkles className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-purple-700 dark:text-purple-300">
                  Collaboration
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Fuel your creative vision with like-minded artists
              </p>
            </Link>

            <Link
              href="/artists/ai-lab"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4 mr-3">
                  <Zap className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-blue-700 dark:text-blue-300">
                  AI Lab
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Experiment and get feedback for your next creation
              </p>
            </Link>

            <button
              onClick={() => logout()}
              className="w-full flex flex-col items-center text-center p-5 rounded-lg border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors mt-4"
            >
              <div className="flex flex-row items-center">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4 mr-3">
                  <LogOut className="h-7 w-7 text-red-600 dark:text-red-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-red-700 dark:text-red-300">
                  Logout
                </span>
              </div>
            </button>
          </>
        ) : isLoggedIn && isBuyer ? (
          // Buyer Logged In Navigation
          <>
            <div className="flex justify-end px-4 mb-2">
              <CartButton />
            </div>
            <Link
              href="/buyers/dashboard"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4 mr-3">
                  <User className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-blue-700 dark:text-blue-300">
                  You
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Your profile and saved artworks
              </p>
            </Link>

            <Link
              href="/marketplace"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4 mr-3">
                  <Search className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-purple-700 dark:text-purple-300">
                  Marketplace
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Find your perfect artwork with AI assistance
              </p>
            </Link>

            <Link
              href="/buyers/events"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mb-4 mr-3">
                  <Calendar className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-amber-700 dark:text-amber-300">
                  Events
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Exhibitions and art events
              </p>
            </Link>

            <Link
              href="/buyers/conversations"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full mb-4 mr-3">
                  <MessageCircle className="h-7 w-7 text-pink-600 dark:text-pink-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-pink-700 dark:text-pink-300">
                  Messages
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Chat with your matched artists
              </p>
            </Link>

            <Link
              href="/buyers/matchmaking"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4 mr-3">
                  <UserPlus className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-green-700 dark:text-green-300">
                  Matchmaking
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Connect with artists that match your taste
              </p>
            </Link>

            <button
              onClick={() => logout()}
              className="w-full flex flex-col items-center text-center p-5 rounded-lg border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors mt-4"
            >
              <div className="flex flex-row items-center">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4 mr-3">
                  <LogOut className="h-7 w-7 text-red-600 dark:text-red-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-red-700 dark:text-red-300">
                  Logout
                </span>
              </div>
            </button>
          </>
        ) : (
          // Default Navigation (Not Logged In)
          <>
            <Link
              href="/login"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mb-4 mr-3">
                  <Palette className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-indigo-700 dark:text-indigo-300">
                  Artists
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Discover creators and experiment creatively
              </p>
            </Link>

            <Link
              href="/signup/buyer"
              className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
            >
              <div className="flex flex-row items-center">
                <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full mb-4 mr-3">
                  <Users className="h-7 w-7 text-pink-600 dark:text-pink-400" />
                </div>
                <span className="font-bold text-3xl mb-2 text-pink-700 dark:text-pink-300">
                  Buyers
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                Find art that resonates
              </p>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          type="button"
          className="bg-white dark:bg-indigo-900/50 p-2 rounded-md shadow-md text-indigo-600 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200 backdrop-blur-sm"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Overlay for small screens */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40",
          isMobileMenuOpen ? "block" : "hidden"
        )}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Sidebar - Slides in from left */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#121225] z-50 transform transition-transform duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle,#6366f1_1px,transparent_1px)] bg-size-[20px_20px]"></div>
        </div>
        <div className="p-6 border-b border-indigo-100 dark:border-indigo-900/30 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <Link href="/" className="flex items-center justify-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              ArtConnect
            </span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center space-y-8 py-8 px-4 h-full">
          {isLoggedIn && isArtist ? (
            // Artist Logged In Mobile Navigation
            <>
              <Link
                href="/artists/dashboard"
                className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-row items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mb-4 mr-3">
                    <Palette className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-indigo-700 dark:text-indigo-300">
                    You
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                  Your profile, artwork and stats
                </p>
              </Link>

              <Link
                href="/artists/messages"
                className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-row items-center">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full mb-4 mr-3">
                    <MessageCircle className="h-7 w-7 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-pink-700 dark:text-pink-300">
                    Messages
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                  Respond to buyer inquiries and commissions
                </p>
              </Link>

              <Link
                href="/artists/collaboration"
                className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-row items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4 mr-3">
                    <Sparkles className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-purple-700 dark:text-purple-300">
                    Collaboration
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                  Fuel your creative vision with like-minded artists
                </p>
              </Link>

              <Link
                href="/artists/ai-lab"
                className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-row items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4 mr-3">
                    <Zap className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-blue-700 dark:text-blue-300">
                    AI Lab
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                  Experiment and get feedback for your next creation
                </p>
              </Link>

              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex flex-col items-center text-center p-5 rounded-lg border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors mt-4"
              >
                <div className="flex flex-row items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4 mr-3">
                    <LogOut className="h-7 w-7 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-red-700 dark:text-red-300">
                    Logout
                  </span>
                </div>
              </button>
            </>
          ) : isLoggedIn && isBuyer ? (
            // Buyer Logged In Mobile Navigation
            <>
              <div className="flex justify-end px-4 mb-2">
                <CartButton />
              </div>
              <Link
                href="/buyers/dashboard"
                className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-row items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4 mr-3">
                    <User className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-blue-700 dark:text-blue-300">
                    You
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                  Your profile and saved artworks
                </p>
              </Link>

              <Link
                href="/marketplace"
                className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-row items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4 mr-3">
                    <Search className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-purple-700 dark:text-purple-300">
                    Marketplace
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                  Find your perfect artwork with AI assistance
                </p>
              </Link>

              <Link
                href="/buyers/matchmaking"
                className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-row items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4 mr-3">
                    <UserPlus className="h-7 w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-green-700 dark:text-green-300">
                    Matchmaking
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                  Connect with artists that match your taste
                </p>
              </Link>


              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex flex-col items-center text-center p-5 rounded-lg border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors mt-4"
              >
                <div className="flex flex-row items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4 mr-3">
                    <LogOut className="h-7 w-7 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-red-700 dark:text-red-300">
                    Logout
                  </span>
                </div>
              </button>
            </>
          ) : (
            // Default Mobile Navigation (Not Logged In)
            <>
              <Link
                href="/login"
                className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-row items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mb-4 mr-3">
                    <Palette className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-indigo-700 dark:text-indigo-300">
                    Artists
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                  Discover creators and experiment creatively
                </p>
              </Link>

              <Link
                href="/signup/buyer"
                className="w-full flex flex-col items-center text-center p-5 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-row items-center">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full mb-4 mr-3">
                    <Users className="h-7 w-7 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="font-bold text-3xl mb-2 text-pink-700 dark:text-pink-300">
                    Buyers
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
                  Find art that resonates
                </p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
