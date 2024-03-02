import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

type Props = {}

function PaymentSuccess({}: Props) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // 5 saniyelik sayaç

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/profile/rentals');
    }, 5000); // 5 saniye sonra yönlendirme yapar

    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // Her saniye sayaç azalır

    return () => {
      clearTimeout(timer); 
      clearInterval(countdownTimer); 
    };
  }, [navigate]);

  return (
    <div className='h-screen bg-gray-200 flex flex-col gap-5 justify-center items-center'>
      <FontAwesomeIcon className='text-8xl text-delta-green-1000' icon={faCircleCheck} />
      <h1 className='text-delta-green-1000 font-bold text-4xl'>ÖDEME BAŞARILI</h1>
      <p className='text-delta-green-1000 font-bold text-xl'>
        {countdown} saniye sonra siparişlerinize yönlendirileceksiniz...
      </p>
    </div>
  );
}

export default PaymentSuccess;


