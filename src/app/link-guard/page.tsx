'use client'

import React, { useState } from 'react';
import { Shield, Link2, CheckCircle, AlertTriangle, Eye, Copy, Settings, LogOut, Menu, X, TrendingUp, Lock, Zap, ArrowRight, RefreshCw, Globe } from 'lucide-react';

export default function LinkGuard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [showInterceptionFlow, setShowInterceptionFlow] = useState(false);
  const [interceptedUrl, setInterceptedUrl] = useState('');
  const [scanProgress, setScanProgress] = useState(0);

  const handleScanUrl = () => {
    if (urlInput) {
      setScanProgress(0);
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanResult({
              url: urlInput,
              status: Math.random() > 0.3 ? 'safe' : 'suspicious',
              threatLevel: Math.random() > 0.3 ? 'None' : 'High',
              category: Math.random() > 0.3 ? 'Legitimate' : 'Phishing Attempt',
              ip: '172.45.89.23',
              reputation: Math.random() > 0.3 ? 'Good' : 'Suspicious',
            });
            return 100;
          }
          return prev + Math.random() * 40;
        });
      }, 300);
    }
  };

  const handleProceedToWebsite = () => {
    if (scanResult && scanResult.status === 'safe') {
      window.open(urlInput, '_blank');
      setScanResult(null);
      setUrlInput('');
    }
  };

  const simulateInterception = (url) => {
    setInterceptedUrl(url);
    setShowInterceptionFlow(true);
    setUrlInput(url);
    setScanProgress(0);
    setTimeout(() => handleScanUrl(), 500);
  };

  const NavBar = () => (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => {
            setCurrentPage('dashboard');
            setShowInterceptionFlow(false);
            setScanResult(null);
          }}>
            <Shield className="w-8 h-8" />
            <span className="font-bold text-xl hidden sm:inline">Link Guard</span>
            <span className="text-xs bg-blue-500 px-2 py-1 rounded-full ml-2">Proxy Shield</span>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          <div className="hidden md:flex space-x-1">
            {['dashboard', 'scan', 'history', 'settings'].map(item => (
              <button
                key={item}
                onClick={() => {
                  setCurrentPage(item);
                  setShowInterceptionFlow(false);
                  setScanResult(null);
                }}
                className={`px-4 py-2 rounded-lg capitalize font-medium transition ${
                  currentPage === item 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-blue-500/20'
                }`}
              >
                {item}
              </button>
            ))}
            <button className="px-4 py-2 rounded-lg hover:bg-blue-500/20 transition flex items-center space-x-1">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {['dashboard', 'scan', 'history', 'settings'].map(item => (
              <button
                key={item}
                onClick={() => {
                  setCurrentPage(item);
                  setMobileMenuOpen(false);
                  setShowInterceptionFlow(false);
                  setScanResult(null);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg capitalize font-medium hover:bg-blue-500/20 transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  const InterceptionFlow = () => (
    <div className="space-y-6 mt-8">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-300">
        <div className="flex items-start space-x-4">
          <Shield className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-amber-900">Link Intercepted & Being Scanned</h2>
            <p className="text-amber-800 mt-2">Link Guard proxy has intercepted this link for security analysis</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-700">Intercepted</span>
          </div>
          <p className="text-xs text-gray-600 mb-3">Original Link</p>
          <p className="text-sm font-mono text-gray-900 break-all">{interceptedUrl}</p>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-3 mb-2 mx-auto w-fit">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-blue-600">SCANNING</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-gray-300 shadow-sm opacity-50">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-700">Awaiting Result</span>
          </div>
          <p className="text-xs text-gray-600 mb-3">Target Website</p>
          <p className="text-sm font-mono text-gray-900 break-all">{interceptedUrl}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <p className="text-sm font-semibold text-gray-700 mb-3">Scan Progress</p>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${scanProgress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-2">{Math.round(scanProgress)}% Complete</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-3">
        <h4 className="font-semibold text-gray-900">Security Checks Running</h4>
        <div className="space-y-2">
          {[
            { name: 'Malware Detection', status: 'scanning' },
            { name: 'Phishing Analysis', status: 'scanning' },
            { name: 'SSL Certificate Validation', status: 'completed' },
            { name: 'Domain Reputation Check', status: 'scanning' },
          ].map((check, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{check.name}</span>
              {check.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="animate-spin">
                  <RefreshCw className="w-5 h-5 text-blue-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ScanResultView = () => (
    <div className="space-y-6 mt-8">
      <div className={`rounded-2xl p-8 border-2 ${
        scanResult.status === 'safe' 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
          : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {scanResult.status === 'safe' ? (
              <CheckCircle className="w-12 h-12 text-green-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-12 h-12 text-red-600 flex-shrink-0" />
            )}
            <div>
              <h2 className={`text-3xl font-bold ${scanResult.status === 'safe' ? 'text-green-900' : 'text-red-900'}`}>
                {scanResult.status === 'safe' ? '✓ Safe to Visit' : '⚠ Suspicious Link'}
              </h2>
              <p className={`mt-2 text-lg ${scanResult.status === 'safe' ? 'text-green-800' : 'text-red-800'}`}>
                {scanResult.status === 'safe' 
                  ? 'This link passed all security checks and is safe to visit'
                  : 'This link shows signs of phishing or malicious activity'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Scanned URL</p>
          <p className="text-sm font-mono bg-gray-50 p-3 rounded-lg break-all text-gray-900">{scanResult.url}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Threat Category</p>
          <p className={`text-sm font-semibold ${scanResult.status === 'safe' ? 'text-green-600' : 'text-red-600'}`}>
            {scanResult.category}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Threat Level</p>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-6 rounded ${
                    scanResult.threatLevel === 'None' ? 'bg-green-500' :
                    i < 3 ? 'bg-red-500' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-sm font-semibold">{scanResult.threatLevel}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Domain Reputation</p>
          <p className={`text-sm font-semibold ${scanResult.reputation === 'Good' ? 'text-green-600' : 'text-yellow-600'}`}>
            {scanResult.reputation}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Server IP</p>
          <p className="text-sm font-mono text-gray-900">{scanResult.ip}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Scan Date</p>
          <p className="text-sm text-gray-900">{new Date().toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Security Checks</h4>
        <div className="space-y-2">
          {[
            { name: 'Malware Detection', result: 'Clean' },
            { name: 'Phishing Analysis', result: scanResult.status === 'safe' ? 'Not Detected' : 'Detected' },
            { name: 'SSL Certificate', result: 'Valid' },
            { name: 'Domain Age', result: 'Verified' },
          ].map((check, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{check.name}</span>
              <span className="text-sm font-semibold text-green-600 flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>{check.result}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => {
            setScanResult(null);
            setUrlInput('');
            setShowInterceptionFlow(false);
          }}
          className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-semibold transition"
        >
          Scan Another Link
        </button>
        
        {scanResult.status === 'safe' && (
          <button
            onClick={handleProceedToWebsite}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition flex items-center justify-center space-x-2"
          >
            <Globe className="w-5 h-5" />
            <span>Proceed to Website</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {scanResult.status !== 'safe' && (
          <button
            className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
            disabled
          >
            Access Blocked
          </button>
        )}
      </div>

      {scanResult.status !== 'safe' && (
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <h4 className="font-bold text-red-900 mb-2">🚨 Do Not Proceed</h4>
          <p className="text-red-800 text-sm">
            This link appears to be malicious. Link Guard has blocked access to protect you. If you believe this is a false positive, contact support.
          </p>
        </div>
      )}
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Proxy Protection Active</h1>
            <p className="text-blue-700">All your links are being intercepted and scanned for threats</p>
          </div>
          <Shield className="w-12 h-12 text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">🔄 How Link Guard Proxy Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: 1, title: 'User Clicks Link', icon: '👆' },
            { step: 2, title: 'Link Intercepted', icon: '🛑' },
            { step: 3, title: 'Security Scan', icon: '🔍' },
            { step: 4, title: 'Route to Website', icon: '✅' },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-2 mx-auto">
                <span className="text-xl font-bold text-blue-600">{item.step}</span>
              </div>
              <p className="text-center text-sm font-semibold text-gray-900">{item.title}</p>
              <p className="text-center text-2xl">{item.icon}</p>
              {i < 3 && <div className="text-center text-xl text-blue-400 mt-2">→</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Safe Links Routed', value: '2,847', icon: CheckCircle, color: 'green' },
          { title: 'Threats Blocked', value: '156', icon: AlertTriangle, color: 'red' },
          { title: 'Protection Score', value: '99.2%', icon: Lock, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Test the Proxy Interception</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { url: 'https://amazon-account-verify.click', type: 'suspicious' },
            { url: 'https://github.com', type: 'safe' },
            { url: 'https://paypal-confirm-login.xyz', type: 'dangerous' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => simulateInterception(item.url)}
              className={`p-4 rounded-lg text-left transition border-2 ${
                item.type === 'safe' 
                  ? 'border-green-200 bg-green-50 hover:bg-green-100'
                  : item.type === 'dangerous'
                  ? 'border-red-200 bg-red-50 hover:bg-red-100'
                  : 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100'
              }`}
            >
              <p className="text-xs font-semibold text-gray-600 mb-1">Test: {item.type.toUpperCase()}</p>
              <p className="text-sm font-mono break-all">{item.url}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Intercepted Links</h3>
        <div className="space-y-3">
          {[
            { url: 'amazon-secure-verify.click', status: 'blocked', time: '5 min ago' },
            { url: 'linkedin.com', status: 'routed', time: '2 hours ago' },
            { url: 'paypal-confirm-account.xyz', status: 'blocked', time: '1 day ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <Link2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.url}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                item.status === 'routed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {item.status === 'routed' ? '✓ Routed' : '🚫 Blocked'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ScanPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Link Scanner & Proxy</h1>
        <p className="text-gray-600">Manually scan links or test the proxy interception system</p>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Scan a Link Through Proxy</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="https://example.com"
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            onClick={handleScanUrl}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-xl font-bold text-lg transition flex items-center justify-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>Scan Through Proxy</span>
          </button>
        </div>

        {scanProgress > 0 && scanProgress < 100 && <InterceptionFlow />}
        {scanResult && scanProgress === 100 && <ScanResultView />}
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h4 className="font-bold text-blue-900 mb-3">🛡️ Proxy Shield Benefits</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>✅ All clicks intercepted and scanned automatically</li>
          <li>✅ Real-time malware and phishing detection</li>
          <li>✅ SSL certificate validation before routing</li>
          <li>✅ Blocks access to dangerous sites immediately</li>
          <li>✅ Complete audit trail of all intercepted links</li>
        </ul>
      </div>
    </div>
  );

  const HistoryPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interception History</h1>
        <p className="text-gray-600">Complete log of all intercepted links and their scan results</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">URL</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { url: 'amazon-verify-account.click', status: 'dangerous', action: 'blocked', date: 'Oct 11, 2025' },
                { url: 'github.com', status: 'safe', action: 'routed', date: 'Oct 11, 2025' },
                { url: 'confirm-paypal-identity.xyz', status: 'suspicious', action: 'blocked', date: 'Oct 10, 2025' },
                { url: 'google.com', status: 'safe', action: 'routed', date: 'Oct 10, 2025' },
                { url: 'bank-login-verify.net', status: 'dangerous', action: 'blocked', date: 'Oct 9, 2025' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.url}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'safe' ? 'bg-green-100 text-green-700' :
                      item.status === 'suspicious' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.action === 'routed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Customize your proxy and security preferences</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Proxy Settings</h3>
          <div className="space-y-3">
            {[
              { label: 'Enable Automatic Interception', enabled: true },
              { label: 'Block All Suspicious Links', enabled: true },
              { label: 'Real-time Threat Notifications', enabled: true },
              { label: 'Browser Extension Active', enabled: true },
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-700">{setting.label}</label>
                <div className={`relative w-12 h-6 rounded-full transition cursor-pointer ${setting.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${setting.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Security Level</h3>
          <div className="space-y-3">
            {['Low', 'Medium', 'High', 'Maximum'].map((level, i) => (
              <div key={i} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <input type="radio" name="security" checked={i === 2} className="w-4 h-4" readOnly />
                <div>
                  <p className="font-semibold text-gray-900">{level}</p>
                  <p className="text-xs text-gray-600">
                    {i === 0 && 'Basic protection, fewer false positives'}
                    {i === 1 && 'Balanced protection and performance'}
                    {i === 2 && 'Strong protection with minimal impact'}
                    {i === 3 && 'Maximum security, may block more sites'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Account</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition">
              <p className="font-semibold text-gray-900">Export History</p>
              <p className="text-xs text-gray-600">Download all intercepted links and scan results</p>
            </button>
            <button className="w-full p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition">
              <p className="font-semibold text-gray-900">Clear History</p>
              <p className="text-xs text-gray-600">Remove all stored scan history</p>
            </button>
            <button className="w-full p-4 bg-red-50 rounded-lg text-left hover:bg-red-100 transition">
              <p className="font-semibold text-red-900">Delete Account</p>
              <p className="text-xs text-red-600">Permanently delete your account and all data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'scan' && <ScanPage />}
        {currentPage === 'history' && <HistoryPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </div>
    </div>
  );
}