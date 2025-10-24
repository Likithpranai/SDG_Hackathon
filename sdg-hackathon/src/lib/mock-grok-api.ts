/**
 * Mock implementation of the Grok API service
 * This provides a local implementation that doesn't require API calls
 */
import { ArtistRecommendation } from './grok-api';

/**
 * Generate mock artist recommendations based on user preferences
 * @param preferences - User's preferences for artist collaboration
 * @returns Array of artist recommendations
 */
export async function getMockArtistRecommendations(
  preferences: string
): Promise<ArtistRecommendation[]> {
  console.log("🔍 Using mock Grok API with preferences:", preferences);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Extract keywords from preferences (simplified)
  const keywords = preferences.toLowerCase().split(/\s+/);
  
  // Create base artists
  const baseArtists: ArtistRecommendation[] = [
    {
      id: "mock-1",
      name: "Alex Rivera",
      compatibilityScore: 94,
      location: "San Francisco, USA",
      specialty: "Digital Art & 3D Modeling",
      bio: "Digital artist specializing in 3D modeling and concept art with 8 years of experience.",
      detailedAnalysis: {
        toolExpertise: {
          score: 28,
          maxScore: 30,
          rating: "Excellent",
          description: "Expert in Blender, Maya, ZBrush, and other 3D modeling tools."
        },
        artTypeAlignment: {
          score: 29,
          maxScore: 30,
          rating: "Excellent",
          description: "Specializes in digital 3D art, character design, and environment modeling."
        },
        projectRelevance: {
          score: 18,
          maxScore: 20,
          rating: "Strong",
          description: "Has worked on similar collaborative projects in the gaming industry."
        },
        experienceLevel: {
          score: 9,
          maxScore: 10,
          rating: "Excellent",
          description: "8+ years of professional experience in digital art and 3D modeling."
        },
        portfolioQuality: {
          score: 10,
          maxScore: 10,
          rating: "Exceptional",
          description: "Outstanding portfolio with major clients including AAA game studios."
        }
      },
      collaborationPotential: {
        rating: "Excellent Match (90-100%)",
        description: "This artist would be an exceptional collaborator for your project."
      },
      collaborationInsights: [
        "Expert in 3D modeling and digital art",
        "Experience with game development projects",
        "Strong technical skills in requested tools"
      ],
      portfolioHighlights: [
        {
          title: "Cyberpunk Character Series",
          year: "2023",
          medium: "3D (Blender, ZBrush)",
          description: "Character designs for sci-fi game, featured in Artstation spotlight",
          status: "Published"
        },
        {
          title: "Fantasy Environment Collection",
          year: "2022",
          medium: "3D (Maya, Substance Painter)",
          description: "Environment assets for fantasy RPG, used in commercial release",
          status: "Released"
        },
        {
          title: "Concept Art Portfolio",
          year: "2021",
          medium: "Digital (Procreate, Photoshop)",
          description: "Concept art for animated series, featured in industry showcase",
          status: "Published"
        }
      ],
      contactInformation: {
        website: "alexrivera3d.com",
        email: "alex@alexrivera3d.com",
        social: "@alexrivera3d"
      }
    },
    {
      id: "mock-2",
      name: "Sophia Chen",
      compatibilityScore: 87,
      location: "New York, USA",
      specialty: "Traditional Painting & Digital Art",
      bio: "Mixed media artist combining traditional painting techniques with digital tools.",
      detailedAnalysis: {
        toolExpertise: {
          score: 25,
          maxScore: 30,
          rating: "Strong",
          description: "Skilled in both traditional media and digital tools like Photoshop and Procreate."
        },
        artTypeAlignment: {
          score: 26,
          maxScore: 30,
          rating: "Strong",
          description: "Specializes in mixed media art combining traditional and digital techniques."
        },
        projectRelevance: {
          score: 17,
          maxScore: 20,
          rating: "Strong",
          description: "Experience with collaborative art projects and exhibitions."
        },
        experienceLevel: {
          score: 9,
          maxScore: 10,
          rating: "Excellent",
          description: "10+ years of professional experience across multiple media."
        },
        portfolioQuality: {
          score: 8,
          maxScore: 10,
          rating: "Strong",
          description: "Impressive portfolio with gallery exhibitions and commercial work."
        }
      },
      collaborationPotential: {
        rating: "Strong Match (75-89%)",
        description: "This artist would be a very good collaborator for your project."
      },
      collaborationInsights: [
        "Versatile with both traditional and digital media",
        "Strong artistic vision and unique style",
        "Experience with collaborative exhibitions"
      ],
      portfolioHighlights: [
        {
          title: "Urban Reflections",
          year: "2023",
          medium: "Mixed Media (Acrylic, Digital)",
          description: "Series exploring urban landscapes, exhibited in NYC gallery",
          status: "Exhibited"
        },
        {
          title: "Portrait Collection",
          year: "2022",
          medium: "Oil and Digital",
          description: "Commissioned portrait series combining traditional and digital techniques",
          status: "Completed"
        },
        {
          title: "Abstract Expressions",
          year: "2021",
          medium: "Mixed Media",
          description: "Experimental series exploring texture and color theory",
          status: "Exhibited"
        }
      ],
      contactInformation: {
        website: "sophiachen.art",
        email: "sophia@sophiachen.art",
        social: "@sophiachenart"
      }
    },
    {
      id: "mock-3",
      name: "Marcus Johnson",
      compatibilityScore: 82,
      location: "London, UK",
      specialty: "Animation & Motion Graphics",
      bio: "Animator and motion graphics artist specializing in character animation and VFX.",
      detailedAnalysis: {
        toolExpertise: {
          score: 27,
          maxScore: 30,
          rating: "Strong",
          description: "Expert in After Effects, Cinema 4D, and other animation software."
        },
        artTypeAlignment: {
          score: 24,
          maxScore: 30,
          rating: "Strong",
          description: "Specializes in character animation and motion graphics."
        },
        projectRelevance: {
          score: 15,
          maxScore: 20,
          rating: "Good",
          description: "Experience with animation projects similar to your requirements."
        },
        experienceLevel: {
          score: 8,
          maxScore: 10,
          rating: "Strong",
          description: "7 years of professional experience in animation and motion graphics."
        },
        portfolioQuality: {
          score: 8,
          maxScore: 10,
          rating: "Strong",
          description: "High-quality portfolio with work for major brands and studios."
        }
      },
      collaborationPotential: {
        rating: "Strong Match (75-89%)",
        description: "This artist would be a very good collaborator for your project."
      },
      collaborationInsights: [
        "Expert in animation and motion graphics",
        "Strong technical skills in requested software",
        "Experience with character animation"
      ],
      portfolioHighlights: [
        {
          title: "Character Animation Reel",
          year: "2023",
          medium: "Digital (After Effects, Cinema 4D)",
          description: "Character animations for streaming service promotions",
          status: "Published"
        },
        {
          title: "Brand Motion Package",
          year: "2022",
          medium: "Digital (After Effects)",
          description: "Motion graphics package for tech startup rebrand",
          status: "Completed"
        },
        {
          title: "Short Animation Film",
          year: "2021",
          medium: "Digital (Various)",
          description: "Award-winning short animation featured in film festivals",
          status: "Released"
        }
      ],
      contactInformation: {
        website: "marcusjohnson.io",
        email: "marcus@marcusjohnson.io",
        social: "@marcusjmotion"
      }
    },
    {
      id: "mock-4",
      name: "Priya Patel",
      compatibilityScore: 78,
      location: "Mumbai, India",
      specialty: "Illustration & Concept Art",
      bio: "Illustrator and concept artist with a focus on fantasy and sci-fi themes.",
      detailedAnalysis: {
        toolExpertise: {
          score: 23,
          maxScore: 30,
          rating: "Strong",
          description: "Skilled in Photoshop, Procreate, and traditional media."
        },
        artTypeAlignment: {
          score: 25,
          maxScore: 30,
          rating: "Strong",
          description: "Specializes in illustration and concept art for fantasy and sci-fi."
        },
        projectRelevance: {
          score: 14,
          maxScore: 20,
          rating: "Good",
          description: "Experience with illustration projects in your target industry."
        },
        experienceLevel: {
          score: 7,
          maxScore: 10,
          rating: "Good",
          description: "5 years of professional experience in illustration and concept art."
        },
        portfolioQuality: {
          score: 9,
          maxScore: 10,
          rating: "Excellent",
          description: "Exceptional portfolio with unique style and technical skill."
        }
      },
      collaborationPotential: {
        rating: "Strong Match (75-89%)",
        description: "This artist would be a very good collaborator for your project."
      },
      collaborationInsights: [
        "Strong illustration and concept art skills",
        "Unique artistic style with fantasy/sci-fi focus",
        "Experience with book and game illustration"
      ],
      portfolioHighlights: [
        {
          title: "Fantasy Book Series",
          year: "2023",
          medium: "Digital (Procreate)",
          description: "Cover art and interior illustrations for fantasy novel series",
          status: "Published"
        },
        {
          title: "Game Concept Art",
          year: "2022",
          medium: "Digital (Photoshop)",
          description: "Character and environment concepts for indie game studio",
          status: "Released"
        },
        {
          title: "Editorial Illustrations",
          year: "2021",
          medium: "Mixed Media",
          description: "Series of illustrations for major tech magazine",
          status: "Published"
        }
      ],
      contactInformation: {
        website: "priyapatelart.com",
        email: "priya@priyapatelart.com",
        social: "@priyapatelart"
      }
    },
    {
      id: "mock-5",
      name: "Carlos Mendez",
      compatibilityScore: 75,
      location: "Barcelona, Spain",
      specialty: "Photography & Digital Manipulation",
      bio: "Photographer and digital artist creating surreal and conceptual imagery.",
      detailedAnalysis: {
        toolExpertise: {
          score: 22,
          maxScore: 30,
          rating: "Strong",
          description: "Expert in photography techniques and Photoshop manipulation."
        },
        artTypeAlignment: {
          score: 21,
          maxScore: 30,
          rating: "Good",
          description: "Specializes in conceptual photography and digital manipulation."
        },
        projectRelevance: {
          score: 16,
          maxScore: 20,
          rating: "Strong",
          description: "Experience with similar conceptual art projects."
        },
        experienceLevel: {
          score: 8,
          maxScore: 10,
          rating: "Strong",
          description: "9 years of professional experience in photography and digital art."
        },
        portfolioQuality: {
          score: 8,
          maxScore: 10,
          rating: "Strong",
          description: "Impressive portfolio with exhibitions and commercial work."
        }
      },
      collaborationPotential: {
        rating: "Strong Match (75-89%)",
        description: "This artist would be a very good collaborator for your project."
      },
      collaborationInsights: [
        "Expert in photography and digital manipulation",
        "Unique conceptual and surreal style",
        "Experience with exhibition collaborations"
      ],
      portfolioHighlights: [
        {
          title: "Surreal Landscapes",
          year: "2023",
          medium: "Photography, Digital",
          description: "Series of manipulated landscape photographs, exhibited internationally",
          status: "Exhibited"
        },
        {
          title: "Conceptual Portrait Series",
          year: "2022",
          medium: "Photography, Photoshop",
          description: "Award-winning portrait series exploring identity themes",
          status: "Published"
        },
        {
          title: "Commercial Campaign",
          year: "2021",
          medium: "Photography, Digital",
          description: "Surreal imagery for major fashion brand campaign",
          status: "Published"
        }
      ],
      contactInformation: {
        website: "carlosmendez.photo",
        email: "carlos@carlosmendez.photo",
        social: "@carlosmendezcreative"
      }
    }
  ];
  
  // Adjust compatibility scores based on preferences
  const adjustedArtists = baseArtists.map(artist => {
    let adjustedScore = artist.compatibilityScore;
    
    // Simple keyword matching to adjust scores
    keywords.forEach(keyword => {
      // Check if keyword appears in specialty, bio, or collaboration insights
      if (
        artist.specialty.toLowerCase().includes(keyword) ||
        artist.bio.toLowerCase().includes(keyword) ||
        artist.collaborationInsights.some(insight => 
          insight.toLowerCase().includes(keyword)
        )
      ) {
        // Boost score for matching keywords
        adjustedScore += 2;
      }
    });
    
    // Cap at 100
    adjustedScore = Math.min(adjustedScore, 100);
    
    return {
      ...artist,
      compatibilityScore: adjustedScore
    };
  });
  
  // Sort by adjusted compatibility score
  const sortedArtists = adjustedArtists.sort(
    (a, b) => b.compatibilityScore - a.compatibilityScore
  );
  
  console.log("✅ Generated mock artist recommendations:", sortedArtists.length);
  
  return sortedArtists;
}
