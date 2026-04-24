import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getProducts(query) {
  let { page = 1, limit = 10, sortBy = "id", order = "asc", fields } = query;

  // 🔢 Convert
  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    throw new Error("Invalid page or limit");
  }

  const MAX_LIMIT = 100;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const skip = (page - 1) * limit;

  // ✅ WHITELIST (VERY IMPORTANT)
  const allowedFields = [
    "id",
    "name",
    "price",
    "description",
    "createdAt",
    "updatedAt"
  ];

  let select = undefined;

  if (fields) {
    const requestedFields = fields.split(",");

    // ❌ Validate fields
    for (const field of requestedFields) {
      if (!allowedFields.includes(field)) {
        throw new Error(`Invalid field: ${field}`);
      }
    }

    // ✅ Build select object
    select = {};
    requestedFields.forEach(field => {
      select[field] = true;
    });
  }

  // ❌ Prevent invalid sortBy crash
  if (!allowedFields.includes(sortBy)) {
    throw new Error("Invalid sort field");
  }

  const products = await prisma.product.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: order === "desc" ? "desc" : "asc",
    },
    ...(select && { select }),
  });

  const total = await prisma.product.count();

  return {
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data: products,
  };
}

export async function getProductById(id) {
  return prisma.product.findUnique({
    where: { id },
  });
}