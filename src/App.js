import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'

import { Navbar, HomeFeed, SearchFeed, VideoDetails, ChannelDetails} from './components'

const App = () => (
    <BrowserRouter>
        <Box sx={{backgroundColor: '#000'}}>
            <Navbar />
            <Routes>
                <Route path='/' exact element={<HomeFeed />} />
                <Route path='/video/:id' element={<VideoDetails />} />
                <Route path='/channel/:id' element={<ChannelDetails />} />
                <Route path='/search/:searchTerm' element={<SearchFeed />} />
            </Routes>
        </Box>
    </BrowserRouter>
)

export default App