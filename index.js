const express= require("express");
const app=express();

const PORT = process.env.PORT || 9876;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const WINDOW_SIZE = 10;
let numbersWindow = [];

app.get("/", (req,res)=>{
        return res.send("Hello from main page!!");
    })

const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

app.use(express.json());

app.get("/numbers/:numberids", (req, res) => {
    const { numberids } = req.params;
    const numbers = numberids.split(",").map(Number); 
    const average = calculateAverage(numbers);

    res.json({
        numbers: numbers,
        average: average.toFixed(2) 
    });
});




// Query parameters
app.get("/numbers", (req, res) => {
    const { category, limit } = req.query;
    res.send(`Requested category: ${category}, limit: ${limit}`);
});

// Request body (requires express.json middleware)
app.post("/numbers", express.json(), (req, res) => {
    const { category, limit } = req.body;
    res.send(`Requested category: ${category}, limit: ${limit}`);
});