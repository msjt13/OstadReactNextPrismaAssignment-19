import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prismaClient = new PrismaClient();

BigInt.prototype.toJSON = function () {
    return this.toString();
};

export async function GET(request, response) {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');
    try {
        let query;

        if (id) {
            query = prismaClient.productReview.findUnique({
                where: { id: id },
            });
        } else {
            query = prismaClient.productReview.findMany();
        }

        const result = await prismaClient.$transaction([query]);

        return await NextResponse.json({ data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 'failed', data: error.toString() });
    }
}
