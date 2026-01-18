"use client";

import React, { useState } from 'react';
import { ShoppingCart, Home, Search, User, Heart, Plus, Minus, MessageCircle, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function GroceryApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatModal, setChatModal] = useState(null);
  const [bookingModal, setBookingModal] = useState(null);
  const [locationModal, setLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    name: 'Phnom Penh City',
    district: 'Chamkar Mon',
    address: 'Street 240, Phnom Penh'
  });

  const locations = [
    { name: 'Phnom Penh City', district: 'Chamkar Mon', address: 'Street 240, Phnom Penh' },
    { name: 'Phnom Penh City', district: 'Daun Penh', address: 'Street 106, Phnom Penh' },
    { name: 'Phnom Penh City', district: 'Toul Kork', address: 'Street 289, Phnom Penh' },
    { name: 'Phnom Penh City', district: 'Russey Keo', address: 'National Road 5, Phnom Penh' },
    { name: 'Kandal Province', district: 'Ta Khmao', address: 'National Road 2, Ta Khmao' },
    { name: 'Kandal Province', district: 'Ang Snuol', address: 'National Road 1, Ang Snuol' },
    { name: 'Siem Reap', district: 'Siem Reap City', address: 'Angkor Street, Siem Reap' },
    { name: 'Battambang', district: 'Battambang City', address: 'Street 1, Battambang' },
  ];

  const products = [
    { 
      id: 1, 
      name: 'Fresh Tomatoes', 
      price: 2.50, 
      unit: 'kg', 
      image: '🍅', 
      category: 'Vegetables', 
      seller: 'Green Farm',
      location: 'Kandal Province',
      distance: 12.5,
      isVerified: true,
      verifiedSince: '2023',
      harvestProgress: 85,
      daysToHarvest: 3,
      plantedDate: '15 days ago',
      expectedHarvest: 'Jan 21, 2026'
    },
    { 
      id: 2, 
      name: 'Carrots', 
      price: 1.80, 
      unit: 'kg', 
      image: '🥕', 
      category: 'Vegetables', 
      seller: 'Fresh Fields',
      location: 'Takeo Province',
      distance: 45.8,
      isVerified: true,
      verifiedSince: '2024',
      harvestProgress: 60,
      daysToHarvest: 12,
      plantedDate: '30 days ago',
      expectedHarvest: 'Jan 30, 2026'
    },
    { 
      id: 3, 
      name: 'Bananas', 
      price: 1.20, 
      unit: 'kg', 
      image: '🍌', 
      category: 'Fruits', 
      seller: 'Tropical Farms',
      location: 'Kampong Speu',
      distance: 38.2,
      isVerified: false,
      verifiedSince: null,
      harvestProgress: 100,
      daysToHarvest: 0,
      plantedDate: '90 days ago',
      expectedHarvest: 'Ready Now!'
    },
    { 
      id: 4, 
      name: 'Apples', 
      price: 3.00, 
      unit: 'kg', 
      image: '🍎', 
      category: 'Fruits', 
      seller: 'Orchard Valley',
      location: 'Kampong Cham',
      distance: 62.4,
      isVerified: true,
      verifiedSince: '2022',
      harvestProgress: 95,
      daysToHarvest: 2,
      plantedDate: '120 days ago',
      expectedHarvest: 'Jan 20, 2026'
    },
    { 
      id: 5, 
      name: 'Lettuce', 
      price: 1.50, 
      unit: 'piece', 
      image: '🥬', 
      category: 'Vegetables', 
      seller: 'Green Farm',
      location: 'Kandal Province',
      distance: 12.5,
      isVerified: true,
      verifiedSince: '2023',
      harvestProgress: 40,
      daysToHarvest: 18,
      plantedDate: '20 days ago',
      expectedHarvest: 'Feb 5, 2026'
    },
    { 
      id: 6, 
      name: 'Potatoes', 
      price: 1.00, 
      unit: 'kg', 
      image: '🥔', 
      category: 'Vegetables', 
      seller: 'Fresh Fields',
      location: 'Takeo Province',
      distance: 45.8,
      isVerified: true,
      verifiedSince: '2024',
      harvestProgress: 75,
      daysToHarvest: 8,
      plantedDate: '60 days ago',
      expectedHarvest: 'Jan 26, 2026'
    },
    { 
      id: 7, 
      name: 'Oranges', 
      price: 2.20, 
      unit: 'kg', 
      image: '🍊', 
      category: 'Fruits', 
      seller: 'Citrus Grove',
      location: 'Kampot Province',
      distance: 95.3,
      isVerified: false,
      verifiedSince: null,
      harvestProgress: 100,
      daysToHarvest: 0,
      plantedDate: '180 days ago',
      expectedHarvest: 'Ready Now!'
    },
    { 
      id: 8, 
      name: 'Onions', 
      price: 1.30, 
      unit: 'kg', 
      image: '🧅', 
      category: 'Vegetables', 
      seller: 'Valley Produce',
      location: 'Prey Veng',
      distance: 54.6,
      isVerified: true,
      verifiedSince: '2025',
      harvestProgress: 55,
      daysToHarvest: 15,
      plantedDate: '45 days ago',
      expectedHarvest: 'Feb 2, 2026'
    },
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getStatusBadge = (product) => {
    if (product.harvestProgress >= 100) {
      return <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">Ready Now</span>;
    }
    return <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">Pre-Order</span>;
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 pt-3 pb-3">
          {/* Top Bar with Location and Cart */}
          <div className="flex items-center justify-between mb-3">
            {/* Location Button */}
            <button 
              onClick={() => setLocationModal(true)}
              className="flex items-center flex-1 hover:bg-gray-50 rounded-lg p-2 -ml-2 transition mr-2"
            >
              <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="ml-2 flex-1 text-left min-w-0">
                <div className="flex items-center">
                  <span className="font-bold text-gray-900 truncate">{selectedLocation.district}</span>
                  <span className="ml-1 text-gray-400 flex-shrink-0">▼</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{selectedLocation.address}</p>
              </div>
            </button>
            
            {/* Cart Icon */}
            <div className="relative flex-shrink-0">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vegetables, fruits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && (
          <div className="p-4 space-y-3">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
                {/* Post header style */}
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    {product.image}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    </div>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs text-gray-500">{product.seller}</p>
                      {product.isVerified && (
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-600">{product.location} • {product.distance} km away</span>
                    </div>
                  </div>
                  <Heart className="w-5 h-5 text-gray-400" />
                </div>

                {/* Product image area */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 mb-3 flex items-center justify-center relative">
                  <span className="text-6xl">{product.image}</span>
                  <div className="absolute top-2 right-2 flex flex-col space-y-1">
                    {getStatusBadge(product)}
                    {product.isVerified && (
                      <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Harvest Progress Section */}
                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">Harvest Progress</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">{product.harvestProgress}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${getProgressColor(product.harvestProgress)}`}
                      style={{ width: `${product.harvestProgress}%` }}
                    ></div>
                  </div>

                  {/* Timeline Info */}
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Planted: {product.plantedDate}</span>
                    {product.daysToHarvest > 0 ? (
                      <span className="font-semibold">{product.daysToHarvest} days left</span>
                    ) : (
                      <span className="font-semibold text-green-600">Available!</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Expected: {product.expectedHarvest}
                  </div>
                </div>

                {/* Price and action */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xl font-bold text-green-600">${product.price}</p>
                    <p className="text-xs text-gray-500">per {product.unit}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-green-700 transition"
                  >
                    {product.harvestProgress >= 100 ? 'Buy Now' : 'Pre-Order'}
                  </button>
                </div>

                {/* Chat and Booking Buttons */}
                <div className="flex space-x-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setChatModal(product)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Chat with Farmer</span>
                  </button>
                  <button
                    onClick={() => setBookingModal(product)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Book Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Cart</h2>
            {cart.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="bg-white rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-4xl mr-4">{item.image}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price} per {item.unit}</p>
                        <p className="text-xs text-green-600 mt-1">{item.expectedHarvest}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-white rounded-lg p-4 mt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4">
            <div className="bg-white rounded-lg p-6 text-center mb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <User className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">Welcome, Farmer!</h2>
              <p className="text-gray-500 text-sm">Fresh vegetables at your doorstep</p>
            </div>
            
            <div className="space-y-2">
              {['My Orders', 'My Bookings', 'Saved Items', 'Chat History', 'Payment Methods', 'Delivery Address', 'Settings', 'Help & Support'].map(item => (
                <div key={item} className="bg-white rounded-lg p-4 flex items-center justify-between">
                  <span className="font-medium">{item}</span>
                  <span className="text-gray-400">›</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {chatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-md mx-auto p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                  {chatModal.image}
                </div>
                <div>
                  <h3 className="font-bold">{chatModal.seller}</h3>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <button onClick={() => setChatModal(null)} className="text-gray-500 text-2xl">×</button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <p className="text-sm">Hello! How can I help you with {chatModal.name}?</p>
                <p className="text-xs text-gray-500 mt-1">2 min ago</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-md mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Book Your Order</h3>
              <button onClick={() => setBookingModal(null)} className="text-gray-500 text-2xl">×</button>
            </div>

            <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-4xl">{bookingModal.image}</span>
              <div className="flex-1">
                <h4 className="font-semibold">{bookingModal.name}</h4>
                <p className="text-sm text-gray-600">{bookingModal.seller}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  <span className="text-xs text-blue-600">{bookingModal.location} • {bookingModal.distance} km</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity ({bookingModal.unit})</label>
                <input
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Delivery Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Expected Harvest:</strong> {bookingModal.expectedHarvest}
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  You'll be notified when ready to ship
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    addToCart(bookingModal);
                    setBookingModal(null);
                  }}
                  className="flex-1 bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Selection Modal */}
      {locationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-md mx-auto max-h-[85vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">Select Delivery Location</h3>
                <button onClick={() => setLocationModal(false)} className="text-gray-500 text-2xl">×</button>
              </div>
              
              {/* Search Location */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your location..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Current Location Button */}
            <div className="p-4 border-b border-gray-200">
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-blue-600">Use Current Location</p>
                  <p className="text-xs text-gray-500">Enable location services</p>
                </div>
              </button>
            </div>

            {/* Saved Locations List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-3">SAVED LOCATIONS</h4>
                <div className="space-y-2">
                  {locations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedLocation(location);
                        setLocationModal(false);
                      }}
                      className={`w-full flex items-start space-x-3 p-3 rounded-lg transition ${
                        selectedLocation.address === location.address 
                          ? 'bg-green-50 border-2 border-green-500' 
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedLocation.address === location.address 
                          ? 'bg-green-100' 
                          : 'bg-gray-100'
                      }`}>
                        <MapPin className={`w-5 h-5 ${
                          selectedLocation.address === location.address 
                            ? 'text-green-600' 
                            : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-900">{location.district}</p>
                        <p className="text-sm text-gray-600">{location.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{location.address}</p>
                      </div>
                      {selectedLocation.address === location.address && (
                        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add New Location Button */}
              <div className="p-4">
                <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition">
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Add New Location</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center flex-1 ${
              activeTab === 'home' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex flex-col items-center justify-center flex-1 relative ${
              activeTab === 'cart' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-8 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
            <span className="text-xs mt-1">Cart</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center flex-1 ${
              activeTab === 'profile' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}