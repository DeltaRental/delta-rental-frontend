import React from 'react'
import Model from '../CarModel/Model'
import Brand from '../Brand/Brand'
import AddBrand from '../Brand/AddBrand'
import UpdateBrand from '../Brand/UpdateBrand'

type Props = {}

const AdminHome = (props: Props) => {
  return (
    <div >
        <div className='m-3 w-[49rem] h-[38rem] text-black rounded-lg bg-gray-800'>
        AdminHome
        <Model/>
        <Brand/>
      <AddBrand/>
      <UpdateBrand/>
        </div>
    </div>
  )
}

export default AdminHome