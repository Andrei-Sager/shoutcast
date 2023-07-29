import React, { useEffect } from 'react'
import { useState, useReact } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Typography, Box, Stack } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

import { Videos } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { demoVideoTitle } from '../utils/constants'

const VideoDetails = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetails(data.items[0]));
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => setVideos(data.items));
  }, [id])

  if(!videoDetails?.snippet) return 'loading...'

  const { snippet: { title, channelId, channelTitle,  }, statistics: { viewCount, likeCount } } = videoDetails;

  return (
    <Box
      minHeight='95vh'
    >
      <Stack
        direction={{ sm: 'column', md:'row' }}
      >
        <Box 
          flex={1}
        >
          <Box
            sx={{
              width:'100%',
              position:'sticky',
              top:'86px'
            }}
          >
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls/>
            <Typography
              color='#fff'
              variant='h5'
              fontWeight='bold'
              p={2}
            >
              {title}
            </Typography>
            <Stack
              direction='row' 
              justifyContent='space-between'
              py={1}
              px={2}
              sx={{
                color:'#fff',

              }}
            >
              <Link 
                to={`/channel/${channelId}`}
              >
                <Typography variant={{ sm: 'subtitle1', md:'h6'}} color='#fff'>
                  {channelTitle}
                  <CheckCircle
                    sx={{
                      fontSize:'12px',
                      color:'gray',
                      ml:'5px',
                    }}
                  ></CheckCircle>
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{ opacity: 0.7}}>
                    {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: 0.7}}>
                    {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ xs: 5, md: 1}}>
          <Videos videos={videos} direction="column"/>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetails