'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, MapPin, Phone, Users, Package, Flag, Eye, MessageSquare, Download, Upload, Camera, Map, Globe, Lock, User, FileText, Activity, Send } from 'lucide-react';

export default function VerificationDashboard() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationNotes, setVerificationNotes] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentUser, setCurrentUser] = useState({ name: 'John Doe', role: 'Verifier', id: 'U001' });
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [smsMessage, setSmsMessage] = useState('');
  const [showSmsPanel, setShowSmsPanel] = useState(false);

  // Translation system
  const translations = {
    en: {
      title: 'Aid Verification Dashboard',
      subtitle: 'Review and verify emergency assistance requests',
      pending: 'Pending Review',
      approved: 'Approved',
      flagged: 'Flagged',
      rejected: 'Rejected',
      highRisk: 'High Risk',
      approve: 'Approve & Deploy Aid',
      flag: 'Flag for Review',
      reject: 'Reject Request',
      riskAssessment: 'RISK ASSESSMENT',
      verificationStatus: 'Verification Status',
      requestInfo: 'Request Information',
      location: 'Location',
      people: 'People',
      contact: 'Contact',
      needs: 'Needs',
      notes: 'Verification Notes',
      viewMap: 'View on Map',
      sendSms: 'Send SMS Verification',
      photos: 'Verification Photos',
      auditLog: 'Audit Log',
      export: 'Export Report'
    },
    km: {
      title: 'ផ្ទាំងត្រួតពិនិត្យជំនួយ',
      subtitle: 'ពិនិត្យនិងផ្ទៀងផ្ទាត់សំណើជំនួយបន្ទាន់',
      pending: 'រង់ចាំពិនិត្យ',
      approved: 'បានអនុម័ត',
      flagged: 'បានដាក់ទង់',
      rejected: 'បានបដិសេធ',
      highRisk: 'ហានិភ័យខ្ពស់',
      approve: 'អនុម័តនិងផ្ដល់ជំនួយ',
      flag: 'ដាក់ទង់សម្រាប់ពិនិត្យ',
      reject: 'បដិសេធសំណើ',
      riskAssessment: 'ការវាយតម្លៃហានិភ័យ',
      verificationStatus: 'ស្ថានភាពផ្ទៀងផ្ទាត់',
      requestInfo: 'ព័ត៌មានសំណើ',
      location: 'ទីតាំង',
      people: 'មនុស្ស',
      contact: 'ទំនាក់ទំនង',
      needs: 'តម្រូវការ',
      notes: 'កំណត់ចំណាំផ្ទៀងផ្ទាត់',
      viewMap: 'មើលលើផែនទី',
      sendSms: 'ផ្ញើ SMS ផ្ទៀងផ្ទាត់',
      photos: 'រូបថតផ្ទៀងផ្ទាត់',
      auditLog: 'កំណត់ហេតុត្រួតពិនិត្យ',
      export: 'នាំចេញរបាយការណ៍'
    },
    th: {
      title: 'แดชบอร์ดตรวจสอบความช่วยเหลือ',
      subtitle: 'ตรวจสอบและยืนยันคำขอความช่วยเหลือฉุกเฉิน',
      pending: 'รอการตรวจสอบ',
      approved: 'อนุมัติแล้ว',
      flagged: 'ถูกทำเครื่องหมาย',
      rejected: 'ปฏิเสธแล้ว',
      highRisk: 'ความเสี่ยงสูง',
      approve: 'อนุมัติและส่งความช่วยเหลือ',
      flag: 'ทำเครื่องหมายเพื่อตรวจสอบ',
      reject: 'ปฏิเสธคำขอ',
      riskAssessment: 'การประเมินความเสี่ยง',
      verificationStatus: 'สถานะการยืนยัน',
      requestInfo: 'ข้อมูลคำขอ',
      location: 'สถานที่',
      people: 'จำนวนคน',
      contact: 'ติดต่อ',
      needs: 'ความต้องการ',
      notes: 'หมายเหตุการยืนยัน',
      viewMap: 'ดูบนแผนที่',
      sendSms: 'ส่ง SMS ยืนยัน',
      photos: 'ภาพถ่ายยืนยัน',
      auditLog: 'บันทึกการตรวจสอบ',
      export: 'ส่งออกรายงาน'
    }
  };

  const t = translations[language];

  // Mock data with photos
  const [requests, setRequests] = useState([
    {
      id: 'REQ001',
      timestamp: '2025-12-21 14:30',
      location: 'Near Poipet border crossing, 2km south',
      coordinates: { lat: 13.6523, lng: 102.5629 },
      people: 12,
      contact: '+855 12 345 678',
      urgency: 'high',
      needs: ['food', 'water', 'medicine'],
      additionalInfo: 'Group includes 4 children and 1 elderly person. Running low on water.',
      status: 'pending',
      riskScore: 15,
      verificationChecks: {
        phoneVerified: false,
        locationVerified: false,
        duplicateCheck: true,
        historicalData: false,
        contactResponse: false,
        photoVerified: false
      },
      flags: ['First-time requester', 'High urgency'],
      history: [],
      photos: [],
      smsVerificationSent: false,
      smsVerificationCode: null
    },
    {
      id: 'REQ002',
      timestamp: '2025-12-21 13:15',
      location: 'Battambang province, near Highway 5',
      coordinates: { lat: 13.0957, lng: 103.2028 },
      people: 25,
      contact: '+855 98 765 432',
      urgency: 'medium',
      needs: ['food', 'shelter', 'clothing'],
      additionalInfo: 'Stayed overnight in abandoned building. Need supplies for 2-3 days.',
      status: 'pending',
      riskScore: 45,
      verificationChecks: {
        phoneVerified: true,
        locationVerified: true,
        duplicateCheck: true,
        historicalData: true,
        contactResponse: true,
        photoVerified: true
      },
      flags: ['Verified contact', 'Known location'],
      history: ['Previous request REQ-1245 verified and fulfilled'],
      photos: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5WZXJpZmljYXRpb24gUGhvdG88L3RleHQ+PC9zdmc+'],
      smsVerificationSent: true,
      smsVerificationCode: '9234'
    },
    {
      id: 'REQ003',
      timestamp: '2025-12-21 12:00',
      location: 'Border checkpoint near Aranyaprathet',
      coordinates: { lat: 13.6896, lng: 102.5049 },
      people: 8,
      contact: '+855 77 123 456',
      urgency: 'low',
      needs: ['water', 'food'],
      additionalInfo: 'Waiting for official processing. Need basic supplies.',
      status: 'pending',
      riskScore: 75,
      verificationChecks: {
        phoneVerified: true,
        locationVerified: true,
        duplicateCheck: false,
        historicalData: true,
        contactResponse: true,
        photoVerified: false
      },
      flags: ['Duplicate location today', 'Similar contact pattern'],
      history: ['Same location reported 2 hours ago by different contact'],
      photos: [],
      smsVerificationSent: false
    },
    {
      id: 'REQ004',
      timestamp: '2025-12-21 11:30',
      location: 'Siem Reap, near Angkor Wat',
      coordinates: { lat: 13.4125, lng: 103.8670 },
      people: 50,
      contact: '+855 10 999 888',
      urgency: 'high',
      needs: ['food', 'water', 'medicine', 'shelter', 'transport'],
      additionalInfo: 'Large group needs immediate evacuation assistance.',
      status: 'flagged',
      riskScore: 95,
      verificationChecks: {
        phoneVerified: false,
        locationVerified: false,
        duplicateCheck: false,
        historicalData: false,
        contactResponse: false,
        photoVerified: false
      },
      flags: ['SUSPICIOUS: Tourist location', 'Unrealistic group size', 'No response to callback', 'Multiple similar requests'],
      history: [],
      photos: [],
      smsVerificationSent: true,
      smsVerificationCode: null
    }
  ]);

  const [auditLog, setAuditLog] = useState([
    { timestamp: '2025-12-21 14:45', user: 'John Doe', action: 'Approved REQ045', details: 'Verified via phone and photo' },
    { timestamp: '2025-12-21 14:30', user: 'Jane Smith', action: 'Flagged REQ044', details: 'Duplicate location detected' },
    { timestamp: '2025-12-21 14:15', user: 'John Doe', action: 'Rejected REQ043', details: 'No response to verification attempts' },
    { timestamp: '2025-12-21 14:00', user: 'Mike Johnson', action: 'Approved REQ042', details: 'Full verification completed' }
  ]);

  const getRiskColor = (score) => {
    if (score >= 70) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getRiskLabel = (score) => {
    if (score >= 70) return 'HIGH RISK';
    if (score >= 40) return 'MEDIUM RISK';
    return 'LOW RISK';
  };

  const handleStatusChange = (requestId, newStatus, notes) => {
    const request = requests.find(r => r.id === requestId);
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: newStatus,
            verifiedBy: currentUser.name,
            verifiedAt: new Date().toISOString(),
            verificationNotes: notes
          }
        : req
    ));
    
    // Add to audit log
    setAuditLog(prev => [{
      timestamp: new Date().toLocaleString(),
      user: currentUser.name,
      action: `${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)} ${requestId}`,
      details: notes || 'No additional notes'
    }, ...prev]);
    
    setSelectedRequest(null);
    setVerificationNotes('');
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRequests(prev => prev.map(req => 
          req.id === selectedRequest.id
            ? { 
                ...req, 
                photos: [...req.photos, reader.result],
                verificationChecks: { ...req.verificationChecks, photoVerified: true }
              }
            : req
        ));
        setSelectedRequest(prev => ({
          ...prev,
          photos: [...prev.photos, reader.result],
          verificationChecks: { ...prev.verificationChecks, photoVerified: true }
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const sendSmsVerification = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setRequests(prev => prev.map(req => 
      req.id === selectedRequest.id
        ? { 
            ...req, 
            smsVerificationSent: true,
            smsVerificationCode: code
          }
        : req
    ));
    setSelectedRequest(prev => ({
      ...prev,
      smsVerificationSent: true,
      smsVerificationCode: code
    }));
    setSmsMessage(`Verification code sent: ${code}`);
    setTimeout(() => setSmsMessage(''), 3000);
  };

  const exportReport = () => {
    const report = {
      generated: new Date().toISOString(),
      generatedBy: currentUser.name,
      statistics: {
        total: requests.length,
        pending: requests.filter(r => r.status === 'pending').length,
        approved: requests.filter(r => r.status === 'approved').length,
        flagged: requests.filter(r => r.status === 'flagged').length,
        rejected: requests.filter(r => r.status === 'rejected').length,
        highRisk: requests.filter(r => r.riskScore >= 70).length
      },
      requests: requests,
      auditLog: auditLog
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aid-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const filteredRequests = requests.filter(req => {
    const matchesTab = activeTab === 'all' || req.status === activeTab;
    const matchesUrgency = filterUrgency === 'all' || req.urgency === filterUrgency;
    const matchesSearch = searchQuery === '' || 
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.contact.includes(searchQuery);
    return matchesTab && matchesUrgency && matchesSearch;
  });

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    flagged: requests.filter(r => r.status === 'flagged').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    highRisk: requests.filter(r => r.riskScore >= 70).length
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-lg p-3 mr-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center bg-gray-100 rounded-lg p-2">
              <Globe className="w-5 h-5 text-gray-600 mr-2" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none focus:outline-none font-medium text-gray-700"
              >
                <option value="en">English</option>
                <option value="km">ខ្មែរ (Khmer)</option>
                <option value="th">ไทย (Thai)</option>
              </select>
            </div>
            
            {/* User Info */}
            <div className="bg-blue-50 rounded-lg p-3 flex items-center">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{currentUser.name}</div>
                <div className="text-xs text-gray-600">{currentUser.role}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => setShowAuditLog(!showAuditLog)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition flex items-center"
            >
              <Activity className="w-4 h-4 mr-2" />
              {t.auditLog}
            </button>
            <button
              onClick={exportReport}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              {t.export}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-700">{stats.pending}</span>
            </div>
            <div className="text-sm font-medium text-yellow-800">{t.pending}</div>
          </div>
          
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-700">{stats.approved}</span>
            </div>
            <div className="text-sm font-medium text-green-800">{t.approved}</div>
          </div>
          
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Flag className="w-5 h-5 text-red-600" />
              <span className="text-2xl font-bold text-red-700">{stats.flagged}</span>
            </div>
            <div className="text-sm font-medium text-red-800">{t.flagged}</div>
          </div>
          
          <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-5 h-5 text-gray-600" />
              <span className="text-2xl font-bold text-gray-700">{stats.rejected}</span>
            </div>
            <div className="text-sm font-medium text-gray-800">{t.rejected}</div>
          </div>
          
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span className="text-2xl font-bold text-orange-700">{stats.highRisk}</span>
            </div>
            <div className="text-sm font-medium text-orange-800">{t.highRisk}</div>
          </div>
        </div>
      </div>

      {/* Audit Log Modal */}
      {showAuditLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-purple-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-6 h-6 mr-3" />
                <h2 className="text-2xl font-bold">{t.auditLog}</h2>
              </div>
              <button onClick={() => setShowAuditLog(false)} className="hover:bg-purple-700 p-2 rounded">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {auditLog.map((log, idx) => (
                  <div key={idx} className="border-l-4 border-purple-500 bg-gray-50 p-4 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-800">{log.action}</span>
                      <span className="text-sm text-gray-600">{log.timestamp}</span>
                    </div>
                    <div className="text-sm text-gray-700 mb-1">By: {log.user}</div>
                    <div className="text-sm text-gray-600">{log.details}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Request List */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Tabs and Filters */}
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                {['all', 'pending', 'flagged', 'approved', 'rejected'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab === 'all' ? 'All' : t[tab]}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by ID, location, or contact..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterUrgency}
                  onChange={(e) => setFilterUrgency(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Urgency</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Request Cards */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredRequests.map(request => (
                <div
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                    selectedRequest?.id === request.id
                      ? 'border-blue-500 bg-blue-50'
                      : request.riskScore >= 70
                      ? 'border-red-200 hover:border-red-400'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-800">{request.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          request.urgency === 'high' ? 'bg-red-100 text-red-800' :
                          request.urgency === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.urgency.toUpperCase()}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          request.status === 'approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'flagged' ? 'bg-red-100 text-red-800' :
                          request.status === 'rejected' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {request.status.toUpperCase()}
                        </span>
                        {request.photos.length > 0 && (
                          <Camera className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{request.timestamp}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg border-2 font-bold text-sm ${getRiskColor(request.riskScore)}`}>
                      {getRiskLabel(request.riskScore)} ({request.riskScore})
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-1" />
                      {request.location.substring(0, 40)}...
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="w-4 h-4 mr-1" />
                      {request.people} {t.people.toLowerCase()}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-4 h-4 mr-1" />
                      {request.contact}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Package className="w-4 h-4 mr-1" />
                      {request.needs.length} items
                    </div>
                  </div>

                  {request.flags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {request.flags.map((flag, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded text-xs ${
                            flag.includes('SUSPICIOUS') || flag.includes('Unrealistic')
                              ? 'bg-red-100 text-red-700'
                              : flag.includes('Verified') || flag.includes('Known')
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-1">
          {selectedRequest ? (
            <div className="bg-white rounded-xl shadow-lg p-6 max-h-[800px] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">{t.requestInfo}</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Risk Assessment */}
              <div className={`rounded-lg border-2 p-4 mb-6 ${getRiskColor(selectedRequest.riskScore)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold">{t.riskAssessment}</div>
                  <div className="text-2xl font-bold">{selectedRequest.riskScore}%</div>
                </div>
                <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      selectedRequest.riskScore >= 70 ? 'bg-red-600' :
                      selectedRequest.riskScore >= 40 ? 'bg-yellow-600' :
                      'bg-green-600'
                    }`}
                    style={{ width: `${selectedRequest.riskScore}%` }}
                  />
                </div>
              </div>

              {/* Map Button */}
              <button
                onClick={() => setShowMap(!showMap)}
                className="w-full bg-blue-100 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-200 transition flex items-center justify-center mb-4"
              >
                <Map className="w-5 h-5 mr-2" />
                {t.viewMap}
              </button>

              {/* Map Display */}
              {showMap && (
                <div className="mb-6 rounded-lg overflow-hidden border-2 border-gray-300">
                  <iframe
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedRequest.coordinates.lng-0.01},${selectedRequest.coordinates.lat-0.01},${selectedRequest.coordinates.lng+0.01},${selectedRequest.coordinates.lat+0.01}&layer=mapnik&marker=${selectedRequest.coordinates.lat},${selectedRequest.coordinates.lng}`}
                  />
                  <div className="bg-gray-100 p-2 text-xs text-gray-600 text-center">
                    Lat: {selectedRequest.coordinates.lat}, Lng: {selectedRequest.coordinates.lng}
                  </div>
                </div>
              )}

              {/* SMS Verification */}
              <div className="mb-6">
                <button
                  onClick={sendSmsVerification}
                  disabled={selectedRequest.smsVerificationSent}
                  className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center ${
                    selectedRequest.smsVerificationSent
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {selectedRequest.smsVerificationSent ? 'SMS Sent ✓' : t.sendSms}
                </button>
                {smsMessage && (
                  <div className="mt-2 bg-green-50 border border-green-200 text-green-700 p-2 rounded text-sm">
                    {smsMessage}
                  </div>
                )}
                {selectedRequest.smsVerificationSent && selectedRequest.smsVerificationCode && (
                  <div className="mt-2 bg-blue-50 border border-blue-200 p-3 rounded">
                    <div className="text-xs text-blue-600 font-medium mb-1">Verification Code</div>
                    <div className="text-lg font-mono font-bold text-blue-900">{selectedRequest.smsVerificationCode}</div>
                  </div>
                )}
              </div>

              {/* Photo Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Camera className="w-4 h-4 inline mr-1" />
                  {t.photos}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {selectedRequest.photos.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {selectedRequest.photos.map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`Verification ${idx + 1}`}
                        className="w-full h-24 object-cover rounded border-2 border-gray-300"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Verification Checks */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">{t.verificationStatus}</h3>
                <div className="space-y-2">
                  {Object.entries(selectedRequest.verificationChecks).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      {value ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Request Information */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">{t.requestInfo}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-600 font-medium">{t.location}</div>
                    <div className="text-gray-800">{selectedRequest.location}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 font-medium">{t.people}</div>
                    <div className="text-gray-800">{selectedRequest.people} individuals</div>
                  </div>
                  <div>
                    <div className="text-gray-600 font-medium">{t.contact}</div>
                    <div className="text-gray-800">{selectedRequest.contact}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 font-medium">{t.needs}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedRequest.needs.map(need => (
                        <span key={need} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 font-medium">Additional Information</div>
                    <div className="text-gray-800">{selectedRequest.additionalInfo}</div>
                  </div>
                </div>
              </div>

              {/* History */}
              {selectedRequest.history.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">Request History</h3>
                  <div className="space-y-2">
                    {selectedRequest.history.map((item, idx) => (
                      <div key={idx} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification Notes */}
              {selectedRequest.status === 'pending' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.notes}
                  </label>
                  <textarea
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    placeholder="Add notes about your verification decision..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              )}

              {/* Action Buttons */}
              {selectedRequest.status === 'pending' && (
                <div className="space-y-2">
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'approved', verificationNotes)}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {t.approve}
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'flagged', verificationNotes)}
                    className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition flex items-center justify-center"
                  >
                    <Flag className="w-5 h-5 mr-2" />
                    {t.flag}
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'rejected', verificationNotes)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    {t.reject}
                  </button>
                </div>
              )}

              {selectedRequest.status !== 'pending' && (
                <div className={`p-4 rounded-lg ${
                  selectedRequest.status === 'approved' ? 'bg-green-50 text-green-800' :
                  selectedRequest.status === 'rejected' ? 'bg-red-50 text-red-800' :
                  'bg-yellow-50 text-yellow-800'
                }`}>
                  <div className="font-bold mb-1">Status: {selectedRequest.status.toUpperCase()}</div>
                  {selectedRequest.verifiedBy && (
                    <div className="text-sm">Verified by: {selectedRequest.verifiedBy}</div>
                  )}
                  {selectedRequest.verificationNotes && (
                    <div className="text-sm mt-2">Notes: {selectedRequest.verificationNotes}</div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center h-96">
              <div className="text-center text-gray-500">
                <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <div className="font-medium">Select a request to view details</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Alert */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mt-6">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-bold text-red-800 mb-1">Security Protocol</div>
            <div className="text-sm text-red-700">
              <strong>Verification Requirements:</strong> (1) Callback confirmation, (2) GPS location verification, 
              (3) Photo documentation when possible, (4) Cross-reference with historical data, (5) Check for duplicate patterns.
              <br/><strong>Red Flags:</strong> Tourist areas, unrealistic numbers, no callback response, multiple similar requests, 
              inconsistent information, requests from known conflict-free zones.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}