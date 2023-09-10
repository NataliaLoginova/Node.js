const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");

const csvFilePath = path.join(__dirname, "csvdirectory", "csvfile.csv");
const txtFilePath = path.join(__dirname, "output.txt");

const csvParser = async () => {
    try {
        const writeStream = fs.createWriteStream(txtFilePath, { flags: "a" });

        await csv({
            noheader: true,
            headers: ["Book", "Author", "Amount", "Price"],
        })
            .fromFile(csvFilePath)
            .subscribe(async (json, lineNumber) => {
                if (lineNumber > 0) {
                    const { Book, Author, Price } = json;
                    const jsonObject = {
                        book: Book,
                        author: Author,
                        price: parseFloat(Price),
                    };
                    const jsonString = JSON.stringify(jsonObject) + "\n";
                    await new Promise((resolve, reject) => {
                        writeStream.write(jsonString, (error) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve();
                        });
                    });
                }
            });

        console.log("CSV to JSON parsing is done.");

        writeStream.on("error", (error) => {
            console.error("Error:", error.message);
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
};

module.exports = {
    csvParser
};
