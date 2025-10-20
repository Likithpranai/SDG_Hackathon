import React from 'react';
import Image from 'next/image';
import { Brush, Users, DollarSign, Award, Lightbulb, Heart } from 'lucide-react';

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About ArtConnect</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Empowering Hong Kong's art community through technology, connection, and opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ArtConnect was founded with a clear mission: to address the challenges faced by artists in Hong Kong's vibrant but often fragmented art ecosystem.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We believe that every artist deserves recognition, fair compensation, and the opportunity to collaborate with like-minded creatives. Our platform bridges the gap between artists and their audience, creating a thriving community where artistic talent can flourish.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                By leveraging technology and the power of community, we're building a more inclusive, supportive, and sustainable art ecosystem in Hong Kong.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/about-mission.jpg"
                alt="Artists collaborating"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full inline-flex mb-4">
                <Award className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Recognition</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe in highlighting the unique talents and perspectives of every artist, ensuring their work receives the attention it deserves.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="bg-secondary-100 dark:bg-secondary-900 p-3 rounded-full inline-flex mb-4">
                <DollarSign className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fair Compensation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to creating an environment where artists can sustainably pursue their passion by connecting them with buyers who value their work.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="bg-accent-100 dark:bg-accent-900 p-3 rounded-full inline-flex mb-4">
                <Users className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We foster meaningful connections between artists, enabling collaboration, mutual support, and collective growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <Brush className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Artwork Showcase</h3>
              <p className="text-gray-600 dark:text-gray-400">
                A beautiful, responsive platform to display your art to potential buyers, collectors, and collaborators.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <Lightbulb className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">AI-Powered Discovery</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intelligent recommendations that connect artists with buyers who appreciate their specific style and medium.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <Users className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Collaboration Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Resources to find and connect with fellow artists for joint projects, exhibitions, and creative partnerships.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <Heart className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Supportive Community</h3>
              <p className="text-gray-600 dark:text-gray-400">
                A network of like-minded individuals who provide feedback, encouragement, and accountability.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <DollarSign className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Fair Pricing Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Resources to help artists price their work appropriately based on medium, size, experience, and market trends.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <Award className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Exhibition Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Information about galleries, events, and virtual exhibitions where artists can showcase their work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're an artist looking to showcase your work or an art enthusiast searching for unique pieces, ArtConnect is the platform for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-white text-primary-900 hover:bg-gray-100"
            >
              Sign Up Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
