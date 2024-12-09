import { use } from "react";
import { useState, useEffect } from "react";
import { getGardenProfits } from "../services/services";

function Profits({ gardenCrops }) {
    const [profit, setProfit] = useState(0)

    useEffect(() => {
        const fetchCities = async () => {
            const data = await getGardenProfits()
            const dataArray = Array.isArray(data) ? data : [data];
            console.log('gettinr pi')
            console.log(dataArray)
            if (dataArray[0]['price']) {
                if (dataArray[0]['price'] === profit) {
                    const data2 = await getGardenProfits()
                    const dataArray2 = Array.isArray(data2) ? data2 : [data2];
                    if (dataArray2[0]['price']) {
                        setProfit(dataArray2[0]['price'])
                    } else {
                        setProfit(0)
                    }
                } else {
                    setProfit(dataArray[0]['price'])
                }

            } else {
                if (0 === profit) {
                    const data2 = await getGardenProfits()
                    const dataArray2 = Array.isArray(data2) ? data2 : [data2];
                    if (dataArray2[0]['price']) {
                        setProfit(dataArray2[0]['price'])
                    } else {
                        setProfit(0)
                    }
                } else {
                    setProfit(0)
                }
            }

        };

        if (gardenCrops.length === 0) {
            setProfit(0);
        } else {
            fetchCities();
        }
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