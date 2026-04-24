import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'], // keep this ON to prove fix
});

// ✅ FIXED: Single query (NO LOOP)
export async function getOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true, // 🔥 joins user in same query
    },
  });

  return orders;
}

// ✅ Also fix single order API
export async function getOrderById(id) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
}