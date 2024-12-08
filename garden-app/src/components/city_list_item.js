import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function CityListItem({ city, setPlantToAdd }) {


    const addToPlant = () => {
        setPlantToAdd((cur) => {
            cur['city_name'] = city.city_name
            return { ...cur }
        })
    }

    return (
        <Stack id={city.city_name} direction="row" spacing={0.5} sx={{ justifyContent: "center", alignItems: "center" }} >

            <p>{city.city_name}</p>
            <Button size="small" onClick={addToPlant}>add</Button>
        </Stack>
    )
}

export default CityListItem