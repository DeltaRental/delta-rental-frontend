import React from 'react'
import { addDatas } from './AddData'

type Props = {
  
}

const AddCar = (props: Props) => {
  return (
    <div className=''>Araç Ekle
      {addDatas.map(data=>{
        return(
          <div className='flex justify-center items-center mt-2 p-2'>
            {data.entity} 
          </div>
        )
      })}
    </div>
  )
}

export default AddCar