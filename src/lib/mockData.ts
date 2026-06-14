// Comprehensive mock data for FleetBook - used as fallback when API fails
// and for demo purposes

export const mockOperators = [
  {
    id: 1, name: "Rajesh Sharma", email: "rajesh@sharmacars.in", phone: "9876543210",
    role: "operator", businessName: "Sharma Fleet Services", city: "Lucknow",
    operatingCities: "Lucknow,Kanpur,Allahabad", gstNumber: "09ABCDE1234F1Z5",
    yearsInBusiness: 8, rating: "4.5", totalReviews: 12, status: "active",
    avatar: "/operator-1.jpg", createdAt: new Date("2023-01-15"),
    totalCars: 8, availableCars: 8, avgPricePerDay: 3500,
    vehicleTypes: ["innova", "sedan", "fortuner", "tempo", "luxury"],
    fleet: [
      { id: 1, vehicleNumber: "UP32AB1234", type: "innova", capacity: 7, year: 2023, driverName: "Ramesh", driverPhone: "9876500001", pricePerDay: "3500", isAvailable: true },
      { id: 2, vehicleNumber: "UP32CD5678", type: "innova", capacity: 7, year: 2022, driverName: "Suresh", driverPhone: "9876500002", pricePerDay: "3200", isAvailable: true },
      { id: 3, vehicleNumber: "UP32EF9012", type: "sedan", capacity: 4, year: 2023, driverName: "Mahesh", driverPhone: "9876500003", pricePerDay: "2500", isAvailable: true },
      { id: 4, vehicleNumber: "UP32GH3456", type: "sedan", capacity: 4, year: 2021, driverName: "Dinesh", driverPhone: "9876500004", pricePerDay: "2200", isAvailable: true },
      { id: 5, vehicleNumber: "UP32IJ7890", type: "fortuner", capacity: 7, year: 2024, driverName: "Naresh", driverPhone: "9876500005", pricePerDay: "8000", isAvailable: true },
      { id: 6, vehicleNumber: "UP32KL1234", type: "tempo", capacity: 12, year: 2022, driverName: "Rajesh D", driverPhone: "9876500006", pricePerDay: "5000", isAvailable: true },
      { id: 7, vehicleNumber: "UP32MN5678", type: "luxury", capacity: 4, year: 2024, driverName: "Ashok", driverPhone: "9876500007", pricePerDay: "12000", isAvailable: true },
      { id: 8, vehicleNumber: "UP32OP9012", type: "innova", capacity: 7, year: 2023, driverName: "Vinod", driverPhone: "9876500008", pricePerDay: "3500", isAvailable: true },
    ]
  },
  {
    id: 2, name: "Amit Verma", email: "amit@vermarides.in", phone: "8765432109",
    role: "operator", businessName: "Verma Wedding Wheels", city: "Kanpur",
    operatingCities: "Kanpur,Lucknow,Varanasi", gstNumber: "09FGHIJ5678K2Z6",
    yearsInBusiness: 5, rating: "4.2", totalReviews: 8, status: "active",
    avatar: "/operator-2.jpg", createdAt: new Date("2023-03-10"),
    totalCars: 6, availableCars: 6, avgPricePerDay: 3400,
    vehicleTypes: ["innova", "sedan", "fortuner", "tempo"],
    fleet: [
      { id: 9, vehicleNumber: "UP78AB1234", type: "innova", capacity: 7, year: 2023, driverName: "Prakash", driverPhone: "8765100001", pricePerDay: "3400", isAvailable: true },
      { id: 10, vehicleNumber: "UP78CD5678", type: "sedan", capacity: 4, year: 2022, driverName: "Mukesh", driverPhone: "8765100002", pricePerDay: "2300", isAvailable: true },
      { id: 11, vehicleNumber: "UP78EF9012", type: "sedan", capacity: 4, year: 2023, driverName: "Arun", driverPhone: "8765100003", pricePerDay: "2600", isAvailable: true },
      { id: 12, vehicleNumber: "UP78GH3456", type: "fortuner", capacity: 7, year: 2024, driverName: "Kiran", driverPhone: "8765100004", pricePerDay: "8500", isAvailable: true },
      { id: 13, vehicleNumber: "UP78IJ7890", type: "tempo", capacity: 12, year: 2023, driverName: "Deepak", driverPhone: "8765100005", pricePerDay: "5500", isAvailable: true },
      { id: 14, vehicleNumber: "UP78KL1234", type: "innova", capacity: 7, year: 2022, driverName: "Sanjay", driverPhone: "8765100006", pricePerDay: "3100", isAvailable: true },
    ]
  },
  {
    id: 3, name: "Suresh Gupta", email: "suresh@guptafleet.com", phone: "7654321098",
    role: "operator", businessName: "Gupta Luxury Fleet", city: "Agra",
    operatingCities: "Agra,Delhi,Jaipur", gstNumber: "08KLMNO9012P3Z7",
    yearsInBusiness: 12, rating: "4.8", totalReviews: 15, status: "active",
    avatar: "/operator-3.jpg", createdAt: new Date("2022-06-01"),
    totalCars: 10, availableCars: 10, avgPricePerDay: 5000,
    vehicleTypes: ["luxury", "fortuner", "innova", "sedan", "tempo"],
    fleet: [
      { id: 15, vehicleNumber: "UP80AB1234", type: "luxury", capacity: 4, year: 2024, driverName: "Harish", driverPhone: "7654100001", pricePerDay: "15000", isAvailable: true },
      { id: 16, vehicleNumber: "UP80CD5678", type: "luxury", capacity: 4, year: 2024, driverName: "Manish", driverPhone: "7654100002", pricePerDay: "14000", isAvailable: true },
      { id: 17, vehicleNumber: "UP80EF9012", type: "fortuner", capacity: 7, year: 2023, driverName: "Pankaj", driverPhone: "7654100003", pricePerDay: "7500", isAvailable: true },
      { id: 18, vehicleNumber: "UP80GH3456", type: "fortuner", capacity: 7, year: 2024, driverName: "Rahul", driverPhone: "7654100004", pricePerDay: "9000", isAvailable: true },
      { id: 19, vehicleNumber: "UP80IJ7890", type: "innova", capacity: 7, year: 2023, driverName: "Neeraj", driverPhone: "7654100005", pricePerDay: "3600", isAvailable: true },
      { id: 20, vehicleNumber: "UP80KL1234", type: "innova", capacity: 7, year: 2023, driverName: "Vijay", driverPhone: "7654100006", pricePerDay: "3700", isAvailable: true },
      { id: 21, vehicleNumber: "UP80MN5678", type: "innova", capacity: 7, year: 2022, driverName: "Ajay", driverPhone: "7654100007", pricePerDay: "3300", isAvailable: true },
      { id: 22, vehicleNumber: "UP80OP9012", type: "sedan", capacity: 4, year: 2023, driverName: "Rajiv", driverPhone: "7654100008", pricePerDay: "2400", isAvailable: true },
      { id: 23, vehicleNumber: "UP80QR3456", type: "sedan", capacity: 4, year: 2022, driverName: "Sunil", driverPhone: "7654100009", pricePerDay: "2200", isAvailable: true },
      { id: 24, vehicleNumber: "UP80ST7890", type: "tempo", capacity: 16, year: 2023, driverName: "Gopal", driverPhone: "7654100010", pricePerDay: "6000", isAvailable: true },
    ]
  },
  {
    id: 4, name: "Pawan Kumar", email: "pawan@kumarfleet.in", phone: "6543210987",
    role: "operator", businessName: "Kumar Event Cars", city: "Varanasi",
    operatingCities: "Varanasi,Lucknow,Allahabad", gstNumber: "09QRSTU3456V4Z8",
    yearsInBusiness: 3, rating: "4.0", totalReviews: 5, status: "active",
    avatar: "/operator-1.jpg", createdAt: new Date("2024-01-20"),
    totalCars: 5, availableCars: 5, avgPricePerDay: 2900,
    vehicleTypes: ["innova", "sedan", "tempo"],
    fleet: [
      { id: 25, vehicleNumber: "UP65AB1234", type: "innova", capacity: 7, year: 2022, driverName: "Lalit", driverPhone: "6543100001", pricePerDay: "3000", isAvailable: true },
      { id: 26, vehicleNumber: "UP65CD5678", type: "innova", capacity: 7, year: 2023, driverName: "Amit K", driverPhone: "6543100002", pricePerDay: "3200", isAvailable: true },
      { id: 27, vehicleNumber: "UP65EF9012", type: "sedan", capacity: 4, year: 2022, driverName: "Ravi", driverPhone: "6543100003", pricePerDay: "2000", isAvailable: true },
      { id: 28, vehicleNumber: "UP65GH3456", type: "sedan", capacity: 4, year: 2021, driverName: "Sachin", driverPhone: "6543100004", pricePerDay: "1800", isAvailable: true },
      { id: 29, vehicleNumber: "UP65IJ7890", type: "tempo", capacity: 12, year: 2022, driverName: "Vivek", driverPhone: "6543100005", pricePerDay: "4500", isAvailable: true },
    ]
  },
  {
    id: 5, name: "Vikram Singh", email: "vikram@singhcars.in", phone: "5432109876",
    role: "operator", businessName: "Singh Royal Rides", city: "Delhi",
    operatingCities: "Delhi,Noida,Ghaziabad", gstNumber: "07WXYAB7890C5Z9",
    yearsInBusiness: 10, rating: "4.6", totalReviews: 20, status: "active",
    avatar: "/operator-2.jpg", createdAt: new Date("2021-08-15"),
    totalCars: 7, availableCars: 7, avgPricePerDay: 8000,
    vehicleTypes: ["luxury", "fortuner", "innova", "tempo"],
    fleet: [
      { id: 30, vehicleNumber: "DL01AB1234", type: "luxury", capacity: 4, year: 2024, driverName: "Tarun", driverPhone: "5432100001", pricePerDay: "18000", isAvailable: true },
      { id: 31, vehicleNumber: "DL01CD5678", type: "luxury", capacity: 4, year: 2024, driverName: "Siddharth", driverPhone: "5432100002", pricePerDay: "20000", isAvailable: true },
      { id: 32, vehicleNumber: "DL01EF9012", type: "fortuner", capacity: 7, year: 2024, driverName: "Anil", driverPhone: "5432100003", pricePerDay: "10000", isAvailable: true },
      { id: 33, vehicleNumber: "DL01GH3456", type: "fortuner", capacity: 7, year: 2023, driverName: "Varun", driverPhone: "5432100004", pricePerDay: "8500", isAvailable: true },
      { id: 34, vehicleNumber: "DL01IJ7890", type: "innova", capacity: 7, year: 2023, driverName: "Kunal", driverPhone: "5432100005", pricePerDay: "4000", isAvailable: true },
      { id: 35, vehicleNumber: "DL01KL1234", type: "innova", capacity: 7, year: 2023, driverName: "Rohit", driverPhone: "5432100006", pricePerDay: "3800", isAvailable: true },
      { id: 36, vehicleNumber: "DL01MN5678", type: "tempo", capacity: 16, year: 2023, driverName: "Mohit S", driverPhone: "5432100007", pricePerDay: "7000", isAvailable: true },
    ]
  },
  {
    id: 6, name: "Mohammad Ali", email: "ali@alicars.in", phone: "9876543211",
    role: "operator", businessName: "Ali Premium Travels", city: "Lucknow",
    operatingCities: "Lucknow,Allahabad", gstNumber: "09BCDEF2345G2Z6",
    yearsInBusiness: 6, rating: "4.3", totalReviews: 9, status: "active",
    avatar: "/operator-3.jpg", createdAt: new Date("2023-05-12"),
    totalCars: 6, availableCars: 6, avgPricePerDay: 3800,
    vehicleTypes: ["innova", "fortuner", "sedan"],
    fleet: [
      { id: 37, vehicleNumber: "UP32PQ1234", type: "innova", capacity: 7, year: 2023, driverName: "Imran", driverPhone: "9876500011", pricePerDay: "3600", isAvailable: true },
      { id: 38, vehicleNumber: "UP32RS5678", type: "innova", capacity: 7, year: 2024, driverName: "Farhan", driverPhone: "9876500012", pricePerDay: "3800", isAvailable: true },
      { id: 39, vehicleNumber: "UP32TU9012", type: "fortuner", capacity: 7, year: 2024, driverName: "Salman", driverPhone: "9876500013", pricePerDay: "9000", isAvailable: true },
      { id: 40, vehicleNumber: "UP32VW3456", type: "sedan", capacity: 4, year: 2023, driverName: "Zayed", driverPhone: "9876500014", pricePerDay: "2500", isAvailable: true },
      { id: 41, vehicleNumber: "UP32XY7890", type: "sedan", capacity: 4, year: 2022, driverName: "Arif", driverPhone: "9876500015", pricePerDay: "2200", isAvailable: true },
      { id: 42, vehicleNumber: "UP32ZA1234", type: "innova", capacity: 7, year: 2023, driverName: "Nadeem", driverPhone: "9876500016", pricePerDay: "3700", isAvailable: true },
    ]
  },
  {
    id: 7, name: "Deepak Choudhary", email: "deepak@choudharyfleet.in", phone: "8765432110",
    role: "operator", businessName: "Choudhary Wheels", city: "Delhi",
    operatingCities: "Delhi,Noida,Faridabad", gstNumber: "07XYZAB1234C5Z9",
    yearsInBusiness: 7, rating: "4.4", totalReviews: 11, status: "active",
    avatar: "/operator-1.jpg", createdAt: new Date("2022-11-05"),
    totalCars: 9, availableCars: 9, avgPricePerDay: 4200,
    vehicleTypes: ["luxury", "innova", "fortuner", "tempo", "sedan"],
    fleet: [
      { id: 43, vehicleNumber: "DL02AB1234", type: "luxury", capacity: 4, year: 2024, driverName: "Karan", driverPhone: "5432100008", pricePerDay: "16000", isAvailable: true },
      { id: 44, vehicleNumber: "DL02CD5678", type: "innova", capacity: 7, year: 2023, driverName: "Rohan", driverPhone: "5432100009", pricePerDay: "3500", isAvailable: true },
      { id: 45, vehicleNumber: "DL02EF9012", type: "innova", capacity: 7, year: 2024, driverName: "Sohan", driverPhone: "5432100010", pricePerDay: "3800", isAvailable: true },
      { id: 46, vehicleNumber: "DL02GH3456", type: "fortuner", capacity: 7, year: 2024, driverName: "Mohan", driverPhone: "5432100011", pricePerDay: "9500", isAvailable: true },
      { id: 47, vehicleNumber: "DL02IJ7890", type: "tempo", capacity: 14, year: 2023, driverName: "Sohan", driverPhone: "5432100012", pricePerDay: "6500", isAvailable: true },
      { id: 48, vehicleNumber: "DL02KL1234", type: "sedan", capacity: 4, year: 2023, driverName: "Rohan", driverPhone: "5432100013", pricePerDay: "2600", isAvailable: true },
      { id: 49, vehicleNumber: "DL02MN5678", type: "sedan", capacity: 4, year: 2022, driverName: "Karan", driverPhone: "5432100014", pricePerDay: "2300", isAvailable: true },
      { id: 50, vehicleNumber: "DL02OP9012", type: "innova", capacity: 7, year: 2023, driverName: "Mohan", driverPhone: "5432100015", pricePerDay: "3400", isAvailable: true },
      { id: 51, vehicleNumber: "DL02QR3456", type: "luxury", capacity: 4, year: 2024, driverName: "Sohan", driverPhone: "5432100016", pricePerDay: "18000", isAvailable: true },
    ]
  },
  {
    id: 8, name: "Ramesh Yadav", email: "ramesh@yadavrides.in", phone: "7654321100",
    role: "operator", businessName: "Yadav Wedding Cars", city: "Kanpur",
    operatingCities: "Kanpur,Lucknow", gstNumber: "09CDEFG3456H3Z7",
    yearsInBusiness: 4, rating: "4.1", totalReviews: 7, status: "active",
    avatar: "/operator-2.jpg", createdAt: new Date("2023-09-01"),
    totalCars: 5, availableCars: 5, avgPricePerDay: 3100,
    vehicleTypes: ["innova", "sedan", "tempo"],
    fleet: [
      { id: 52, vehicleNumber: "UP79AB1234", type: "innova", capacity: 7, year: 2023, driverName: "Brijesh", driverPhone: "7654100011", pricePerDay: "3200", isAvailable: true },
      { id: 53, vehicleNumber: "UP79CD5678", type: "innova", capacity: 7, year: 2022, driverName: "Manoj", driverPhone: "7654100012", pricePerDay: "3000", isAvailable: true },
      { id: 54, vehicleNumber: "UP79EF9012", type: "sedan", capacity: 4, year: 2023, driverName: "Pradeep", driverPhone: "7654100013", pricePerDay: "2400", isAvailable: true },
      { id: 55, vehicleNumber: "UP79GH3456", type: "sedan", capacity: 4, year: 2021, driverName: "Sandeep", driverPhone: "7654100014", pricePerDay: "2100", isAvailable: true },
      { id: 56, vehicleNumber: "UP79IJ7890", type: "tempo", capacity: 12, year: 2022, driverName: "Rajesh", driverPhone: "7654100015", pricePerDay: "4800", isAvailable: true },
    ]
  },
];

