import MotionPrinciple1 from './motions/Principle1';
import MotionPrinciple2 from './motions/Principle2';
import MotionPrinciple3 from './motions/Principle3';
import MotionPrinciple4 from './motions/Principle4';

const PhoneContent = ({ currentItem }: { currentItem: number }) => {
  switch (currentItem) {
    case 0:
      return <MotionPrinciple1 />;
    case 1:
      return <MotionPrinciple2 />;
    case 2:
      return <MotionPrinciple3 />;
    case 3:
      return <MotionPrinciple4 />;
    default:
      return null;
  }
};

export default PhoneContent;
