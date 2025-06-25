const ServicePoint = ({ styles, label }: { styles?: string; label: string }) => {
  return (
    <li className={`service-point ${styles}`}>
      <div>{label}</div>
    </li>
  );
};

export default ServicePoint;