export const mockBookings = [
  { id: 1, customerId: 101, customerName: "Ankit Mishra", customerPhone: "9876501234", customerEmail: "ankit@email.com", operatorId: 1, operatorName: "Rajesh Sharma", operatorCity: "Lucknow", operatorPhone: "9876543210", carsRequested: 5, vehicleType: "innova", pickupAddress: "123 Gomti Nagar, Lucknow", dropAddress: "Taj Hotel, Lucknow", eventDate: new Date("2025-12-15"), returnDate: new Date("2025-12-17"), eventTime: "08:00 AM", specialInstructions: "Decorated cars for wedding", totalAmount: "35000.00", platformFee: "3500.00", operatorAmount: "31500.00", status: "confirmed", paymentStatus: "paid", createdAt: new Date("2025-11-01") },
  { id: 2, customerId: 101, customerName: "Ankit Mishra", customerPhone: "9876501234", customerEmail: "ankit@email.com", operatorId: 3, operatorName: "Suresh Gupta", operatorCity: "Agra", operatorPhone: "7654321098", carsRequested: 3, vehicleType: "sedan", pickupAddress: "Sadar Bazaar, Agra", dropAddress: "Agra Cantt Railway Station", eventDate: new Date("2025-10-20"), returnDate: new Date("2025-10-20"), eventTime: "05:00 AM", specialInstructions: "Airport drop", totalAmount: "6600.00", platformFee: "660.00", operatorAmount: "5940.00", status: "completed", paymentStatus: "paid", createdAt: new Date("2025-10-15") },
  { id: 3, customerId: 101, customerName: "Ankit Mishra", customerPhone: "9876501234", customerEmail: "ankit@email.com", operatorId: 1, operatorName: "Rajesh Sharma", operatorCity: "Lucknow", operatorPhone: "9876543210", carsRequested: 10, vehicleType: "innova", pickupAddress: "Hazratganj, Lucknow", dropAddress: "La Martiniere College, Lucknow", eventDate: new Date("2026-02-14"), returnDate: new Date("2026-02-15"), eventTime: "11:00 AM", specialInstructions: "Valentine's Day wedding - decorated cars", totalAmount: "70000.00", platformFee: "7000.00", operatorAmount: "63000.00", status: "pending", paymentStatus: "unpaid", createdAt: new Date("2026-01-10") },
  { id: 4, customerId: 101, customerName: "Ankit Mishra", customerPhone: "9876501234", customerEmail: "ankit@email.com", operatorId: 5, operatorName: "Vikram Singh", operatorCity: "Delhi", operatorPhone: "5432109876", carsRequested: 6, vehicleType: "fortuner", pickupAddress: "Connaught Place, Delhi", dropAddress: "Leela Palace, Delhi", eventDate: new Date("2026-01-10"), returnDate: new Date("2026-01-12"), eventTime: "07:00 AM", specialInstructions: "All white cars preferred", totalAmount: "60000.00", platformFee: "6000.00", operatorAmount: "54000.00", status: "pending", paymentStatus: "unpaid", createdAt: new Date("2025-12-20") },
];

