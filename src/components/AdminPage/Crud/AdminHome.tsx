import React from 'react'
import Model from '../CarModel/Model'
import Brand from '../Brand/Brand'
import AddBrand from '../Brand/AddBrand'
import UpdateBrand from '../Brand/UpdateBrand'
import AddModel from '../CarModel/AddModel'
import AddCar from './AddCar'

type Props = {}

const AdminHome = (props: Props) => {
  return (
    <div >
        <div className='m-3 w-[54.15rem] overflow-y-auto h-[39rem] text-black rounded-lg'>
        AdminHome
        <AddCar/>
        {/* <AddModel/> */}
        </div>
    </div>
  )
}

export default AdminHome