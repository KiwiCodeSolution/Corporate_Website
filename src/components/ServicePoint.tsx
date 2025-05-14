const ServicePoint = ({ styles, label }: { styles?: string; label: string }) => {
  return (
    <li className={`card-wrapper-service-point ${styles}`}>
      <div className={`w-fit py-[2px] px-[19px] bg-bgColor text-main rounded-base`}>{label}</div>
    </li>
  );
};

export default ServicePoint;
