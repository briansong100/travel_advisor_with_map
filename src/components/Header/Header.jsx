import React, { useState } from 'react'
import { AppBar, Toolbar, Box, Typography, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './styles'
import { Autocomplete  } from '@react-google-maps/api';

const Header = ({setCordinates}) => {
	const css = useStyles()
	const [ autoComplete, setAutoComplete] =useState(null)

	const onLoad = ( c) => setAutoComplete(c)
	const onPlaceChanged = ()=>{
		const lat = autoComplete?.getPlace().geometry.location.lat();
		const lng = autoComplete?.getPlace().geometry.location.lng();
		console.log(lat, lng)
		setCordinates({lat, lng})
	} 
	return (
		<AppBar position="static">
			<Toolbar className={css.toolbar}>
				<Typography variant='h5' className={css.title}>
					Travel Advisor
				</Typography>
				<Box display="flex" >
					<Typography variant='h6'>
						Explore new places
					</Typography>
					<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} key="AIzaSyB2bjoUeFp9fwt9RMVB44lCjEic8WM_9FU">
					// It can be open when you register the paid API
	  			{/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} > */}
						<div className={css.search}>
							<div className={css.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase placeholder="Search…" classes={{ root: css.inputRoot, input: css.inputInput }} />
						</div>
	  			</Autocomplete>
				</Box>	
			</Toolbar>
		</AppBar>
	)
}

export default Header
