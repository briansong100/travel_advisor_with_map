import {useState, useEffect, createRef }from 'react'
import {CircularProgress, Grid, Typography, InputLabel, FormControl, MenuItem, Select } from '@material-ui/core'

import useStyles from  './styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'


const List = ({places, childCliked, isLoading, type, setType, rating, setRating }) => {

  const  css = useStyles()
  
  const [elementRefs, setElementRefs] = useState([])

  useEffect(()=>{
    const refs = Array(places?.length).fill().map((_, i)=> (elementRefs[i] || createRef()) )
    // const refs = places?.map( place => elementRefs[place.location_id] || createRef())
    setElementRefs(refs) 
    // console.log(places?.length, elementRefs)
  },[places])

  return (
    <div className={css.container}>
      <Typography variant='h4' >Restaurants, Hotels, and Attractions around you</Typography>
      { isLoading ? (
        <div className={css.loading}>
          <CircularProgress size='5rem' />
        </div>
      ):(
      <>
        <FormControl className={css.formControl} >
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={ e=>setType(e.target.value)}>
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={css.formControl} >
          <InputLabel>Rating</InputLabel>
          <Select value={rating} onChange={ e=>setRating(e.target.value)}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3.0</MenuItem>
            <MenuItem value={4}>Above 4.0</MenuItem>
            <MenuItem value={4.5}>Above 4.5</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={3} className={css.list}>
          { places?.map((place,i) =>(
            <Grid item ref={elementRefs[i]} key={i} xs={12}>
              <PlaceDetails 
                place={place} 
                selected ={Number(childCliked) === i} 
                refProp = {elementRefs[i]}
              />
            </Grid>  
          ))}
        </Grid>
      </>
      )}
    </div>
  )
}

export default List
