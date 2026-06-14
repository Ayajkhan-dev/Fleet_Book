import { getDb } from "../api/queries/connection";
import { users, vehicles, bookings, reviews } from "./schema";
import { eq } from "drizzle-orm";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  const existingAdmin = await db.select().from(users).where(eq(users.role, "admin")).limit(1);
  if (existingAdmin.length > 0) {
    console.log("Database already seeded. Skipping...");
    return;
  }

  // ========== ADMIN ==========
  await db.insert(users).values({
    name: "FleetBook Admin",
    email: "admin@fleetbook.in",
    phone: "9999999999",
    password: "$2a$10$adminhashplaceholder",
    role: "admin",
    status: "active",
    city: "Delhi",
  });
  console.log("Admin created");

  // ========== OPERATORS ==========
  const operatorsData = [
    {
      name: "Rajesh Sharma",
      email: "rajesh@sharmacars.in",
      phone: "9876543210",
      role: "operator" as const,
      businessName: "Sharma Fleet Services",
      city: "Lucknow",
      operatingCities: "Lucknow,Kanpur,Allahabad",
      gstNumber: "09ABCDE1234F1Z5",
      yearsInBusiness: 8,
      documents: JSON.stringify({ aadhaar: "/docs/aadhaar1.jpg", pan: "/docs/pan1.jpg" }),
      status: "active" as const,
      rating: "4.5",
      totalReviews: 12,
    },
    {
      name: "Amit Verma",
      email: "amit@vermarides.in",
      phone: "8765432109",
      role: "operator" as const,
      businessName: "Verma Wedding Wheels",
      city: "Kanpur",
      operatingCities: "Kanpur,Lucknow,Varanasi",
      gstNumber: "09FGHIJ5678K2Z6",
      yearsInBusiness: 5,
      documents: JSON.stringify({ aadhaar: "/docs/aadhaar2.jpg", pan: "/docs/pan2.jpg" }),
      status: "active" as const,
      rating: "4.2",
      totalReviews: 8,
    },
    {
      name: "Suresh Gupta",
      email: "suresh@guptafleet.com",
      phone: "7654321098",
      role: "operator" as const,
      businessName: "Gupta Luxury Fleet",
      city: "Agra",
      operatingCities: "Agra,Delhi,Jaipur",
      gstNumber: "08KLMNO9012P3Z7",
      yearsInBusiness: 12,
      documents: JSON.stringify({ aadhaar: "/docs/aadhaar3.jpg", pan: "/docs/pan3.jpg" }),
      status: "active" as const,
      rating: "4.8",
      totalReviews: 15,
    },
    {
      name: "Pawan Kumar",
      email: "pawan@kumarfleet.in",
      phone: "6543210987",
      role: "operator" as const,
      businessName: "Kumar Event Cars",
      city: "Varanasi",
      operatingCities: "Varanasi,Lucknow,Allahabad",
      gstNumber: "09QRSTU3456V4Z8",
      yearsInBusiness: 3,
      documents: JSON.stringify({ aadhaar: "/docs/aadhaar4.jpg", pan: "/docs/pan4.jpg" }),
      status: "active" as const,
      rating: "4.0",
      totalReviews: 5,
    },
    {
      name: "Vikram Singh",
      email: "vikram@singhcars.in",
      phone: "5432109876",
      role: "operator" as const,
      businessName: "Singh Royal Rides",
      city: "Delhi",
      operatingCities: "Delhi,Noida,Ghaziabad",
      gstNumber: "07WXYAB7890C5Z9",
      yearsInBusiness: 10,
      documents: JSON.stringify({ aadhaar: "/docs/aadhaar5.jpg", pan: "/docs/pan5.jpg" }),
      status: "active" as const,
      rating: "4.6",
      totalReviews: 20,
    },
  ];

  const insertedOperators = [];
  for (const op of operatorsData) {
    const result = await db.insert(users).values(op);
    insertedOperators.push({ id: Number(result[0].insertId), ...op });
  }
  console.log(`${insertedOperators.length} operators created`);

  // ========== CUSTOMERS ==========
  const customersData = [
    { name: "Ankit Mishra", email: "ankit@email.com", phone: "9876501234", role: "customer" as const, status: "active" as const, city: "Lucknow" },
    { name: "Priya Patel", email: "priya@email.com", phone: "8765012345", role: "customer" as const, status: "active" as const, city: "Kanpur" },
    { name: "Rohan Agarwal", email: "rohan@email.com", phone: "7650123456", role: "customer" as const, status: "active" as const, city: "Agra" },
    { name: "Sneha Gupta", email: "sneha@email.com", phone: "6540123456", role: "customer" as const, status: "active" as const, city: "Delhi" },
    { name: "Mohit Tiwari", email: "mohit@email.com", phone: "5430123456", role: "customer" as const, status: "active" as const, city: "Varanasi" },
  ];

  const insertedCustomers = [];
  for (const cust of customersData) {
    const result = await db.insert(users).values(cust);
    insertedCustomers.push({ id: Number(result[0].insertId), ...cust });
  }
  console.log(`${insertedCustomers.length} customers created`);

  // ========== VEHICLES ==========
  const vehiclesData = [
    { operatorId: insertedOperators[0].id, vehicleNumber: "UP32AB1234", type: "innova" as const, capacity: 7, year: 2023, photos: JSON.stringify(["/cars/innova1.jpg"]), pricePerDay: "3500.00", driverName: "Ramesh", driverPhone: "9876500001", isAvailable: true },
    { operatorId: insertedOperators[0].id, vehicleNumber: "UP32CD5678", type: "innova" as const, capacity: 7, year: 2022, photos: JSON.stringify(["/cars/innova2.jpg"]), pricePerDay: "3200.00", driverName: "Suresh", driverPhone: "9876500002", isAvailable: true },
    { operatorId: insertedOperators[0].id, vehicleNumber: "UP32EF9012", type: "sedan" as const, capacity: 4, year: 2023, photos: JSON.stringify(["/cars/sedan1.jpg"]), pricePerDay: "2500.00", driverName: "Mahesh", driverPhone: "9876500003", isAvailable: true },
    { operatorId: insertedOperators[0].id, vehicleNumber: "UP32GH3456", type: "sedan" as const, capacity: 4, year: 2021, photos: JSON.stringify(["/cars/sedan2.jpg"]), pricePerDay: "2200.00", driverName: "Dinesh", driverPhone: "9876500004", isAvailable: true },
    { operatorId: insertedOperators[0].id, vehicleNumber: "UP32IJ7890", type: "fortuner" as const, capacity: 7, year: 2024, photos: JSON.stringify(["/cars/fortuner1.jpg"]), pricePerDay: "8000.00", driverName: "Naresh", driverPhone: "9876500005", isAvailable: true },
    { operatorId: insertedOperators[0].id, vehicleNumber: "UP32KL1234", type: "tempo" as const, capacity: 12, year: 2022, photos: JSON.stringify(["/cars/tempo1.jpg"]), pricePerDay: "5000.00", driverName: "Rajesh D", driverPhone: "9876500006", isAvailable: true },
    { operatorId: insertedOperators[0].id, vehicleNumber: "UP32MN5678", type: "luxury" as const, capacity: 4, year: 2024, photos: JSON.stringify(["/cars/luxury1.jpg"]), pricePerDay: "12000.00", driverName: "Ashok", driverPhone: "9876500007", isAvailable: true },
    { operatorId: insertedOperators[0].id, vehicleNumber: "UP32OP9012", type: "innova" as const, capacity: 7, year: 2023, photos: JSON.stringify(["/cars/innova3.jpg"]), pricePerDay: "3500.00", driverName: "Vinod", driverPhone: "9876500008", isAvailable: true },

    { operatorId: insertedOperators[1].id, vehicleNumber: "UP78AB1234", type: "innova" as const, capacity: 7, year: 2023, photos: JSON.stringify(["/cars/innova4.jpg"]), pricePerDay: "3400.00", driverName: "Prakash", driverPhone: "8765100001", isAvailable: true },
    { operatorId: insertedOperators[1].id, vehicleNumber: "UP78CD5678", type: "sedan" as const, capacity: 4, year: 2022, photos: JSON.stringify(["/cars/sedan3.jpg"]), pricePerDay: "2300.00", driverName: "Mukesh", driverPhone: "8765100002", isAvailable: true },
    { operatorId: insertedOperators[1].id, vehicleNumber: "UP78EF9012", type: "sedan" as const, capacity: 4, year: 2023, photos: JSON.stringify(["/cars/sedan4.jpg"]), pricePerDay: "2600.00", driverName: "Arun", driverPhone: "8765100003", isAvailable: true },
    { operatorId: insertedOperators[1].id, vehicleNumber: "UP78GH3456", type: "fortuner" as const, capacity: 7, year: 2024, photos: JSON.stringify(["/cars/fortuner2.jpg"]), pricePerDay: "8500.00", driverName: "Kiran", driverPhone: "8765100004", isAvailable: true },
    { operatorId: insertedOperators[1].id, vehicleNumber: "UP78IJ7890", type: "tempo" as const, capacity: 12, year: 2023, photos: JSON.stringify(["/cars/tempo2.jpg"]), pricePerDay: "5500.00", driverName: "Deepak", driverPhone: "8765100005", isAvailable: true },
    { operatorId: insertedOperators[1].id, vehicleNumber: "UP78KL1234", type: "innova" as const, capacity: 7, year: 2022, photos: JSON.stringify(["/cars/innova5.jpg"]), pricePerDay: "3100.00", driverName: "Sanjay", driverPhone: "8765100006", isAvailable: true },

    { operatorId: insertedOperators[2].id, vehicleNumber: "UP80AB1234", type: "luxury" as const, capacity: 4, year: 2024, photos: JSON.stringify(["/cars/luxury2.jpg"]), pricePerDay: "15000.00", driverName: "Harish", driverPhone: "7654100001", isAvailable: true },
    { operatorId: insertedOperators[2].id, vehicleNumber: "UP80CD5678", type: "luxury" as const, capacity: 4, year: 2024, photos: JSON.stringify(["/cars/luxury3.jpg"]), pricePerDay: "14000.00", driverName: "Manish", driverPhone: "7654100002", isAvailable: true },
    { operatorId: insertedOperators[2].id, vehicleNumber: "UP80EF9012", type: "fortuner" as const, capacity: 7, year: 2023, photos: JSON.stringify(["/cars/fortuner3.jpg"]), pricePerDay: "7500.00", driverName: "Pankaj", driverPhone: "7654100003", isAvailable: true },
    { operatorId: insertedOperators[2].id, vehicleNumber: "UP80GH3456", type: "fortuner" as const, capacity: 7, year: 2024, photos: JSON.stringify(["/cars/fortuner4.jpg"]), pricePerDay: "9000.00", driverName: "Rahul", driverPhone: "7654100004", isAvailable: true },
    { operatorId: insertedOperators[2].id, vehicleNumber: "UP80IJ7890", type: "innova" as const, capacity: 7, year: 2023, photos: JSON.stringify(["/cars/innova6.jpg"]), pricePerDay: "3600.00", driverName: "Neeraj", driverPhone: "7654100005", isAvailable: true },
    { operatorId: insertedOperators[2].id, vehicleNumber: "UP80KL1234", type: "innova" as const, capacity: 7, year: 2023, photos: JSON.stringify(["/cars/innova7.jpg"]), pricePerDay: "3700.00", driverName: "Vijay", driverPhone: "7654100006", isAvailable: true },
    { operatorId: insertedOperators[2].id, vehicleNumber: "UP80MN5678", type: "innova" as const, capacity: 7, year: 2022, photos: JSON.stringify(["/cars/innova8.jpg"]), pricePerDay: "3300.00", driverName: "Ajay", driverPhone: "7654100007", isAvailable: true },
    { operatorId: insertedOperators[2].id, vehicleNumber: "UP80OP9012", type: "sedan" as const, capacity: 4, year: 2023, photos: JSON.stringify(["/cars/sedan5.jpg"]), pricePerDay: "2400.00", driverName: "Rajiv", driverPhone: "7654100008", isAvailable: true },
    { operatorId: insertedOperators[2].id, vehicleNumber: "UP80QR3456", type: "sedan" as const, capacity: 4, year: 2022, photos: JSON.stringify(["/cars/sedan6.jpg"]), pricePerDay: "2200.00", driverName: "Sunil", driverPhone: "7654100009", isAvailable: true },
    { operatorId: insertedOperators[2].id, vehicleNumber: "UP80ST7890", type: "tempo" as const, capacity: 16, year: 2023, photos: JSON.stringify(["/cars/tempo3.jpg"]), pricePerDay: "6000.00", driverName: "Gopal", driverPhone: "7654100010", isAvailable: true },

    { operatorId: insertedOperators[3].id, vehicleNumber: "UP65AB1234", type: "innova" as const, capacity: 7, year: 2022, photos: JSON.stringify(["/cars/innova9.jpg"]), pricePerDay: "3000.00", driverName: "Lalit", driverPhone: "6543100001", isAvailable: true },
    { operatorId: insertedOperators[3].id, vehicleNumber: "UP65CD5678", type: "innova" as const, capacity: 7, year: 2023, photos: JSON.stringify(["/cars/innova10.jpg"]), pricePerDay: "3200.00", driverName: "Amit K", driverPhone: "6543100002", isAvailable: true },
    { operatorId: insertedOperators[3].id, vehicleNumber: "UP65EF9012", type: "sedan" as const, capacity: 4, year: 2022, photos: JSON.stringify(["/cars/sedan7.jpg"]), pricePerDay: "2000.00", driverName: "Ravi", driverPhone: "6543100003", isAvailable: true },
    { operatorId: insertedOperators[3].id, vehicleNumber: "UP65GH3456", type: "sedan" as const, capacity: 4, year: 2021, photos: JSON.stringify(["/cars/sedan8.jpg"]), pricePerDay: "1800.00", driverName: "Sachin", driverPhone: "6543100004", isAvailable: true },
    { operatorId: insertedOperators[3].id, vehicleNumber: "UP65IJ7890", type: "tempo" as const, capacity: 12, year: 2022, photos: JSON.stringify(["/cars/tempo4.jpg"]), pricePerDay: "4500.00", driverName: "Vivek", driverPhone: "6543100005", isAvailable: true },

    { operatorId: insertedOperators[4].id, vehicleNumber: "DL01AB1234", type: "luxury" as const, capacity: 4, year: 2024, photos: JSON.stringify(["/cars/luxury4.jpg"]), pricePerDay: "18000.00", driverName: "Tarun", driverPhone: "5432100001", isAvailable: true },
    { operatorId: insertedOperators[4].id, vehicleNumber: "DL01CD5678", type: "luxury" as const, capacity: 4, year: 2024, photos: JSON.stringify(["/cars/luxury5.jpg"]), pricePerDay: "20000.00", driverName: "Siddharth", driverPhone: "5432100002", isAvailable: true },
    { operatorId: insertedOperators[4].id, vehicleNumber: "DL01EF9012", type: "fortuner" as const, capacity: 7, year: 2024, photos: JSON.stringify(["/cars/fortuner5.jpg"]), pricePerDay: "10000.00", driverName: "Anil", driverPhone: "5432100003", isAvailable: true },
    { operatorId: insertedOperators[4].id, vehicleNumber: "DL01GH3456", type: "fortuner" as const, capacity: 7, year: 2023, photos: JSON.stringify(["/cars/fortuner6.jpg"]), pricePerDay: "8500.00", driverName: "Varun", driverPhone: "5432100004", isAvailable: true },
    { operatorId: insertedOperators[4].id, vehicleNumber: "DL01IJ7890", type: "innova" as const, capacity: 7, year: 2023, photos: JSON.stringify(["/cars/innova11.jpg"]), pricePerDay: "4000.00", driverName: "Kunal", driverPhone: "5432100005", isAvailable: true },
    { operatorId: insertedOperators[4].id, vehicleNumber: "DL01KL1234", type: "innova" as const, capacity: 7, year: 2023, photos: JSON.stringify(["/cars/innova12.jpg"]), pricePerDay: "3800.00", driverName: "Rohit", driverPhone: "5432100006", isAvailable: true },
    { operatorId: insertedOperators[4].id, vehicleNumber: "DL01MN5678", type: "tempo" as const, capacity: 16, year: 2023, photos: JSON.stringify(["/cars/tempo5.jpg"]), pricePerDay: "7000.00", driverName: "Mohit S", driverPhone: "5432100007", isAvailable: true },
  ];

  for (const v of vehiclesData) {
    await db.insert(vehicles).values(v);
  }
  console.log(`${vehiclesData.length} vehicles created`);

  // ========== BOOKINGS ==========
  const bookingsData = [
    { customerId: insertedCustomers[0].id, operatorId: insertedOperators[0].id, carsRequested: 5, vehicleType: "innova", pickupAddress: "123 Gomti Nagar, Lucknow", dropAddress: "Taj Hotel, Lucknow", eventDate: new Date("2025-12-15"), returnDate: new Date("2025-12-17"), eventTime: "08:00 AM", specialInstructions: "Decorated cars for wedding", totalAmount: "35000.00", platformFee: "3500.00", operatorAmount: "31500.00", status: "confirmed" as const, paymentStatus: "paid" as const },
    { customerId: insertedCustomers[1].id, operatorId: insertedOperators[1].id, carsRequested: 3, vehicleType: "sedan", pickupAddress: "45 Civil Lines, Kanpur", dropAddress: "Meridian Hotel, Kanpur", eventDate: new Date("2025-12-20"), returnDate: new Date("2025-12-20"), eventTime: "10:00 AM", specialInstructions: "Corporate event pickup", totalAmount: "6900.00", platformFee: "690.00", operatorAmount: "6210.00", status: "pending" as const, paymentStatus: "unpaid" as const },
    { customerId: insertedCustomers[2].id, operatorId: insertedOperators[2].id, carsRequested: 8, vehicleType: "luxury", pickupAddress: "Taj Mahal Road, Agra", dropAddress: "ITC Mughal, Agra", eventDate: new Date("2025-11-25"), returnDate: new Date("2025-11-26"), eventTime: "06:00 PM", specialInstructions: "VIP wedding - need decorated cars", totalAmount: "120000.00", platformFee: "12000.00", operatorAmount: "108000.00", status: "completed" as const, paymentStatus: "paid" as const },
    { customerId: insertedCustomers[3].id, operatorId: insertedOperators[4].id, carsRequested: 6, vehicleType: "fortuner", pickupAddress: "Connaught Place, Delhi", dropAddress: "Leela Palace, Delhi", eventDate: new Date("2026-01-10"), returnDate: new Date("2026-01-12"), eventTime: "07:00 AM", specialInstructions: "All white cars preferred", totalAmount: "60000.00", platformFee: "6000.00", operatorAmount: "54000.00", status: "pending" as const, paymentStatus: "unpaid" as const },
    { customerId: insertedCustomers[4].id, operatorId: insertedOperators[3].id, carsRequested: 4, vehicleType: "innova", pickupAddress: "Assi Ghat, Varanasi", dropAddress: "Taj Ganges, Varanasi", eventDate: new Date("2026-01-05"), returnDate: new Date("2026-01-05"), eventTime: "09:00 AM", specialInstructions: "Religious ceremony", totalAmount: "12800.00", platformFee: "1280.00", operatorAmount: "11520.00", status: "confirmed" as const, paymentStatus: "paid" as const },
    { customerId: insertedCustomers[0].id, operatorId: insertedOperators[2].id, carsRequested: 3, vehicleType: "sedan", pickupAddress: "Sadar Bazaar, Agra", dropAddress: "Agra Cantt Railway Station", eventDate: new Date("2025-10-20"), returnDate: new Date("2025-10-20"), eventTime: "05:00 AM", specialInstructions: "Airport drop", totalAmount: "6600.00", platformFee: "660.00", operatorAmount: "5940.00", status: "completed" as const, paymentStatus: "paid" as const },
    { customerId: insertedCustomers[1].id, operatorId: insertedOperators[0].id, carsRequested: 10, vehicleType: "innova", pickupAddress: "Hazratganj, Lucknow", dropAddress: "La Martiniere College, Lucknow", eventDate: new Date("2026-02-14"), returnDate: new Date("2026-02-15"), eventTime: "11:00 AM", specialInstructions: "Valentine's Day wedding - decorated cars", totalAmount: "70000.00", platformFee: "7000.00", operatorAmount: "63000.00", status: "pending" as const, paymentStatus: "unpaid" as const },
    { customerId: insertedCustomers[3].id, operatorId: insertedOperators[1].id, carsRequested: 2, vehicleType: "tempo", pickupAddress: "IIT Kanpur", dropAddress: "Kanpur Airport", eventDate: new Date("2026-03-01"), returnDate: new Date("2026-03-01"), eventTime: "03:00 PM", specialInstructions: "Guest pickup from airport", totalAmount: "11000.00", platformFee: "1100.00", operatorAmount: "9900.00", status: "cancelled" as const, paymentStatus: "refunded" as const },
    { customerId: insertedCustomers[2].id, operatorId: insertedOperators[4].id, carsRequested: 5, vehicleType: "luxury", pickupAddress: "Cyber Hub, Gurgaon", dropAddress: "JW Marriott, Delhi", eventDate: new Date("2026-04-20"), returnDate: new Date("2026-04-21"), eventTime: "06:00 PM", specialInstructions: "Corporate gala event", totalAmount: "100000.00", platformFee: "10000.00", operatorAmount: "90000.00", status: "pending" as const, paymentStatus: "unpaid" as const },
    { customerId: insertedCustomers[4].id, operatorId: insertedOperators[0].id, carsRequested: 6, vehicleType: "innova", pickupAddress: "BHU Campus, Varanasi", dropAddress: "Ramada Hotel, Varanasi", eventDate: new Date("2026-05-15"), returnDate: new Date("2026-05-16"), eventTime: "08:00 AM", specialInstructions: "Graduation ceremony transport", totalAmount: "42000.00", platformFee: "4200.00", operatorAmount: "37800.00", status: "confirmed" as const, paymentStatus: "paid" as const },
  ];

  for (const b of bookingsData) {
    await db.insert(bookings).values(b);
  }
  console.log(`${bookingsData.length} bookings created`);

  // ========== REVIEWS ==========
  const reviewsData = [
    { bookingId: 1, customerId: insertedCustomers[0].id, operatorId: insertedOperators[0].id, rating: 5, comment: "Excellent service! Cars were clean and drivers were very professional. Highly recommend Sharma Fleet for weddings." },
    { bookingId: 3, customerId: insertedCustomers[2].id, operatorId: insertedOperators[2].id, rating: 5, comment: "Gupta Luxury Fleet made our wedding truly special. The luxury cars were immaculate and the service was top-notch." },
    { bookingId: 6, customerId: insertedCustomers[0].id, operatorId: insertedOperators[2].id, rating: 4, comment: "Good service. Cars arrived on time. Would book again." },
    { bookingId: 5, customerId: insertedCustomers[4].id, operatorId: insertedOperators[3].id, rating: 4, comment: "Nice experience. Driver was courteous and helpful." },
    { bookingId: 10, customerId: insertedCustomers[4].id, operatorId: insertedOperators[0].id, rating: 5, comment: "Rajesh ji is the best! All cars decorated beautifully for our event." },
    { bookingId: 2, customerId: insertedCustomers[1].id, operatorId: insertedOperators[1].id, rating: 4, comment: "Good fleet. Only wish they had more luxury options." },
    { bookingId: 4, customerId: insertedCustomers[3].id, operatorId: insertedOperators[4].id, rating: 5, comment: "Singh Royal Rides lives up to its name! Royal treatment indeed." },
    { bookingId: 8, customerId: insertedCustomers[3].id, operatorId: insertedOperators[1].id, rating: 3, comment: "Decent service but tempo was not as clean as expected." },
  ];

  for (const r of reviewsData) {
    await db.insert(reviews).values(r);
  }
  console.log(`${reviewsData.length} reviews created`);

  console.log("Seed completed successfully!");
}

seed().catch(console.error);