export const mockReviews = [
  { id: 1, bookingId: 1, customerId: 101, customerName: "Ankit Mishra", operatorId: 1, rating: 5, comment: "Excellent service! Cars were clean and drivers were very professional. Highly recommend Sharma Fleet for weddings.", createdAt: new Date("2025-12-18") },
  { id: 2, bookingId: 5, customerId: 105, customerName: "Mohit Tiwari", operatorId: 1, rating: 5, comment: "Rajesh ji is the best! All cars decorated beautifully for our event.", createdAt: new Date("2026-05-18") },
  { id: 3, bookingId: 3, customerId: 103, customerName: "Rohan Agarwal", operatorId: 3, rating: 5, comment: "Gupta Luxury Fleet made our wedding truly special. The luxury cars were immaculate and the service was top-notch.", createdAt: new Date("2025-11-28") },
  { id: 4, bookingId: 6, customerId: 101, customerName: "Ankit Mishra", operatorId: 3, rating: 4, comment: "Good service. Cars arrived on time. Would book again.", createdAt: new Date("2025-10-22") },
  { id: 5, bookingId: 10, customerId: 105, customerName: "Mohit Tiwari", operatorId: 4, rating: 4, comment: "Nice experience. Driver was courteous and helpful.", createdAt: new Date("2026-01-08") },
  { id: 6, bookingId: 2, customerId: 102, customerName: "Priya Patel", operatorId: 2, rating: 4, comment: "Good fleet. Only wish they had more luxury options.", createdAt: new Date("2025-12-22") },
  { id: 7, bookingId: 4, customerId: 104, customerName: "Sneha Gupta", operatorId: 5, rating: 5, comment: "Singh Royal Rides lives up to its name! Royal treatment indeed.", createdAt: new Date("2026-01-15") },
  { id: 8, bookingId: 8, customerId: 104, customerName: "Sneha Gupta", operatorId: 2, rating: 3, comment: "Decent service but tempo was not as clean as expected.", createdAt: new Date("2026-03-05") },
];

