import { NextResponse } from 'next/server';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://backend-lagunaclub.onrender.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_URL}/api/v1/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('[REGISTER_API]', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Error al conectar con el servidor',
      },
      {
        status: 500,
      }
    );
  }
}