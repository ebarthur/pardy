import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const categories = [
		{ id: 1, name: "Music" },
		{ id: 2, name: "Online" },
		{ id: 3, name: "Technology" },
		{ id: 4, name: "Art" },
		{ id: 5, name: "Other" },
	];

	for (const category of categories) {
		await prisma.category.upsert({
			where: { id: category.id },
			update: {},
			create: {
				id: category.id,
				name: category.name,
			},
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Seed successful");
		await prisma.$disconnect();
	});