export const mockCustomers = [
  { id: 101, name: "Ankit Mishra", email: "ankit@email.com", phone: "9876501234", role: "customer", city: "Lucknow", totalBookings: 4, createdAt: new Date("2024-01-15") },
  { id: 102, name: "Priya Patel", email: "priya@email.com", phone: "8765012345", role: "customer", city: "Kanpur", totalBookings: 2, createdAt: new Date("2024-03-10") },
  { id: 103, name: "Rohan Agarwal", email: "rohan@email.com", phone: "7650123456", role: "customer", city: "Agra", totalBookings: 1, createdAt: new Date("2024-05-20") },
  { id: 104, name: "Sneha Gupta", email: "sneha@email.com", phone: "6540123456", role: "customer", city: "Delhi", totalBookings: 2, createdAt: new Date("2024-02-14") },
  { id: 105, name: "Mohit Tiwari", email: "mohit@email.com", phone: "5430123456", role: "customer", city: "Varanasi", totalBookings: 2, createdAt: new Date("2024-06-01") },
];

// Helper function to search/filter mock operators
export function searchMockOperators(filters: { city?: string; cars?: number; type?: string; minPrice?: number; maxPrice?: number; sortBy?: string }) {
  let results = [...mockOperators];

  if (filters.city && filters.city !== "all") {
    results = results.filter(op => op.city.toLowerCase().includes(filters.city!.toLowerCase()));
  }

  if (filters.type && filters.type !== "all") {
    results = results.filter(op => op.vehicleTypes.includes(filters.type!));
    // Recalculate avg price for filtered type
    results = results.map(op => {
      const filteredFleet = op.fleet.filter((v: {type: string}) => v.type === filters.type);
      const avgPrice = filteredFleet.length > 0
        ? filteredFleet.reduce((sum: number, v: {pricePerDay: string}) => sum + Number(v.pricePerDay), 0) / filteredFleet.length
        : 0;
      const availableCars = filteredFleet.filter((v: {isAvailable: boolean}) => v.isAvailable).length;
      return { ...op, avgPricePerDay: Math.round(avgPrice), availableCars };
    }).filter(op => op.availableCars > 0);
  }

  if (filters.cars) {
    results = results.filter(op => op.availableCars >= filters.cars!);
  }

  if (filters.minPrice) {
    results = results.filter(op => op.avgPricePerDay >= filters.minPrice!);
  }
  if (filters.maxPrice) {
    results = results.filter(op => op.avgPricePerDay <= filters.maxPrice!);
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price_asc": results.sort((a, b) => a.avgPricePerDay - b.avgPricePerDay); break;
      case "price_desc": results.sort((a, b) => b.avgPricePerDay - a.avgPricePerDay); break;
      case "rating": results.sort((a, b) => Number(b.rating) - Number(a.rating)); break;
      case "fleet_size": results.sort((a, b) => b.totalCars - a.totalCars); break;
    }
  }

  return results;
}

