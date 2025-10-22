import { NextRequest, NextResponse } from 'next/server';
import { findUserById } from '@/data/users';

// Endpoint to get user data by ID
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = findUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create a sanitized user object (without the password)
    const sanitizedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.userType,
      profileImage: user.profileImage || null,
      bio: user.bio || null,
      location: user.location || null,
      experience: user.experience || null,
      primaryMedium: user.primaryMedium || null,
      skills: user.skills || null,
      socialLinks: user.socialLinks || [],
    };

    return NextResponse.json({ user: sanitizedUser });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
