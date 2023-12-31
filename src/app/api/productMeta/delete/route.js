import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prismaClient = new PrismaClient();

BigInt.prototype.toJSON = function () {
    return this.toString();
};

export async function DELETE(request, response) {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');
    try {
        const deleteProductMeta = prismaClient.productMeta.delete({
            where: { id: id },
        });

        const result = await prismaClient.$transaction([deleteProductMeta]);

        return await NextResponse.json({ data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 'failed', data: error.toString() });
    }
}
