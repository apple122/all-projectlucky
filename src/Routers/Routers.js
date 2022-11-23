import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Content from '../components/Content'
import Candidates from '../pages/Candidates'
import Period from '../pages/Period'
import Prizes from '../pages/Prizes'
import Users from '../pages/Users'
import Winner from '../pages/Winner'
import Slider from '../pages/Slider'
import Event from '../pages/Event'
import About from '../pages/About'
import ChangePassword from '../components/ChangePassword'
import CreateUser from '../components/CreateUser'
import CreateEvent from '../components/CreateEvent'
import CreateSlider from '../components/CreateSlider'
import CreatePrize from '../components/CreatePrize'
import CreateCandidate from '../components/CreateCandidate'
import CreatePeriod from '../components/CreatePeriod'
import Login from '../components/Login'
import Province from '../pages/Province'
import CreateProvince from '../components/CreateProvince'
import HomePage from '../pages/HomePage'
import CreateDistrict from '../components/CreateDistrict';
import District from '../pages/District';
import CreateBil from '../components/CreateBil';
import Page404 from './Page404'
import Random from '../pages/Random';
import WinnerDetail from '../pages/WinnerDetail';
import ReloadRandom from '../pages/reloadPages/ReloadRandom'
import ReloadAbout from '../pages/reloadPages/ReloadAbout'
import ReloadDistrict from '../pages/reloadPages/ReloadDistrict'
import ReloadEvent from '../pages/reloadPages/ReloadEvent'
import ReloadPrize from '../pages/reloadPages/ReloadPrize'
import ReloadProvince from '../pages/reloadPages/ReloadProvince'
import ReloadSlider from '../pages/reloadPages/ReloadSlider'
import ReloadUser from '../pages/reloadPages/ReloadUser'
import Candidates_eligibility from '../pages/Candidates_eligibility'

const Routers = () => {
  return (
    <div>
        <Routes>
            <Route path='/content' element={<Content />} />
            <Route path='/user' element={<Users />} />
            <Route path='/add-prize' element={<CreatePrize />} />
            <Route path='/prize' element={<Prizes />} />
            <Route path='/candidates' element={<Candidates />} />
            <Route path='/add-candidate' element={<CreateCandidate />} />
            <Route path='/add-bil' element={<CreateBil />} />
            <Route path='/winner' element={<Winner />} />
            <Route path='/period' element={<Period />} />
            <Route path='/add-period' element={<CreatePeriod />} />
            <Route path='/slider' element={<Slider />} />
            <Route path='/add-slider' element={<CreateSlider />} />
            <Route path='/event' element={<Event />} />
            <Route path='/add-event' element={<CreateEvent />} />
            <Route path='/about' element={<About />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/add-user' element={<CreateUser />} />
            <Route path='/' element={<HomePage/> }/>
            <Route path='/province' element={<Province/>}/>
            <Route path='/district' element={<District/>}/>
            <Route path='/add-province' element={<CreateProvince/>} />
            <Route path='/add-district' element={<CreateDistrict/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/random' element={<Random/>} />
            <Route path='/winnerDetail' element={<WinnerDetail/>} />
            <Route path='/reloadRandom' element={<ReloadRandom/>} />
            <Route path='/reloadAbout' element={<ReloadAbout/>} />
            <Route path='/reloadDistrict' element={<ReloadDistrict/>} />
            <Route path='/reloadEvent' element={<ReloadEvent/>} />
            <Route path='/reloadPrize' element={<ReloadPrize/>} />
            <Route path='/reloadProvince' element={<ReloadProvince/>} />
            <Route path='/reloadSlider' element={<ReloadSlider/>} />
            <Route path='/reloadUser' element={<ReloadUser/>} />
            <Route path='/Candidates_eligibility' element={<Candidates_eligibility/>} />

            <Route path='*' element={<Page404/>} />
        </Routes>
    </div>
  )
}

export default Routers