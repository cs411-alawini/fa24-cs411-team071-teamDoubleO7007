import express, {Request,Response} from 'express';
import cropRoutes from "./src/routes/cropRoutes"
import cors from 'cors'
import gardenRoutes from "./src/routes/gardenRoutes";

const app = express();
const PORT = 3007;

app.use(express.json());
app.use(cors())

app.get('/api/', (req:Request, res:Response) => {
      res.send('Homepage of my Pokedex API.');
});

app.use('/api/crops', cropRoutes);

app.use("/api/garden", gardenRoutes);

app.listen(PORT, () => {
      console.log(`Pokedex is running on http://localhost:${PORT}`);
});