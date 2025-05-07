import { ExchangePair, Transaction } from '../types';

// Simulated API endpoints for transactions
// const API_BASE_URL = 'https://api.trasaction.com';

export const getTransactionHistory = async (_userId: string): Promise<Transaction[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Mock transaction history
  // the use of Daraja API for this will be implemented 
  return [
    {
      id: 'tx-001',
      type: 'SUI-KSH',
      amount: 10,
      exchangeRate: 150.25,
      fee: 15,
      status: 'completed',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      fromAddress: '0x123...456',
      toAddress: '254712345678',
      txHash: '0xabc...def',
    },
    {
      id: 'tx-002',
      type: 'KSH-SUI',
      amount: 5000,
      exchangeRate: 0.0065,
      fee: 25,
      status: 'completed',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      fromAddress: '254787654321',
      toAddress: '0x789...012',
      txHash: '0xghi...jkl',
    },
    {
      id: 'tx-003',
      type: 'SUI-KSH',
      amount: 25,
      exchangeRate: 152.10,
      fee: 30,
      status: 'completed',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      fromAddress: '0x345...678',
      toAddress: '254712345678',
      txHash: '0xmno...pqr',
    },
    {
      id: 'tx-004',
      type: 'KSH-SUI',
      amount: 10000,
      exchangeRate: 0.0068,
      fee: 50,
      status: 'failed',
      timestamp: new Date(Date.now() - 432000000), // 5 days ago
      fromAddress: '254787654321',
      toAddress: '0x901...234',
      txHash: '',
    },
  ];
};

export const getTransactionDetails = async (transactionId: string): Promise<Transaction | null> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock transaction details
  if (transactionId === 'tx-001') {
    return {
      id: 'tx-001',
      type: 'SUI-KSH',
      amount: 10,
      exchangeRate: 150.25,
      fee: 15,
      status: 'completed',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      fromAddress: '0x123...456',
      toAddress: '254712345678',
      txHash: '0xabc...def',
    };
  }
  
  // Return null for unknown transaction IDs
  return null;
};

export const initiateTransaction = async (
  pair: ExchangePair,
  fromAddress: string,
  toAddress: string,
  amount: number
): Promise<string> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock transaction initiation
  console.log('Initiating transaction:', {
    pair,
    fromAddress,
    toAddress,
    amount,
  });
  // Simulate success
  if (amount > 0 && fromAddress && toAddress) {
    return 'tx-' + Date.now(); // Return a transaction ID
  }
  
  // Simulate failure
  throw new Error('Failed to initiate transaction');
};