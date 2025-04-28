'use client';

import { useEffect, useState } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth';
import { Bracket } from '@/assets/icons/icons';
import Title from './Title';
import { IService } from './sections/OurServices';
import Modal from './Modal';

type ServicesListProps = {
  items: IService[];
};

const ServicesList = ({ items }: ServicesListProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isOpen, setIsOpen] = useState<IService['id'] | ''>('');
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const columnCountValue = isMobile ? 1 : windowWidth < 1280 ? 2 : 3;

  if (!isMounted) return null;

  const columns: IService[][] = Array.from({ length: columnCountValue }, () => []);

  items.forEach((item, i) => {
    columns[i % columnCountValue].push(item);
  });

  const handleToggle = (id: IService['id']) => {
    setIsOpen((prev) => (prev === id ? '' : id));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 relative z-1">
      <button className="w-full h-10 my-20" onClick={() => setIsOpenModal(true)}>
        MODAL
      </button>
      <Modal onClose={() => setIsOpenModal(false)} isOpen={isOpenModal}>
        <h1 className="text-2xl font-bold">Modal Content</h1>
        <p>This is the content of the modal.</p>
      </Modal>
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4 w-full cursor-pointer">
          {column.map((el) => (
            <div className={`card-wrapper ${isOpen === el.id ? 'shadow-md' : ''}`} key={el.id}>
              <div
                className="w-full rounded-base bg-bgColor flex flex-col min-h-[199px] transition-all duration-300 relative service-item text-main"
                onClick={() => {
                  if (!isMobile) handleToggle(el.id);
                }}
              >
                <div className="w-full h-[44px] flex items-center justify-between">
                  {el.icon}
                  {isMobile && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(el.id);
                      }}
                      className="flex items-center justify-center"
                    >
                      <Bracket
                        green
                        className={`${isOpen === el.id ? 'rotate-90' : '-rotate-90'}  transition-transform duration-300 w-[25px] h-[14px]`}
                      />
                    </button>
                  )}
                </div>

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
