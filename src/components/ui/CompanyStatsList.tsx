import CompanyStatsCard, { CompanyStatsCardProps } from './CompanyStatsCard';

type CompanyStatsListProps = {
  data: Array<CompanyStatsCardProps>;
  className?: string;
};

export default function CompanyStatsList({ data, className = '' }: CompanyStatsListProps) {
  return (
    <ul className={className}>
      {data.map(
        (item: CompanyStatsCardProps): React.ReactElement => (
          <li key={item.statCaption} className="">
            <CompanyStatsCard
              statNumber={item.statNumber}
              statCaption={item.statCaption}
              isAccented={item.isAccented}
            />
          </li>
        )
      )}
    </ul>
  );
}
