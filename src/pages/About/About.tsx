import React from 'react'
import Footer from '../../components/Footer/Footer'

type Props = {}

const About = (props: Props) => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div className="flex justify-center items-center flex-grow">
                <div className="m-3 w-[49rem] h-[38rem] text-white rounded-lg bg-gray-800">

                    <p className='m-5 text-left text-4xl text-yellow-300'> Hakkımızda </p>
                    <hr />

                    <p className='m-3 text-left text-2xl text-orange-100'>Delta Rental</p>
                    <p className='m-3 text-stone-100'>Delta Rental, araç kiralama sektöründe öncü bir marka olarak müşterilerine konforlu, hesaplı ve güvenilir bir hizmet sunmaktadır.
                        Onurcan Şenel, Merve Keser ve Rıdvan Gürsoy'un liderliğinde kurulan Delta Rental, Engin Demiroğ ve Halit Enes Kalaycı Önderliğinde Tobeto eğitim platformundan aldığı ilhamla yola çıkmıştır.
                    </p>
                    <hr />
                    <p className='m-5 text-left text-4xl'>Ekip Üyeleri</p>
                    <div className='grid grid-cols-3 gap-3'>
                        <div className="flex flex-col items-center">
                            <a href="https://github.com/rdvngrsy" target="_blank">
                                <img className=' rounded-full object-cover'  src="https://avatars.githubusercontent.com/u/58063753?v=4" alt="RidvanGursoy-image" />
                            </a>
                            <p>Rıdvan Gürsoy</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <a href="https://github.com/mervekeser" target="_blank">
                                <img className='h-full w-full rounded-full object-cover' src="https://avatars.githubusercontent.com/u/119412056?v=4" alt="MerveKeser-image" />
                            </a>
                            <p>Merve Keser</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <a href="https://github.com/onursenel" target="_blank">
                                <img className='h-full w-full rounded-full object-cover' src="https://avatars.githubusercontent.com/u/102322010?v=4" alt="OnurcanŞenel-image" />
                            </a>
                            <p>Onurcan Şenel</p>
                        </div>
                    </div>


                </div>

            </div>

            <Footer></Footer>
        </div>

    )
}

export default About