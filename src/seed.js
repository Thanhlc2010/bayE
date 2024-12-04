import dotenv from "dotenv";
import prisma from "./prisma/prismaClient.js";

dotenv.config(); // Load environment variables

console.log("Database URL:", process.env.DATABASE_URL);

async function main() {
    console.log("Clearing existing data...");
    await prisma.favourites.deleteMany();
    await prisma.cartags.deleteMany();
    await prisma.testdriverequests.deleteMany();
    await prisma.cars.deleteMany();
    await prisma.carmodels.deleteMany();
    await prisma.carmakes.deleteMany();
    await prisma.tags.deleteMany();
    await prisma.users.deleteMany();

    console.log("Existing data cleared. Seeding new database...");

    // Create users
    const seller = await prisma.users.create({
        data: {
            Email: "seller1@example.com",
            PasswordHash: "hashedpassword",
            Name: "Seller User",
            Role: "SELLER",
        },
    });

    const buyer = await prisma.users.create({
        data: {
            Email: "buyer1@example.com",
            PasswordHash: "hashedpassword",
            Name: "Buyer User",
            Role: "BUYER",
        },
    });

    // Create car makes
    const toyota = await prisma.carmakes.create({ data: { Name: "Toyota" } });
    const honda = await prisma.carmakes.create({ data: { Name: "Honda" } });

    // Create car models
    const corolla = await prisma.carmodels.create({ data: { Name: "Corolla", MakeID: toyota.MakeID } });
    const civic = await prisma.carmodels.create({ data: { Name: "Civic", MakeID: honda.MakeID } });

    // Create cars
    await prisma.cars.createMany({
        data: [
            {
                MakeID: toyota.MakeID,
                ModelID: corolla.ModelID,
                FactoryYear: 2020,
                KilometersCount: 30000,
                NumberOwners: 1,
                LicensePlate: "ABC-1234",
                RegistrationStatus: "remaining",
                MadeIn: "Japan",
                EngineCapacity: 1.8,
                SeatNumber: 5,
                DoorNumber: 4,
                Weight: 1500.50,
                InstallmentLengthMin: 12,
                InstallmentLengthMax: 60,
                InterestRateMin: 5,
                InterestRateMax: 15,
                MonthlyInstallmentMin: 200,
                MonthlyInstallmentMax: 800,
                Status: "selling",
                Condition: "USED",
                Price: 15000.00,
                SellerID: seller.UserID, // Reference existing seller
                BuyerID: null,
                CreatedAt: new Date(),
                SoldAt: null,
            },
            {
                MakeID: honda.MakeID,
                ModelID: civic.ModelID,
                FactoryYear: 2021,
                KilometersCount: 10000,
                NumberOwners: 1,
                LicensePlate: "LMN-9876",
                RegistrationStatus: "expired",
                MadeIn: "Thailand",
                EngineCapacity: 1.6,
                SeatNumber: 5,
                DoorNumber: 4,
                Weight: 1400.00,
                InstallmentLengthMin: 12,
                InstallmentLengthMax: 48,
                InterestRateMin: 4,
                InterestRateMax: 12,
                MonthlyInstallmentMin: 250,
                MonthlyInstallmentMax: 750,
                Status: "sold",
                Condition: "USED",
                Price: 18000.00,
                SellerID: seller.UserID, // Reference existing seller
                BuyerID: buyer.UserID, // Reference existing buyer
                CreatedAt: new Date(),
                SoldAt: new Date(),
            },
        ],
    });

    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
