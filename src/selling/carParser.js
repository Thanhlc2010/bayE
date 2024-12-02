class Car {
    constructor(data) {
        this.title = data?.main?.title || '';
        this.price = data?.main?.price || '';
        this.gearbox = data?.main?.gearbox || '';
        this.fuelType = data?.main?.fuelType || '';
        this.status = data?.main?.status || '';
        this.images = data?.main?.images || [];
        this.description = data.main.description || '';
        // Interest section
        this.installmentLengthStart = data?.interest?.installmentLength[0] || 0;
        this.installmentLengthEnd = data?.interest?.installmentLength[1] || 0;
        this.monthlyInstallmentStart = data?.interest?.monthlyInstallmentAmount[0] || 0;
        this.monthlyInstallmentEnd = data?.interest?.monthlyInstallmentAmount[1] || 0;
        this.interestRateStart = data?.interest?.interestRate[0] || 0;
        this.interestRateEnd = data?.interest?.interestRate[1] || 0;

        // Detail section
        this.kilometersCount = parseInt(data?.detail?.kilometersCount )|| 0;
        this.previousOwners = parseInt(data?.detail?.previousOwners) || 0;
        this.licensePlate = data?.detail?.licensePlate || '';
        this.registrationStatus = data?.detail?.registrationStatus || '';
        this.madeIn = data?.detail?.madeIn.trim() || '';
        this.brand = data?.detail?.brand || '';
        this.carLine = data?.detail?.carLine || '';
        this.factoryYear = parseInt(data?.detail?.factoryYear) || '';
        this.engineCapacity = data?.detail?.engineCapacity || '';
        this.seatNumber = parseInt(data?.detail?.seatNumber) || 0;
        this.numberOfDoors = parseInt(data?.detail?.numberOfDoors) || 0;
        this.weight = parseInt(data?.detail?.weight) || '';
    }

    // Method to get the flattened data
    getFlattenedData() {
        return {
            title: this.title,
            price: this.price,
            gearbox: this.gearbox,
            fuelType: this.fuelType,
            status: this.status,
            images: this.images,
            installmentLengthStart: this.installmentLengthStart,
            installmentLengthEnd: this.installmentLengthEnd,
            monthlyInstallmentStart: this.monthlyInstallmentStart,
            monthlyInstallmentEnd: this.monthlyInstallmentEnd,
            interestRateStart: this.interestRateStart,
            interestRateEnd: this.interestRateEnd,
            kilometersCount: this.kilometersCount,
            previousOwners: this.previousOwners,
            licensePlate: this.licensePlate,
            registrationStatus: this.registrationStatus,
            madeIn: this.madeIn,
            brand: this.brand,
            carLine: this.carLine,
            factoryYear: this.factoryYear,
            engineCapacity: this.engineCapacity,
            seatNumber: this.seatNumber,
            numberOfDoors: this.numberOfDoors,
            weight: this.weight
        };
    }

    // Example method to display car details
    displayCarDetails() {
        console.log(`Car: ${this.brand} ${this.carLine} (${this.factoryYear})`);
        console.log(`Price: ${this.price}, Status: ${this.status}`);
    }
}

export default Car;
