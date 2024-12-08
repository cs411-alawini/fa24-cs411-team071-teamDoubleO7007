import Stack from '@mui/material/Stack';
import CityListItem from './city_list_item';

function CityList({ cities, setPlantToAdd }) {
    console.log("here")
    console.log(cities)
    return (
        <Stack direction="column" spacing={1} sx={{ justifyContent: "center", alignItems: "center", mt:2, minWidth: 200 }}>
            {cities.map((c) => {
              
                return (
                    <CityListItem city={c} setPlantToAdd={setPlantToAdd}/>
                )
            })}
        </Stack>
    )
}

export default CityList