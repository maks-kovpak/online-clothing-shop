import { Skeleton } from 'antd';
import './index.scss';

const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <Skeleton.Image active />
      <Skeleton active />
    </div>
  );
};

export default ProductCardSkeleton;
