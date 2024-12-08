import express, {Request,Response} from 'express';
import cropRoutes from "./src/routes/cropRoutes"
import cors from 'cors'
import gardenRoutes from "./src/routes/gardenRoutes";
import gardenEntryRoutes from "./src/routes/gardenInstanceRoutes"
import cityRoutes from "./src/routes/cityRoutes"
import profit from "./src/routes/proftRoutes"

const app = express();
const PORT = 3007;

app.use(express.json());
app.use(cors())

app.get('/api/', (req:Request, res:Response) => {
      res.send('Homepage of my Garden API.');
});

app.use('/api/crops', cropRoutes);

app.use("/api/garden", gardenRoutes);

app.use("/api/gardenEntryRoute", gardenEntryRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/profit", profit);

app.listen(PORT, () => {
      console.log(`GardenApp is running on http://localhost:${PORT}`);
});