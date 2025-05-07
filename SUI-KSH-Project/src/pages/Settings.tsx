import { useState } from 'react';
import { Shield, Sliders, Wallet, AlertCircle, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useExchange } from '../context/ExchangeContext';

//page for user settings 
const Settings = () => {
  const { user, updateUserProfile } = useAuth();
  const { slippageTolerance, fees, updateSlippageTolerance, updateFees } = useExchange();
  
  const [suiAddress, setSuiAddress] = useState(user?.suiAddress || '');
  const [mpesaNumber, setMpesaNumber] = useState(user?.mpesaNumber || '');
  const [slippageValue, setSlippageValue] = useState(slippageTolerance);
  const [feePercentage, setFeePercentage] = useState(fees.percentage);
  const [flatFee, setFlatFee] = useState(fees.flat);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleSaveUserProfile = async () => {
    setIsSaving(true);
    try {
      const success = await updateUserProfile({
        suiAddress,
        mpesaNumber,
      });
      
      if (success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleUpdateSlippage = (value: number) => {
    setSlippageValue(value);
    updateSlippageTolerance(value);
  };
  
  const handleUpdateFees = () => {
    updateFees(feePercentage, flatFee);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences.</p>
      </div>
      
      {/* Settings Cards */}
      <div className="space-y-6">
        {/* User Profile */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-center">
              <Wallet className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Wallet Settings</h2>
            </div>
          </div>
          
          <div className="p-6">
            {saveSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-green-700">
                    Your profile has been updated successfully.
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label htmlFor="sui-address" className="block text-sm font-medium text-gray-700 mb-1">
                  SUI Wallet Address
                </label>
                <input
                  id="sui-address"
                  type="text"
                  value={suiAddress}
                  onChange={(e) => setSuiAddress(e.target.value)}
                  placeholder="0x..."
                  className="input"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Your SUI wallet address for receiving SUI tokens.
                </p>
              </div>
              
              <div>
                <label htmlFor="mpesa-number" className="block text-sm font-medium text-gray-700 mb-1">
                  M-PESA Number
                </label>
                <input
                  id="mpesa-number"
                  type="text"
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  placeholder="254XXXXXXXXX"
                  className="input"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Your M-PESA number for receiving KSH payments.
                </p>
              </div>
              
              <button
                onClick={handleSaveUserProfile}
                disabled={isSaving}
                className="btn btn-primary"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Wallet Settings'
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Exchange Settings */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-center">
              <Sliders className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Exchange Settings</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="slippage" className="block text-sm font-medium text-gray-700 mb-1">
                  Slippage Tolerance: {slippageValue}%
                </label>
                <input
                  id="slippage"
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={slippageValue}
                  onChange={(e) => handleUpdateSlippage(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>0.1%</span>
                  <span>5%</span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Sets the maximum price change you're willing to accept for your transaction.
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">About Slippage</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Higher slippage tolerance means your transaction is more likely to go through during high volatility, but you might receive less than expected. Lower slippage gives better pricing but may cause transactions to fail.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security Settings - Only visible for admin users */}
        {user?.email === 'admin@example.com' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Admin Settings</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="fee-percentage" className="block text-sm font-medium text-gray-700 mb-1">
                    Fee Percentage (%)
                  </label>
                  <input
                    id="fee-percentage"
                    type="number"
                    min="0"
                    step="0.1"
                    value={feePercentage}
                    onChange={(e) => setFeePercentage(parseFloat(e.target.value))}
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="flat-fee" className="block text-sm font-medium text-gray-700 mb-1">
                    Flat Fee
                  </label>
                  <input
                    id="flat-fee"
                    type="number"
                    min="0"
                    step="1"
                    value={flatFee}
                    onChange={(e) => setFlatFee(parseFloat(e.target.value))}
                    className="input"
                  />
                </div>
                
                <button
                  onClick={handleUpdateFees}
                  className="btn btn-primary"
                >
                  Update Fee Structure
                </button>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Admin Only</h3>
                      <p className="text-sm text-red-700 mt-1">
                        These settings affect all users and the financial operations of the platform. Change with caution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;