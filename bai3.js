let ticket = {
    passengerName: "Nguyen Van An",
    ticketClass: "ECONOMY",
    freeWeight: 20,
    memberLevel: "TITAN"
};

let baggageList = [];

// Nhap danh sach hanh ly
function inputBaggage() {
    baggageList = [];

    let count = prompt("Nhap so kien hanh ly:");

    if (count === null || count.trim() === "" ||
        !Number.isInteger(Number(count)) || Number(count) <= 0) {
        console.log("So kien hanh ly khong hop le");
        return false;
    }

    for (let i = 0; i < Number(count); i++) {
        console.log("Nhap kien hanh ly thu " + (i + 1));

        let weight = prompt("Nhap can nang (kg):");

        if (weight === null || weight.trim() === "" ||
            !Number.isFinite(Number(weight)) || Number(weight) <= 0) {
            console.log("Can nang khong hop le");
            return false;
        }

        console.log("1. Hanh ly thuong");
        console.log("2. Nhac cu");
        console.log("3. Gay golf");
        console.log("4. Thu cung");

        let type = prompt("Chon loai hanh ly:");

        if (type === null || !["1", "2", "3", "4"].includes(type.trim())) {
            console.log("Loai hanh ly khong hop le");
            return false;
        }

        let baggageType = "Thuong";

        if (type === "2") {
            baggageType = "Nhac cu";
        } else if (type === "3") {
            baggageType = "Gay golf";
        } else if (type === "4") {
            baggageType = "Thu cung";
        }

        baggageList.push({
            weight: Number(weight),
            type: baggageType
        });
    }

    return true;
}

// Tinh phi hanh ly
function calculateBaggageSurcharge(ticket, baggageList) {
    let totalWeight = 0;
    let specialFee = 0;

    baggageList.forEach(function (baggage) {
        totalWeight += baggage.weight;

        if (baggage.type === "Nhac cu" || baggage.type === "Gay golf") {
            specialFee += 200000;
        } else if (baggage.type === "Thu cung") {
            specialFee += 500000;
        }
    });

    let freeWeight = ticket.freeWeight;

    if (["TITAN", "GOLD", "DIAMOND"].includes(ticket.memberLevel.toUpperCase())) {
        freeWeight += 10;
    }

    let excessWeight = Math.max(0, totalWeight - freeWeight);
    let excessFee = 0;

    if (excessWeight <= 5) {
        excessFee = excessWeight * 60000;
    } else {
        excessFee = 5 * 60000 + (excessWeight - 5) * 80000;
    }

    return {
        totalWeight: totalWeight,
        freeWeight: freeWeight,
        excessWeight: excessWeight,
        excessFee: excessFee,
        specialFee: specialFee,
        totalFee: excessFee + specialFee
    };
}

// In hoa don
function printReceipt(ticket, result, baggageList) {
    console.log("\n" + "=".repeat(55));
    console.log("                 HOA DON HANH LY");
    console.log("=".repeat(55));

    console.log(`Hanh khach : ${ticket.passengerName}`);
    console.log(`Hang ve    : ${ticket.ticketClass}`);
    console.log(`Hoi vien   : ${ticket.memberLevel}`);
    console.log("-".repeat(55));

    console.log(`${"Loai hanh ly".padEnd(25)}${"Can nang".padStart(12)}`);
    console.log("-".repeat(55));

    baggageList.forEach(function (baggage, index) {
        let name = `${index + 1}. ${baggage.type}`;
        let weight = `${baggage.weight} kg`;

        console.log(`${name.padEnd(25)}${weight.padStart(12)}`);
    });

    console.log("-".repeat(55));
    console.log(`Tong trong luong : ${result.totalWeight} kg`);
    console.log(`Mien cuoc        : ${result.freeWeight} kg`);
    console.log(`Vuot cuoc        : ${result.excessWeight} kg`);
    console.log(`Phi qua can      : ${result.excessFee.toLocaleString("vi-VN")} VND`);
    console.log(`Phu phi dac biet : ${result.specialFee.toLocaleString("vi-VN")} VND`);
    console.log("=".repeat(55));
    console.log(`TONG THANH TOAN  : ${result.totalFee.toLocaleString("vi-VN")} VND`);
    console.log("=".repeat(55));
}

// Chuong trinh chinh
function main() {
    let answer = inputBaggage();

    if (!answer) {
        return;
    }

    let result = calculateBaggageSurcharge(ticket, baggageList);

    printReceipt(ticket, result, baggageList);
}

main();