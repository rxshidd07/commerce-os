import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getOrders, createOrder, initDb } from '@/lib/db';

initDb();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const orders = await getOrders(decoded.sub, limit, offset);
    return NextResponse.json({ orders, total: orders.length });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const {
      customer_email,
      customer_name,
      customer_phone,
      customer_address,
      total,
      payment_status,
      shipping_status,
    } = body;

    if (!customer_email || !total) {
      return NextResponse.json(
        { error: 'Customer email and total are required' },
        { status: 400 }
      );
    }

    const order = await createOrder(decoded.sub, {
      customer_email,
      customer_name: customer_name || 'Unknown',
      customer_phone: customer_phone || '',
      customer_address: customer_address || '',
      total: parseFloat(total),
      payment_status: payment_status || 'pending',
      shipping_status: shipping_status || 'pending',
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
