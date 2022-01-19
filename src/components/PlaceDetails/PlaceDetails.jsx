import React from 'react' 
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating'

import useStyles from '../PlaceDetails/styles'
// import LocationOn from '@material-ui/icons/LocationOn'
import restImage from '../../image/restaurant.webp'

const PlaceDetails = ({place, selected, refProp }) => {
  const css= useStyles()
  if (selected) refProp?.current?.scrollIntoView({behavior: "smooth", block:"start"})

  return (
    <Card elevation={6} >
       <CardMedia 
        style={{ height:350}}
        image ={ place.photo ? place.photo.images.large.url : restImage }
        title={place.name}
       /> 
       <CardContent >
         <Typography gutterBottom variant='h5'>{place.name}</Typography>
         { place.rating && (
         <Box display="flex" justifyContent="space-between" >
           <Rating value={Number(place.rating)} readOnly /> 
           <Typography variant='subtitle1' gutterBottom >out of {place.num_reviews} reviews</Typography> 
         </Box>
         )}

         { place.price_level && (
         <Box display="flex" justifyContent="space-between" >
           <Typography variant='subtitle1'>Price</Typography> 
           <Typography variant='subtitle1' gutterBottom >{place.price_level}</Typography> 
         </Box>
         )}
         
         { place.ranking && (
         <Box display="flex" justifyContent="space-between" >
           <Typography variant='subtitle1'>Ranking</Typography> 
           <Typography variant='subtitle1' gutterBottom >{place.ranking}</Typography> 
         </Box>
         )}
         {place?.awards?.map((award, i)=>(
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center" key={i}>
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant='subtitle1' color = 'textSecondary'>{award.display_name}</Typography>
          </Box>
         ))}
        {place?.cuisine?.map( ({name})=>(
          <Chip key={name} size='small' label={name} className={css.chip} />
        ) ) }
        { place?.address && 
        <Typography variant='body2' gutterBottom color='textSecondary' className={css.subtitle}>
          <LocationOnIcon />{place.address}
        </Typography>}
        { place?.phone && 
        <Typography variant='body2' gutterBottom color='textSecondary' className={css.spacing}>
          <PhoneIcon />{place.phone}
        </Typography>}

       </CardContent>
       <CardActions >
         <Button  size='small' color='primary' 
          onClick={ ()=>window.open(place.web_url)}>Trip Advisor</Button>
         <Button  size='small' color='primary' 
          onClick={ ()=>window.open(place.website, '_blank')}>Website</Button>
       </CardActions>
    </Card>

    )
}

export default PlaceDetails
