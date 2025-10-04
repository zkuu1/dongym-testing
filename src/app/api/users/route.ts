// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]/route';
// import prisma from '@/lib/prisma';

// export async function GET(request: NextRequest) {
//   const session = await getServerSession(authOptions);
  
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     const { searchParams } = new URL(request.url);
//     const query = searchParams.get('query') || '';
//     const page = parseInt(searchParams.get('page') || '1');
//     const limit = 10;
//     const skip = (page - 1) * limit;

//     // Build where clause for search
//     const where = query ? {
//       OR: [
//         { name: { contains: query, mode: 'insensitive' } },
//         { membershipId: { contains: query, mode: 'insensitive' } }
//       ]
//     } : {};

//     // Get users with pagination
//     const users = await prisma.user.findMany({
//       where,
//       skip,
//       take: limit,
//       include: {
//         membership: true
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     // Get total count for pagination
//     const totalUsers = await prisma.user.count({ where });

//     return NextResponse.json({ 
//       users, 
//       totalUsers,
//       totalPages: Math.ceil(totalUsers / limit),
//       currentPage: page
//     });
//   } catch (error) {
//     console.error('Failed to fetch users:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch users' }, 
//       { status: 500 }
//     );
//   }
// }