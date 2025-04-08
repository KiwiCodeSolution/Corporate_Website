'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import useWindowWidth from '@/hooks/useWindowWidth';
import Development from '../assets/icons/development.svg';
import Design from '../assets/icons/design.svg';
import Marketing from '../assets/icons/marketing.svg';
import Ba from '../assets/icons/ba.svg';
import Startup from '../assets/icons/startup.svg';
import Projects from '../assets/icons/projects.svg';
import Title from './Title';

const ServicesList = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const SERVICES = [
    {
      id: 'ncRJ8473rB',
      title: 'Software Development',
      details:
        'Creating efficient and reliable software solutions tailored to meet your business objectives and drive success.',
      icon: Development,
    },
    {
      id: 'i78T9Dze4Y',
      title: 'Design and SMM Services',
      details:
        'Delivering creative designs and impactful social media strategies that elevate your brand and engage your target audience.',
      icon: Design,
    },
    {
      id: '5r454MvxBN',
      title: 'Marketing and PR',
      details:
        'Crafting successful marketing campaigns and PR strategies that boost brand recognition and solidify your market presence.',
      icon: Marketing,
    },
    {
      id: 'Kn23X26xjF',
      title: 'Business Consulting',
      details:
        'Offering expert advice and analysis to optimize business processes and fuel strategic growth.',
      icon: Ba,
    },
    {
      id: '6gYki44FZ7',
      title: 'Turnkey Startup',
      details:
        'Guiding your startup from concept to launch, ensuring success at every stage of development.',
      icon: Startup,
    },
    {
      id: 'j9HG26uZy5',
      title: 'National Projects',
      details:
        'Contributing to the development and execution of large-scale projects that are pivotal to the national economy and society.',
      icon: Projects,
    },
  ];

  const [isOpen, setIsOpen] = useState('');

  const windowWidth = useWindowWidth();
  const columnCountValue = windowWidth < 768 ? 1 : windowWidth < 1280 ? 2 : 3;

  if (!isMounted) return null;

  const columns = Array.from({ length: columnCountValue }, () => []);

  SERVICES.forEach((item, i) => {
    columns[i % columnCountValue].push(item);
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 relative z-1">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4 w-full">
          {column.map((el) => (
            <div className={`card-wrapper ${isOpen === el.id ? 'shadow-md' : ''} `} key={el.id}>
              <div
                className="w-full rounded-base bg-white flex flex-col min-h-[186px] transition-all duration-300 cursor-pointer service-item"
                onClick={() => setIsOpen(isOpen === el.id ? '' : el.id)}
              >
                <Image src={el.icon} alt={`іконка, що описує таку послугу, як ${el.title}`} />

                <Title styles={'mt-[20px]'}>{el.title}</Title>

                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    isOpen === el.id ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p>{el.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ServicesList;
