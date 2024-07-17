'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAssetData } from '../../store/slices/assetSlice';
import { RootState, AppDispatch } from '../../store';
import ChangeAssetModal from './ChangeAssetModal';

const AssetTable: React.FC<{ initialAsset: string }> = ({ initialAsset }) => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.asset.data);
  const [asset, setAsset] = useState(initialAsset);
  const [showModal, setShowModal] = useState(false);
  const [secondLatestRate, setSecondLatestRate] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchAssetData(asset));
    const intervalId = setInterval(() => {
      dispatch(fetchAssetData(asset));
    }, 5000);
    return () => clearInterval(intervalId);
  }, [dispatch, asset]);

  useEffect(() => {
    console.log(data.length);
    if (data.length > 1) {
      setSecondLatestRate(data[5].rate);
    }
  }, [data]);

  const renderDelta = (currentRate: number, previousRate: number) => {
    if (!previousRate) {
      return null;
    }

    const difference = currentRate - previousRate;
    const percentDifference = Math.abs((difference / previousRate) * 100).toFixed(2);
    const x : string = percentDifference.toString();

    let deltaText = '';
    if (difference < 0) {
      deltaText = `-${x}%`;
    } else if (difference > 0) {
      deltaText = `+${x}%`;
    } else {
      deltaText = `0.00%`;
    }

    return (
      <span className={difference < 0 ? 'text-red-500' : 'text-green-500'}>
        ({deltaText})
      </span>
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Current Asset: {asset}</h1>
          <div className="flex items-center">
            <div className="mr-4">
              <span className="text-gray-500">Change:</span>
            </div>
            <div>
              {data.length > 1 ? renderDelta(data[0].rate, data[5].rate) : null}
            </div>
          </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Change Asset
        </button>
      </div>

      {showModal && (
        <ChangeAssetModal 
          onChangeAsset={(newAsset: string) => setAsset(newAsset)} 
          onClose={() => setShowModal(false)} 
        />
      )}

      <table className="min-w-full bg-black border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Time</th>
            <th className="border border-gray-300 px-4 py-2">Code</th>
            <th className="border border-gray-300 px-4 py-2">Rate</th>
            <th className="border border-gray-300 px-4 py-2">Volume</th>
            <th className="border border-gray-300 px-4 py-2">Market Cap</th>
            <th className="border border-gray-300 px-4 py-2">Delta Hour</th>
            <th className="border border-gray-300 px-4 py-2">Delta Day</th>
            <th className="border border-gray-300 px-4 py-2">Delta Week</th>
            <th className="border border-gray-300 px-4 py-2">Delta Month</th>
            <th className="border border-gray-300 px-4 py-2">Delta Quarter</th>
            <th className="border border-gray-300 px-4 py-2">Delta Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry: any, index: number) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(entry.timestamp).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{entry.code}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.rate.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.volume.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.cap.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2">
                {(entry.delta.hour * 100 - 100).toFixed(2)}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(entry.delta.day * 100 - 100).toFixed(2)}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(entry.delta.week * 100 - 100).toFixed(2)}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(entry.delta.month * 100 - 100).toFixed(2)}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(entry.delta.quarter * 100 - 100).toFixed(2)}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(entry.delta.year * 100 - 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
