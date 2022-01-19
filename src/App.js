import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import List from './components/List/List'
import Map from "./components/Map/Map";
import { CssBaseline, Grid } from '@material-ui/core'
import {getPlacesData, getWeatherData} from './api'
function App() {

  const [ places, setPlaces] = useState([])
  const [ weatherData, setWeatherData] = useState([])
  const [ cordinates, setCordinates]= useState({})
  const [ boundarys, setBoundarys ] = useState({})
  const [ childCliked, setChildCliked] = useState(null)
  const [ isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)
  const [filterdPlaces, setFilterdPlaces] = useState([])


  useEffect ( ()=>{
    const filPlaces = places.filter( place => Number(place.rating) > rating)
    setFilterdPlaces(filPlaces)
  },[rating])

  useEffect( ()=>{
    navigator.geolocation.getCurrentPosition( ({coords:{latitude, longitude}})=>{
      setCordinates({lat:latitude , lng:longitude})
    })
  },[])
  
  useEffect(()=>{
    if (boundarys.sw && boundarys.ne ) {
      setIsLoading(true)
      
      getWeatherData( cordinates.lat, cordinates.lng).then( data=>setWeatherData(data))
 
      getPlacesData(type, boundarys.sw, boundarys.ne ).then( (data)=>{
        setPlaces(data.filter( place => place.name && place.num_reviews>0 ))
        setFilterdPlaces([])
        setIsLoading(false)
    })
  }
   },[type, boundarys ])

  return (
    <>
      <CssBaseline />
        <Header setCordinates={setCordinates}/>
      <Grid  container style={{ width:'100%' }} spacing={3}>
        <Grid item xs ={12} md={4}>
          <List 
            places={ filterdPlaces.length > 0 ? filterdPlaces : places}  
            childCliked={childCliked} 
            isLoading={isLoading}
            type={type}
            setType ={setType}
            rating ={rating}
            setRating = {setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            places={ filterdPlaces.length > 0 ? filterdPlaces : places} 
            setCordinates={setCordinates} 
            setBoundarys={setBoundarys} 
            setChildCliked={setChildCliked} 
            cordinates={cordinates}  
            weatherData={weatherData}
            />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
