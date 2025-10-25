/**
 * Mock data store for the application
 * This simulates a database for the demo application
 */

// Define the artwork type
export interface Artwork {
  id: string;
  title: string;
  image: string;
  description: string;
  technique: string;
  year: number;
  likes: number;
  views: number;
  width: string;
}

// Initial artwork data
const initialArtworks: Artwork[] = [
  { 
    id: "IMG001", 
    title: "Urban Pulse", 
    image: "https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/135189/302182/handmade%2Fdownscaled%2Fh_nvobyh5ndmh_2000x2000__80266.1745219873.jpg?c=2", 
    description: "Bold red/orange swirls in Procreate. 300 DPI export for mural printing. Exhibited: Zona MACO 2024. Status: Sold as NFT + Print",
    technique: "Digital (Procreate)",
    year: 2024,
    likes: 124, 
    views: 756,
    width: "wide", // For Pinterest-style layout
  },
  { 
    id: "IMG002", 
    title: "Silent Storm", 
    image: "https://images.saatchiart.com/saatchi/1368549/art/6989891/6059227-HSC00001-7.jpg", 
    description: "Layered blues with 50+ adjustment layers. NFT drop on Foundation. Status: Sold as NFT",
    technique: "Digital (Photoshop)",
    year: 2023,
    likes: 98, 
    views: 502,
    width: "medium", 
  },
  { 
    id: "IMG003", 
    title: "City Dreams", 
    image: "https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/135189/302182/handmade%2Fdownscaled%2Fh_nvobyh5ndmh_2000x2000__80266.1745219873.jpg?c=2", 
    description: "Metro ticket scans composited in Photoshop. Airbnb HQ digital wallpaper. Status: Licensed",
    technique: "Digital (Procreate + Collage)",
    year: 2022,
    likes: 132, 
    views: 815,
    width: "tall", 
  },
  { 
    id: "IMG004", 
    title: "Echoes", 
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400", 
    description: "Gradient mesh circles. OpenSea NFT collection (1/10 editions). Status: Sold out",
    technique: "Digital Painting (Procreate)",
    year: 2021,
    likes: 187, 
    views: 1024,
    width: "medium", 
  },
  { 
    id: "IMG005", 
    title: "Mexico City Mural - Digital Concept", 
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400", 
    description: "20ft mural concept rendered at 8K. Used for city approval. Status: Physical mural completed",
    technique: "Digital Mockup (Photoshop)",
    year: 2023,
    likes: 76, 
    views: 438,
    width: "wide", 
  },
];

// Create a class to manage the data
class MockDataStore {
  private artworks: Artwork[] = [...initialArtworks];
  
  // Get all artworks
  getArtworks(): Artwork[] {
    return [...this.artworks];
  }
  
  // Add a new artwork
  addArtwork(artwork: Omit<Artwork, 'id' | 'likes' | 'views'>): Artwork {
    // Generate a unique ID
    const newId = `IMG${(this.artworks.length + 1).toString().padStart(3, '0')}`;
    
    // Create the new artwork with default likes and views
    const newArtwork: Artwork = {
      ...artwork,
      id: newId,
      likes: 0,
      views: 0,
      width: artwork.width || "medium"
    };
    
    // Add to the beginning of the array
    this.artworks.unshift(newArtwork);
    
    return newArtwork;
  }
}

// Create and export a singleton instance
export const mockDataStore = new MockDataStore();
