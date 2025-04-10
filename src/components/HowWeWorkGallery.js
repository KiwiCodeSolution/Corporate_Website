'use client';
import Image from 'next/image';
import { useState } from 'react';
import Title from './Title';

const HowWeWorkGallery = () => {
  const [currentItem, setCurrentItem] = useState(1);
  const [visible, setVisible] = useState(true);

  const ITEMS = [
    {
      id: '835sjHPnt6E',
      title: 'Research and Design',
      text: 'At KiWiCode Solutions, our journey begins with in-depth research and design. We conduct thorough market analysis and gather insights into your project`s goals and target audience. Our expert designers craft visually appealing and user-centric designs that set the foundation for a successful project.',
      img: '/images/how_we_work_1.png',
    },
    {
      id: 'e96fe2AG6Kb',
      title: 'Development',
      text: 'Once the design is approved, our skilled development team steps in. Using cutting-edge technologies, we transform designs into functional tech products. At KiWiCode Solutions, we specialize in creating custom solutions tailored to your specific needs, ensuring your project is unique and fully responsive.',
      img: '/images/how_we_work_2.png',
    },
    {
      id: 'v6k2Cj4b6VN',
      title: 'Testing and Optimization',
      text: 'Quality is our priority. In the testing and optimization phase, we perform extensive quality assurance to identify and resolve any issues, ensuring a seamless user experience. We also optimize performance, ensuring your project loads quickly and efficiently.',
      img: '/images/how_we_work_3.png',
    },
    {
      id: 'r5uhG9CLx25',
      title: 'Launching the Project',
      text: 'KiWiCode Solutions ensures a smooth and secure project launch. We handle the technical aspects of deployment, making your project accessible to your audience. This is the exciting moment when your project goes live and becomes available to users.',
      img: '/images/how_we_work_4.png',
    },
  ];

  const handleItemHover = (id) => {
    if (id === currentItem) return;
    setVisible(false);
    setTimeout(() => {
      setCurrentItem(id);
      setVisible(true);
    }, 200);
  };

  return (
    <div className="flex items-center ml-[47px] gap-x-[74px] justify-between relative z-[1]">
      <div className="w-[1px] h-[440px] rounded-[1px] absolute top-1/2 -translate-y-1/2 -left-[42px] bg-[#E6E9EA]" />
      <ul className="w-[314px] h-full flex flex-col gap-y-[25px]">
        {ITEMS.map((el, id) => (
          <li
            key={el.id}
            onMouseEnter={() => handleItemHover(id)}
            className={`${currentItem !== id ? 'opacity-50' : 'opacity-100'} relative transition-opacity duration-300`}
          >
            {currentItem === id && (
              <div className="absolute top-1/2 -translate-y-1/2 -left-[44px] w-[5px] h-20 rounded-[3px] bg-[#5BD187]" />
            )}

            <Title styles={'mb-2'}>{el.title}</Title>
            <p className="line-clamp-3 text-main-grey">{el.text}</p>
          </li>
        ))}
      </ul>

      <div
        className={`
    w-[630px] h-[461px] flex items-end relative rounded-base overflow-hidden p-10 my-auto
    transition-opacity duration-2000 ease-in-out
    ${visible ? 'opacity-100' : 'opacity-0'}
  `}
      >
        <Image
          src={ITEMS[currentItem].img}
          width={360}
          height={461}
          className="w-full h-full object-center object-cover absolute top-0 left-0 transition-opacity duration-2000 ease-in-out"
          alt=""
        />
        <div className="bg-white rounded-base p-6 relative z-[1] mt-auto transition-opacity duration-2000 ease-in-out">
          <p>{ITEMS[currentItem].text}</p>
        </div>
      </div>
    </div>
  );
};

export default HowWeWorkGallery;
