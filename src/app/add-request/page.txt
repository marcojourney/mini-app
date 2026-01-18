'use client';

import React, { useState } from 'react';
import { Heart, MapPin, Users, Phone, AlertCircle, Package, Send, CheckCircle } from 'lucide-react';

export default function BorderAidApp() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    people: '',
    contact: '',
    urgency: 'medium',
    needs: {
      food: false,
      water: false,
      medicine: false,
      shelter: false,
      transport: false,
      clothing: false
    },
    additionalInfo: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNeedToggle = (need) => {
    setFormData(prev => ({
      ...prev,
      needs: { ...prev.needs, [need]: !prev.needs[need] }
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // In a real app, this would send data to aid coordination servers
    console.log('Aid request submitted:', formData);
  };

  const canProceed = () => {
    if (step === 1) return formData.location && formData.people;
    if (step === 2) return Object.values(formData.needs).some(v => v);
    if (step === 3) return formData.contact;
    return true;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Received</h2>
          <p className="text-gray-600 mb-6">
            Your aid request has been submitted. Relief organizations have been notified and will coordinate assistance as quickly as possible.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 font-medium">Reference ID</p>
            <p className="text-lg font-mono text-blue-900">
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setFormData({
                location: '',
                people: '',
                contact: '',
                urgency: 'medium',
                needs: {
                  food: false,
                  water: false,
                  medicine: false,
                  shelter: false,
                  transport: false,
                  clothing: false
                },
                additionalInfo: ''
              });
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 rounded-full p-3 mr-3">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Emergency Aid Request</h1>
          </div>
          <p className="text-center text-gray-600">
            Request essential supplies and assistance for your group
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {num}
                </div>
                {num < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > num ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Location</span>
            <span>Needs</span>
            <span>Contact</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                Location & Group Size
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Location (nearest landmark, city, or coordinates)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Near border crossing at..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of People
                </label>
                <input
                  type="number"
                  value={formData.people}
                  onChange={(e) => handleInputChange('people', e.target.value)}
                  placeholder="How many people need assistance?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'medium', 'high'].map(level => (
                    <button
                      key={level}
                      onClick={() => handleInputChange('urgency', level)}
                      className={`py-3 rounded-lg font-medium transition ${
                        formData.urgency === level
                          ? level === 'high' ? 'bg-red-600 text-white' :
                            level === 'medium' ? 'bg-orange-500 text-white' :
                            'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Package className="w-6 h-6 mr-2 text-blue-600" />
                What Do You Need?
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { key: 'food', label: 'Food', icon: '🍞' },
                  { key: 'water', label: 'Water', icon: '💧' },
                  { key: 'medicine', label: 'Medicine', icon: '💊' },
                  { key: 'shelter', label: 'Shelter', icon: '🏕️' },
                  { key: 'transport', label: 'Transport', icon: '🚐' },
                  { key: 'clothing', label: 'Clothing', icon: '👕' }
                ].map(need => (
                  <button
                    key={need.key}
                    onClick={() => handleNeedToggle(need.key)}
                    className={`p-4 rounded-lg border-2 transition ${
                      formData.needs[need.key]
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{need.icon}</div>
                    <div className="font-medium text-gray-800">{need.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Phone className="w-6 h-6 mr-2 text-blue-600" />
                Contact Information
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number or Contact Method
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  placeholder="Phone, WhatsApp, Signal, or other"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Any other important details..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-blue-600" />
                Review Your Request
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-700 mb-1">Location</div>
                  <div className="text-gray-900">{formData.location}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-700 mb-1">Group Size</div>
                  <div className="text-gray-900">{formData.people} people</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-700 mb-1">Urgency</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    formData.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    formData.urgency === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {formData.urgency.toUpperCase()}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-700 mb-2">Needs</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(formData.needs)
                      .filter(([_, value]) => value)
                      .map(([key, _]) => (
                        <span key={key} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                      ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-700 mb-1">Contact</div>
                  <div className="text-gray-900">{formData.contact}</div>
                </div>
                
                {formData.additionalInfo && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-700 mb-1">Additional Info</div>
                    <div className="text-gray-900">{formData.additionalInfo}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Back
              </button>
            )}
            
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className={`flex-1 py-3 rounded-lg font-medium transition ${
                  canProceed()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Request
              </button>
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mt-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
            <div className="text-sm text-red-800">
              <strong>Emergency:</strong> If in immediate danger, contact local emergency services or humanitarian organizations directly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}