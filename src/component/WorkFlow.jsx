'use client';

import { CheckCircle, checkCircle2 } from 'lucide-react';
import Image from 'next/image';
import image from '../../public/assets/images/manclimbingstairs.png';
import { checklistItems } from '../constants';

const WorkFlow = () => (
  <div className="mt-20 ">
    <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
      Experience You Can Trust
      <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
        {' '}
        Over 10 Years in Cryptocurrency Investment <br /><br /><br />
      </span>
    </h2>
    <div className="flex flex-wrap justify-center">
      <div className="p-2 w-full lg:w-1/2">
        <Image
          src={image}
          alt="image"
        />
      </div>
      <div className="pt-12 w-full lg:w-1/2">
        {checklistItems.map((item, index) => (
          <div key={index} className="flex mb-12">
            <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
              <CheckCircle />
            </div>
            <div>
              <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
              <p className="text-md text-neutral-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WorkFlow;
