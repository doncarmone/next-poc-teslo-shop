import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
    console.log("Cleaning database...");

    // await Promise.all([
    await prisma.user.deleteMany()

    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    // ]);

    console.log("Starting database seeding...");

    //Categories

    const { categories, products, users } = initialData;


    const categoriesData = categories.map((name) => ({ name }));

    await prisma.category.createMany({
        data: categoriesData
    })

    //Users
    await prisma.user.createMany({
        data: users
    })

    const dbCategories = await prisma.category.findMany();

    const categoriesMap = dbCategories.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>); // <string=shirt, string=categoryId>

    //Products
    products.forEach(async (product) => {
        const { type, images, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        });

        //Product Images

        const imagesData = images.map((image) => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        });
    });


    console.log("Database seeding completed.");
}


(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})(); 