export function getMockOperatorById(id: number) {
  const op = mockOperators.find(o => o.id === id);
  if (!op) return null;
  const reviews = mockReviews.filter(r => r.operatorId === id);
  return { ...op, reviews };
}

export function getMockBookingsByCustomer(customerId: number) {
  return mockBookings.filter(b => b.customerId === customerId);
}

export function getMockBookingsByOperator(operatorId: number) {
  return mockBookings.filter(b => b.operatorId === operatorId);
}

export function getMockReviewsByOperator(operatorId: number) {
  return mockReviews.filter(r => r.operatorId === operatorId);
}

export function getMockFleetByOperator(operatorId: number) {
  const op = mockOperators.find(o => o.id === operatorId);
  return op?.fleet || [];
}

export function getMockDashboardStats() {
  const completedBookings = mockBookings.filter(b => b.status === "completed");
  const totalRevenue = completedBookings.reduce((sum, b) => sum + Number(b.totalAmount), 0);
  const platformCommission = completedBookings.reduce((sum, b) => sum + Number(b.platformFee), 0);
  return {
    totalUsers: mockCustomers.length,
    totalOperators: mockOperators.length,
    totalBookings: mockBookings.length,
    totalRevenue: totalRevenue.toFixed(2),
    platformCommission: platformCommission.toFixed(2),
    pendingOperators: mockOperators.filter(o => o.status === "pending"),
  };
}
