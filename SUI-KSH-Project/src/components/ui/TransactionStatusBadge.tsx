import React from 'react';
import { TransactionStatus } from '../../types';

// Component to display the status of a transaction
interface TransactionStatusBadgeProps {
  status: TransactionStatus;
}

const TransactionStatusBadge: React.FC<TransactionStatusBadgeProps> = ({ status }) => {
  const getBadgeClasses = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeClasses()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default TransactionStatusBadge;