import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth/auth-service';

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

    // Use AuthService to handle login
    const result = await AuthService.login(email, password);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.message || 'Invalid email or password' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: result.user,
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
