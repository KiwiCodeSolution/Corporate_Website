'use client';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import useWindowWidth from '@/hooks/useWindowWidth';
import Title from './Title';

const ServicesList = ({ items }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isOpen, setIsOpen] = useState('');

  const windowWidth = useWindowWidth();
  const columnCountValue = windowWidth < 768 ? 1 : windowWidth < 1280 ? 2 : 3;

  if (!isMounted) return null;

  const columns = Array.from({ length: columnCountValue }, () => []);

  items.forEach((item, i) => {
    columns[i % columnCountValue].push(item);
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 relative z-1">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4 w-full">
          {column.map((el) => (
            <div className={`card-wrapper ${isOpen === el.id ? 'shadow-md' : ''}`} key={el.id}>
              <div
                className="w-full rounded-base bg-bgColor flex flex-col min-h-[199px] transition-all duration-300 cursor-pointer service-item text-main"
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

ServicesList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    })
  ).isRequired,
};

export default ServicesList;
