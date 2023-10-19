import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prismaClient = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

BigInt.prototype.toJSON = function () {
    return this.toString();
};

export async function POST(request, response) {
    console.log('Current Date: ', new Date().toISOString());
    try {
        const requestBody = await request.json();
        const id = requestBody.id ? requestBody.id : 0;
        const createCart = prismaClient.cart.upsert({
            where: { id: id },
            update: requestBody,
            create: requestBody,
        });

        const result = await prismaClient.$transaction([createCart]);

        return await NextResponse.json({ data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 'failed', data: error.toString() });
    }
}
