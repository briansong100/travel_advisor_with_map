
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import LocationOnOutlinedIcon  from '@material-ui/icons/LocationOnOutlined'
import useStyles from './styles'
import restImage from '../../image/restaurant.webp'
//https://snazzymaps.com/
import mapStyles from './mapStyles'

const Map = ({places, setCordinates, setBoundarys, setChildCliked, cordinates, weatherData }) => {
    const css= useStyles()
    const isDesk = useMediaQuery('(min-width:600px)')
    
    return (
      <div className={css.mapContainer}>
        <GoogleMapReact 
          bootstrapURLKeys = {{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
          defaultCenter ={cordinates}
          center={cordinates}
          defaultZoom ={14}
          margin = {[50,50,50,50]}
          options = {{ disableDefaultUI:true, zoomControl:true, styles: mapStyles }}
          onChange ={(e)=>{
              // console.log(e)
              setCordinates({lat:e.center.lat, lng:e.center.lng})
              setBoundarys({ ne:e.marginBounds.ne, sw:e.marginBounds.sw})
          }}
          onChildClick={(child)=>setChildCliked(child)} 
        >
        { places?.map((place, i)=>{
          // console.log(place)
          return (
            <div className={css.markerContainer}  key={i}  lat={Number(place.latitude)} lng={Number(place.longitude)} >
              { !isDesk ? (
                <LocationOnOutlinedIcon />
              ):(
                <Paper elevation={3} className={css.paper} >
                  <Typography gutterBottom variant='subtitle2' >
                      {place.name}
                  </Typography>
                  <img className={css.pointer} src={ place.photo ? place.photo.images.thumbnail.url : restImage } alt={place.name} />
                  <Rating size='small' value={Number(place.rating)} readOnly />
                </Paper>
              ) }
            </div>
          )
        })}
        { weatherData?.list?.map( (data, i) =>(
          <div lat={data.coord.lat} lng={data.coord.lon} key={i} >
            <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" />
          </div>
        ))}
        </GoogleMapReact>
      </div>
  )
}

export default Map
