import express from "express"
import bodyParser from"body-parser"
import qr from "qr-image";

const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index", { qrData: null });
});

app.post("/check",(req,res)=>{
    const qrLink = req.body["link-qr"];
    let qrData = null; 

    if (qrLink) {
        const qr_svg = qr.imageSync(qrLink, { type: 'svg' });
        qrData = "data:image/svg+xml;base64," + Buffer.from(qr_svg).toString("base64");
    }

    // Render index.ejs with qrData (either generated QR or null)
    res.render("index", { qrData });

});
app.listen(port,()=>{
     console.log(`Server is on port ${3000}`);
});