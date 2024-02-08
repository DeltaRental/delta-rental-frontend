// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppDispatch } from '../../store/store';
// import { fetchBrands } from '../../store/slices/brandSlice';

// type Props = {}

// const Brand = (props: Props) => {
//     const brandsState = useSelector((state: any)=> state.brand);
//     const dispatch = useDispatch<AppDispatch>();
//     useEffect(()=>{
//         dispatch(fetchBrands());
//     }, [dispatch]);
//   return (
//     <div>
//         {brandsState.b}
//     </div>
//   )
// }

// export default Brand