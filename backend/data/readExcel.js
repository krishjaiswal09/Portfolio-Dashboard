// import readXlsxFile from "read-excel-file/node";
// import path from "path";

// const filePath = path.join(process.cwd(), "backend/data/Sample_Portfolio.xlsx");

// readXlsxFile(filePath).then((rows) => {
//   // Skip first two rows (empty + headers)
//   const dataRows = rows.slice(2);

//   const data = dataRows.map((row) => ({
//     particulars: row[1], // A
//     purchasePrice: row[2], // B
//     quantity: row[3], // C
//     investment: row[4], // D
//     portfolioPercent: row[5], // J
//     nse: row[6],
//     cmp: row[7], // need dynamic value from api
//     presentValue: row[8], //calculate Value 
//     gainLoss: row[9], //calculate Value
//     peRatio: row[12], // need dynamic value from api
//     latestEarnings: row[13], // need dynamic value from api
//   }));

//   console.log("Parsed rows:", data);
// });


// this file to read data from excel