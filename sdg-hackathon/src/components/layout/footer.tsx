import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">ArtConnect</span>
              </Link>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Connecting Hong Kong artists with opportunities, recognition, and fair compensation.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="mailto:info@artconnect.hk" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  <span className="sr-only">Email</span>
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                Explore
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/explore" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Browse Artworks
                  </Link>
                </li>
                <li>
                  <Link href="/artists" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Find Artists
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Events & Exhibitions
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Artists */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                For Artists
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/upload" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Upload Artwork
                  </Link>
                </li>
                <li>
                  <Link href="/artist-resources" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/collaborations" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Find Collaborators
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Pricing Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ArtConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
