import React, { useState, useEffect } from 'react'
import { createContext } from "react";
import Spin from '../components/Spin';
import axios from 'axios';
import url from '../components/API-links/apiurl'
import { useLocation } from 'react-router-dom';
import Spinner from '../components/uitilities/Spinner';
import CountdownTimer from '../components/CountdownTimer';
import WinnerChart from '../components/WinnerChart';


export const SelectContext = createContext()
export const TimesContext = createContext()
export const WarningContext = createContext()
export const WarningTimesContext = createContext()

function Random() {
  window.scrollTo(0, 50)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem('myToken')
  const CheckToken = localStorage.getItem('CheckToken')
  const [prize, setPrize] = useState();
  const [prizes, getPrizes] = useState([])
  const [event, getEvent] = useState([])
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [showWarningPrize, setShowWarningPrize] = useState(false)
  const [showWarningTimes, setShowWarningTimes] = useState(false)
  const [ getWeek, setgetWeek ] = useState([])
  let getPrizeID = localStorage.getItem('PrizeID')
  let Times = localStorage.getItem('Times')
  let Save = localStorage.getItem('Save')
  const [PrizeID, setPrizeID] = useState(getPrizeID)
  const [times, setTimes] = useState(Save ? Times : null)
  const [winner, getWinner] = useState([])
  const [hint, showHint] = useState(true)
  const location = useLocation();
  const splitLocation = location.pathname

  function getPrize(id) {
    setPrize(id.target.value);
    setShowWarningPrize(false)
    localStorage.setItem('PrizeID', id.target.value)
    localStorage.setItem('Save', true)
  }

  function getTimes(id) {
    setTimes(id.target.value);
    // console.log(id.target.value)
    setShowWarningTimes(false)
    localStorage.setItem('Times', id.target.value)
    localStorage.setItem('Save', 1)
  }

  useEffect(() => {
    const getPrizeAPI = async () => {
      await axios.get(url.Mainurl + url.getPrizeKey, {headers: {"Authorization" : `Bearer ${token}`}})
        .then((response) => {
          getPrizes(response.data)
          setLoading1(true)
        })
    }
    getPrizeAPI()

    const getRandomAPI = async () => {
      await axios.get(url.Mainurl + url.getRandom)
        .then((response) => {
          setLoading2(true)
        })
    }
    getRandomAPI()

    const getWinnerAPI = async () => {
      await axios.get(url.Mainurl + url.getWinner)
        .then((response) => {
          getWinner(response.data.data)
          setLoading3(true)
        })
    }
    getWinnerAPI()

    const getWeek = async () => {
      await axios.get(url.Mainurl + url.getWeek)
      .then((response) => {
        setgetWeek(response.data.reverse())
      })
    }
    getWeek()
  }, [])

  let getimes = winner.sort(function (a, b) {
    return b.week_id - a.week_id
  })
  let LimitTimes = getimes.slice(0, 1)
  let LimitTimesID = LimitTimes[0]?.week_id


  return (
    <SelectContext.Provider value={getPrizeID}>
    <TimesContext.Provider value={times}>
      <WarningContext.Provider value={{ showWarningPrize, setShowWarningPrize }}>
        <WarningTimesContext.Provider value={{showWarningTimes, setShowWarningTimes}}>
    <div>
      {loading1 && loading2 && loading3 ? <div className="content-wrapper">
      
      <div className="content-header">
          <div className="container-fluid">
            <div className='ps-fixed'>
                <div className='group-position-SHow bg-success'>
                    <div className='card-header p-4 text-center'><strong>ຈຳການຜູ້ໂຊກດີ</strong></div>
                    <div className='group-card-show text-center'>
                        {/* <label className='border-O'></label> */}
                        <label>( 2 )</label>
                    </div>
                </div>
                <div className='group-position-SHow bg-warning'>
                    <div className='card-header p-4 text-center'><strong>ຈຳນວນລາງວັນ</strong></div>
                    <div className='group-card-show text-center'>
                        {/* <label className='border-O'></label> */}
                        <label>( 2 )</label>
                    </div>
                </div>
            </div>
            <div className="row">
              <div className="col-12">
              </div>
              <CountdownTimer/>
              <div className="col-12 ">
                <div className="card">
                  <div className="card-header">
                    <div className="text-center user-select-none">
                    <p className='h2 p-2'>ຫນ້າສຸ່ມຫາຜູ້ໂຊກດີ</p>
                    </div>
                  </div>
                  {/* /.card-header */}
                  
                  {/* /.card-body */}
                  <div className="bg-white" id="fullScreen">
         {/* <button onClick={openFullscreen}>Fullscreen</button> */}
              <div class="row resize mt-3 card-body">
               <div className="col-md-6 pd-bottom">
               <label className="text-center fw-bold lab scale">ເລືອກລາງວັນ:</label>
                <select onChange={getPrize} className="form-control shadow-sm rounded rounded-2 bg-white scale" name="" id="">
                  <option selected="" value={PrizeID == null ? "" : PrizeID}>{PrizeID == null ? "--ກະລຸນາເລືອກລາງວັນ--" : `ລາງວັນທີ ${PrizeID} ຈຳນວນເງິນ ${prizes.filter(e => e.id == PrizeID).map(e => parseInt(e.description).toLocaleString())} ກີບ ຈຳນວນ ${prizes.filter(e => e.id == PrizeID).map(e => (e.quantity))} ລາງວັນ`} </option>
                  {prizes.map((e, key) =>
                    <option className="fs-5 text-black" key={key} value={e.id}>{`ລາງວັນທີ ${e.id} ຈຳນວນເງິນ ${parseInt(e.description).toLocaleString()} ກີບ ຈຳນວນ ${e.quantity} ລາງວັນ`}</option>
                  )}
                </select>
               </div>
               <div className="col-md-6 pd-bottom">
               <label className="text-center fw-bold ms-4 lab scale">ເລືອກງວດ:</label>
                {/* <input onChange={getTimes} className="form-control shadow-sm rounded rounded-2 scale" type="number" placeholder={`ກະລຸນາປ້ອນງວດ...`} defaultValue={times} min={1} autoFocus/> */}
                <select onChange={getTimes} className="form-control shadow-sm rounded rounded-2 scale" type="number" defaultValue={times} min={1} autoFocus disabled>
                  <option>ກະລຸນາປ້ອນງວດ...</option>
                  {getWeek.map((item) => (
                    <option value={item.id}>ງວດທີ່: {item.id}</option>
                  ))}
                </select>
                {times ? "" : <label className="text-center lab scale text-warning">ງວດລ່າສຸູດແມ່ນ {LimitTimesID}</label> }
               </div>
              </div>

              <Spin/> 
              <div className='group-Cart'>
                <WinnerChart/>
              </div>
          </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div> 
        </div> : <Spinner />}
        
      </div>
      </WarningTimesContext.Provider>
      </WarningContext.Provider>
      </TimesContext.Provider>
      </SelectContext.Provider>
  )
}

export default Random