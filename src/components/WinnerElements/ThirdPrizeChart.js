import React, { useState, useEffect } from 'react'
import axios from 'axios'
import url from '../API-links/apiurl'

function ThirdPrizeChart() {
    const [data, setData] = useState([])

    useEffect(() => {
        const getSinglePrizeAPI = async () => {
            await axios.get(url.Mainurl + url.getWinner)
                .then((response) => {
                    setData(response.data.data)
                }).catch((error) => {
                    console.log(error.response)
                })
        }
        getSinglePrizeAPI()
    }, [])

    let times = data.sort(function (a, b) {
        return b.week_id - a.week_id
    })
    let LimitTimes = times.slice(0, 1)
    let LimitTimesID = LimitTimes[0]?.week_id

    let event = data.sort(function (a, b) {
        return b.id - a.id
    })
    let ThirdWinners = event.filter(e => e.prize_id === 3 && e.week_id === LimitTimesID)
    let LimitThirdWinners = ThirdWinners.slice(0, 20)

    return (
        <div>
            {LimitThirdWinners.map((e, index) => {
        return (
          <div key={index}>
            <div className='my-1 text-center text-white'>
              <div className='text-center fs-4'>{index + 1}</div>
              <p className='pt-3 fs-4 fw-bold'>{e.fullName}</p>
              <p className='fs-4 fw-bold'>{e.bil_number}</p>
              <p className='fs-4 fw-bold'>ງວດທີ {e.week_id}</p>
            </div>
            <hr className='text-white border border-1' />
          </div>
        )
      }
      )}
        </div>
    )
}

export default ThirdPrizeChart