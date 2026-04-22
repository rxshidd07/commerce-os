import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getProducts, createProduct, initDb } from '@/lib/db';

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

    const products = await getProducts(decoded.sub, limit, offset);
    return NextResponse.json({ products, total: products.length });
  } catch (error) {
    console.error('Get products error:', error);
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
    const { title, description, price, sku, inventory, category, image, status } = body;

    if (!title || !price) {
      return NextResponse.json(
        { error: 'Title and price are required' },
        { status: 400 }
      );
    }

    const product = await createProduct(decoded.sub, {
      title,
      description: description || '',
      price: parseFloat(price),
      sku: sku || `SKU-${Date.now()}`,
      inventory: parseInt(inventory) || 0,
      category: category || 'Uncategorized',
      image: image || '/api/placeholder/400/300',
      status: status || 'active',
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
