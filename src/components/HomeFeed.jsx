import { useState, useEffect} from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Sidebar, Videos } from './'

import { fetchFromAPI } from '../utils/fetchFromAPI'

const HomeFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&a=${selectedCategory }`).then((data) => setVideos(data.items))
  }, [selectedCategory])

  return (
    <Stack
      sx={{
        flexDirection: { 
          sx: 'column', 
          md: 'row'
        }
      }}
    > 
      <Box 
        sx={{ 
          height: { 
            sx: 'auto', 
            md:'92vh'
          },
          borderRight: '1px solid #3d3d3d',
          px: {
            sx: 0,
            md: 2,
          }  
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        >

        </Sidebar>
        <Typography 
          className='copyright' 
          variant='body2' 
          sx={{ 
            mt: 1.5,
            color: '#fff'
          }}>
          @ Copyright 2023 Andrei Sager
        </Typography>
      </Box>

      <Box
        p={2}
        sx={{
          overflowY: 'auto',
          height: '92vh',
          flex: 2,
        }}
      >
        <Typography 
          variant='h4'
          fontWeight="bold"
          mb={2}
          sx={{
            color: 'white'
          }}
        >
          {selectedCategory} <span 
            style={{ 
              color: '#FC3150'
            }}
          >
            Videos
          </span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  )
}

export default HomeFeed