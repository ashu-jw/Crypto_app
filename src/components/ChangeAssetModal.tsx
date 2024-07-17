'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from '../../store/slices/assetSlice';

const ChangeAssetModal: React.FC<{ onChangeAsset: (asset: string) => void, onClose: () => void }> = ({ onChangeAsset, onClose }) => {
  const [asset, setAsset] = useState('');
  const dispatch = useDispatch();
  
  const assets = ['BNB', 'BTC', 'USDT', 'ETH', 'SOL']; // Hardcoded asset options

  const handleChangeAsset = () => {
    dispatch(setData([])); // Clear current data
    onChangeAsset(asset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Change Asset</h2>
        <select
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
          className="border px-4 py-2 mb-4 w-full text-black focus:outline-none focus:ring focus:border-blue-300 rounded"
        >
          <option value="" disabled>Select asset</option>
          {assets.map((assetOption) => (
            <option key={assetOption} value={assetOption}>{assetOption}</option>
          ))}
        </select>
        <div className="flex justify-end">
          <button onClick={handleChangeAsset} className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none">Change Asset</button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeAssetModal;
