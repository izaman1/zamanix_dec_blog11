import React from 'react';
import { Coins, Calendar, Gift, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function MyCoins() {
  const { user } = useUser();

  if (!user) return null;

  const rewards = [
    { coins: 10, reward: '₹50 off on orders above ₹500' },
    { coins: 20, reward: '₹100 off on orders above ₹1,000' },
    { coins: 30, reward: 'Free shipping on any order' },
    { coins: 50, reward: 'Exclusive early access to new collections' }
  ];

  const getStreakBonus = () => {
    const baseCoins = 1;
    const streakBonus = Math.min(user.loginStreak, 2); // Max 2 bonus coins
    return baseCoins + streakBonus;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-light">My Coins</h2>
        <div className="flex items-center space-x-2">
          <Coins className="h-6 w-6 text-yellow-500" />
          <span className="text-2xl font-light">{user.coins}</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-light">Daily Login Streak</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Current Streak</span>
            <span className="font-medium">{user.loginStreak} days</span>
          </div>
          <div className="text-sm text-gray-500">
            Login tomorrow to earn {getStreakBonus()} coins!
            <div className="mt-1 text-xs">
              (Base: 1 coin + Streak Bonus: {Math.min(user.loginStreak, 2)} coins)
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Gift className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-light">Available Rewards</h3>
        </div>
        <div className="space-y-4">
          {rewards.map((reward, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-medium mb-1">{reward.reward}</p>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Coins className="h-4 w-4" />
                  <span>{reward.coins} coins required</span>
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded text-sm ${
                  user.coins >= reward.coins
                    ? 'bg-black text-white hover:bg-black/90'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={user.coins < reward.coins}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Award className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-light">How to Earn More</h3>
        </div>
        <div className="space-y-3 text-gray-600">
          <p>• Daily login: 1 coin + streak bonus (up to 2 extra coins)</p>
          <p>• Sign up bonus: 10 coins (one-time)</p>
          <p>• Complete your profile: +2 coins</p>
          <p>• Make a purchase: +5 coins</p>
          <p>• Write a product review: +3 coins</p>
          <p>• Refer a friend: +10 coins</p>
        </div>
      </div>
    </div>
  );
}