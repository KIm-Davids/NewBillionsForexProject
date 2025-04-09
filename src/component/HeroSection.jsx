'use client';

import Image from 'next/image';
import Image1 from '../../public/assets/images/manstanding.png';
import Image2 from '../../public/assets/images/graph_pointing_up.png';

const HeroSection = () => (
  <div className="flex flex-col items-center mt-6 lg:mt-20">
    <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide font-[Arial]">
      Welcome to
      <span className="bg-gradient-to-r from-blue-600 to-blue-950 text-transparent bg-clip-text">
        {' '}
        Billions Forex Trade
      </span>
    </h1>
    <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      Welcome to BillionsForexTrade, your premier crypto investment platform dedicated to maximizing your financial growth.
      Our mission is to provide you with a seamless investment experience through daily profits, instant withdrawals, and fast payouts.
    </p>
    <div className="flex justify-center my-10">
      <a href="" className="bg-gradient-to-r from-blue-600 to-blue-800 py-3 px-4 mx3 rounded-md">
        Invest Now
      </a>
      <a href="" className="py-3 px-4 mx-3 rounded-md border">
        Read More
      </a>
    </div>
    <div className="flex mt-10 justify-center">
      <Image
        src={Image1}
        alt="first Image"
        className="rounded-lg w-1/2 border border-blue-800 shadow-blue-600 mx-2 my-4"
      />
      <Image
        src={Image2}
        alt="first Image"
        className="rounded-lg w-1/2 border border-blue-800 shadow-blue-600 mx-2 my-4"
      />
    </div>
  </div>
);
export default HeroSection;
