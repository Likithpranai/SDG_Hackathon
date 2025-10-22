import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/data/users';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user in our mock database
    const user = findUserByEmail(email);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
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

    return NextResponse.json({
      user: sanitizedUser,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
