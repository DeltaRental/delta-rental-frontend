import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { brandList, deleteBrand } from '../../../store/slices/brandSlice'
import AddBrand from './AddBrand'
import UpdateBrand from './UpdateBrand'
type Props = {}

const Brand = (props: Props) => {
  
  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any)=> state.brand);

  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);

  
  useEffect(()=>{
    dispatch(brandList());
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    console.log(typeof e.target.value);
    
    setSelectedBrand(parseInt(e.target.value, 10));
  }

  const handDeleteBrand =  async() =>{
    if(selectedBrand !== null){
      await dispatch(deleteBrand({id: selectedBrand}));
      setSelectedBrand(null);
      dispatch(brandList());
    }
  };
  return (
    <div>
      <h2>Brand List</h2>
      <select value={selectedBrand || ''} onChange={handleSelectChange}>
      <option value="" disabled>Select a brand</option>
      {brandState.brands.map((brand:any)=>(
        <option key={brand.id} value={brand.id}>
          {brand.name}
        </option>
      ))}
      </select>
      <button onClick={handDeleteBrand}  >Sil</button>
    </div>
  )
}

export default Brand;