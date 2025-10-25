import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/data/users';

// In a real app, this would connect to a database
let nextUserId = users.length + 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, userType } = body;

    if (!email || !password || !name || !userType) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: String(nextUserId++),
      email,
      password, // In a real app, this would be hashed
      name,
      userType,
      profileImage: '/placeholder-profile.jpg',
    };

    // Add to our mock database
    users.push(newUser);

    // Create a sanitized user object (without the password)
    const sanitizedUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      userType: newUser.userType,
      profileImage: newUser.profileImage,
    };

    return NextResponse.json({
      user: sanitizedUser,
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
