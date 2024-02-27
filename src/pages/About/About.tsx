import React from 'react'
import Footer from '../../components/Footer/Footer'

type Props = {}

const About = (props: Props) => {
    return (
        <div className="flex flex-col justify-between min-h-screen container mx-auto">
            <div className="flex justify-center items-center flex-grow">
                <div className="m-3  text-white rounded-lg bg-delta-green-800">

                    <p className='m-5 text-left text-4xl text-delta-green-1200'> Hakkımızda </p>
                    <hr />

                    <p className='m-3 text-left text-2xl text-delta-green-1200'>Delta Rental</p>
                    <p className='m-3 text-delta-green-400'>Delta Rental, araç kiralama sektöründe öncü bir marka olarak müşterilerine konforlu, hesaplı ve güvenilir bir hizmet sunmaktadır.
                        Onurcan Şenel, Merve Keser ve Rıdvan Gürsoy'un liderliğinde kurulan Delta Rental, Engin Demiroğ ve Halit Enes Kalaycı Önderliğinde Tobeto eğitim platformundan aldığı ilhamla yola çıkmıştır.
                    </p>
                    <hr />
                    <p className='m-5 text-left text-2xl text-delta-green-1200'>Ekip Üyeleri</p>
                    <div className='grid grid-cols-3 gap-3'>
                        <div className="flex flex-col items-center">
                            <a href="https://github.com/rdvngrsy" target="_blank">
                                <img className=' rounded-full object-cover'  src="https://avatars.githubusercontent.com/u/58063753?v=4" alt="RidvanGursoy-image" />
                            </a>
                            <p className='text-delta-green-400'>Rıdvan Gürsoy</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <a href="https://github.com/mervekeser" target="_blank">
                                <img className='h-full w-full rounded-full object-cover' src="https://avatars.githubusercontent.com/u/119412056?v=4" alt="MerveKeser-image" />
                            </a>
                            <p className='text-delta-green-400'>Merve Keser</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <a href="https://github.com/onursenel" target="_blank">
                                <img className='h-full w-full rounded-full object-cover' src="https://avatars.githubusercontent.com/u/102322010?v=4" alt="OnurcanŞenel-image" />
                            </a>
                            <p className='text-delta-green-400'>Onurcan Şenel</p>
                        </div>
                    </div>


                </div>

            </div>
        </div>

    )
}

export default About