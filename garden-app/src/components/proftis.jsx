import { use } from "react";
import { useState, useEffect } from "react";
import { getGardenProfits } from "../services/services";

function Profits({ gardenCrops }) {
    const [profit, setProfit] = useState(0)

    useEffect(() => {
        const fetchCities = async () => {
            const data = await getGardenProfits()
            console.log('gettinr pi')
            console.log(data)
            if (data[0]['price']) {
                if (data[0]['price'] === profit) {
                    const data2 = await getGardenProfits()
                    if (data2[0]['price']) {
                        setProfit(data2[0]['price'])
                    } else {
                        setProfit(0)
                    }
                } else {
                    setProfit(data[0]['price'])
                }

            } else {
                if (0 === profit) {
                    const data2 = await getGardenProfits()
                    if (data2[0]['price']) {
                        setProfit(data2[0]['price'])
                    } else {
                        setProfit(0)
                    }
                } else {
                    setProfit(0)
                }
            }

        };

        fetchCities();
    }, [gardenCrops]);

    return (
        <div>
            <p>
                $ {profit.toFixed(2)}
            </p>
        </div>
    )
}

export default Profits