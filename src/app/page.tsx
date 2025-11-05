'use client';

import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, X, Plus, Minus, UtensilsCrossed, Beer, Coffee, Cake, Settings, Languages, Monitor, Bell, CheckCircle, Clock, ChefHat } from 'lucide-react';

const SmartMenu = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState('en');
  const [viewMode, setViewMode] = useState('customer'); // 'customer' or 'staff'
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState(0);
  
  // Customizable Settings
  const [config, setConfig] = useState({
    shopName: 'Tasty Bites',
    shopTagline: 'Food & Pub Restaurant',
    shopType: 'restaurant',
    logoUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop',
    primaryColor: 'orange',
    serviceFee: 2.00
  });

  // Translations
  const translations = {
    en: {
      search: 'Search menu...',
      cart: 'Cart',
      settings: 'Settings',
      yourOrder: 'Your Order',
      emptyCart: 'Your cart is empty',
      items: 'Items',
      serviceFee: 'Service Fee',
      total: 'Total',
      placeOrder: 'Place Order',
      add: 'Add',
      saveSettings: 'Save Settings',
      shopName: 'Shop Name',
      tagline: 'Tagline',
      logoUrl: 'Logo URL',
      shopType: 'Shop Type',
      themeColor: 'Theme Color',
      restaurant: 'Restaurant',
      pub: 'Pub',
      cafe: 'Cafe',
      fastFood: 'Fast Food',
      language: 'Language',
      categories: {
        all: 'All',
        food: 'Food',
        drinks: 'Drinks',
        desserts: 'Desserts'
      },
      noItems: 'No items found',
      // Staff screen
      staffView: 'Staff View',
      customerView: 'Customer View',
      orderReceived: 'Order Received',
      newOrders: 'New Orders',
      preparing: 'Preparing',
      ready: 'Ready',
      completed: 'Completed',
      table: 'Table',
      orderId: 'Order',
      time: 'Time',
      acceptOrder: 'Accept',
      markReady: 'Mark Ready',
      complete: 'Complete',
      noOrders: 'No orders yet',
      qty: 'Qty',
      orderPlaced: 'Order placed successfully!',
      tableNumber: 'Table Number'
    },
    km: {
      search: 'ស្វែងរកម្ហូប...',
      cart: 'កន្ត្រក',
      settings: 'ការកំណត់',
      yourOrder: 'ការបញ្ជាទិញរបស់អ្នក',
      emptyCart: 'កន្ត្រករបស់អ្នកទទេ',
      items: 'ផលិតផល',
      serviceFee: 'ថ្លៃសេវា',
      total: 'សរុប',
      placeOrder: 'បញ្ជាទិញ',
      add: 'បន្ថែម',
      saveSettings: 'រក្សាទុក',
      shopName: 'ឈ្មោះហាង',
      tagline: 'ពាក្យស្លោក',
      logoUrl: 'URL រូបភាព',
      shopType: 'ប្រភេទហាង',
      themeColor: 'ពណ៌ធាតុ',
      restaurant: 'ភោជនីយដ្ឋាន',
      pub: 'បាបឺ',
      cafe: 'កាហ្វេ',
      fastFood: 'អាហាររហ័ស',
      language: 'ភាសា',
      categories: {
        all: 'ទាំងអស់',
        food: 'អាហារ',
        drinks: 'ភេសជ្ជៈ',
        desserts: 'បង្អែម'
      },
      noItems: 'រកមិនឃើញ',
      // Staff screen
      staffView: 'អេក្រង់បុគ្គលិក',
      customerView: 'អេក្រង់អតិថិជន',
      orderReceived: 'បានទទួលការបញ្ជាទិញ',
      newOrders: 'ការបញ្ជាទិញថ្មី',
      preparing: 'កំពុងរៀបចំ',
      ready: 'រួចរាល់',
      completed: 'បានបញ្ចប់',
      table: 'តុ',
      orderId: 'លេខបញ្ជាទិញ',
      time: 'ពេលវេលា',
      acceptOrder: 'ទទួលយក',
      markReady: 'បានរួចរាល់',
      complete: 'បញ្ចប់',
      noOrders: 'មិនទាន់មានការបញ្ជាទិញ',
      qty: 'ចំនួន',
      orderPlaced: 'បញ្ជាទិញបានដាក់ដោយជោគជ័យ!',
      tableNumber: 'លេខតុ'
    }
  };

  const t = translations[language];

  const menuItems = [
    { 
      id: 1, 
      name: { en: 'Classic Burger', km: 'ប័រហ្គឺរបុរាណ' },
      category: 'Food', 
      price: 8.99, 
      image: '🍔', 
      description: { en: 'Beef patty with cheese, lettuce, tomato', km: 'សាច់គោជាមួយឈីស សាលាដ និងប៉េងប៉ោះ' }
    },
    { 
      id: 2, 
      name: { en: 'Margherita Pizza', km: 'ព៊ីហ្សា ម៉ាហ្គារីតា' },
      category: 'Food', 
      price: 12.99, 
      image: '🍕', 
      description: { en: 'Fresh mozzarella, basil, tomato sauce', km: 'ឈីសម៉ូហ្សារ៉ែឡា ស្លឹកបាស៊ីលីក និងទឹកប៉េងប៉ោះ' }
    },
    { 
      id: 3, 
      name: { en: 'Caesar Salad', km: 'សាឡាត់ ស៊ីហ្សា' },
      category: 'Food', 
      price: 7.99, 
      image: '🥗', 
      description: { en: 'Romaine lettuce, parmesan, croutons', km: 'សាលាដរ៉ូម៉ាំងជាមួយឈីសនិងនំប័ង' }
    },
    { 
      id: 4, 
      name: { en: 'Fish & Chips', km: 'ត្រីចៀន និងដំឡូងចៀន' },
      category: 'Food', 
      price: 14.99, 
      image: '🐟', 
      description: { en: 'Crispy battered fish with fries', km: 'ត្រីចៀនកោរជាមួយដំឡូងចៀន' }
    },
    { 
      id: 5, 
      name: { en: 'BBQ Ribs', km: 'ជំនីចង្កា បាបេគ្យូ' },
      category: 'Food', 
      price: 16.99, 
      image: '🍖', 
      description: { en: 'Slow-cooked ribs with BBQ sauce', km: 'ជំនីចង្កាអាំងជាមួយទឹកជ្រលក់បាបេគ្យូ' }
    },
    { 
      id: 6, 
      name: { en: 'Chicken Wings', km: 'ស្លាបមាន់ចៀន' },
      category: 'Food', 
      price: 9.99, 
      image: '🍗', 
      description: { en: '8 wings with choice of sauce', km: 'ស្លាបមាន់ចៀន ៨ ជាមួយទឹកជ្រលក់' }
    },
    { 
      id: 7, 
      name: { en: 'Pasta Carbonara', km: 'ប៉ាស្តាកាបូណារ៉ា' },
      category: 'Food', 
      price: 11.99, 
      image: '🍝', 
      description: { en: 'Creamy pasta with bacon', km: 'ប៉ាស្តាក្រែមជាមួយសាច់ជ្រូក' }
    },
    { 
      id: 8, 
      name: { en: 'Steak', km: 'ស្ទិក' },
      category: 'Food', 
      price: 22.99, 
      image: '🥩', 
      description: { en: 'Grilled ribeye steak', km: 'សាច់គោអាំង' }
    },
    { 
      id: 9, 
      name: { en: 'Draft Beer', km: 'ស្រាបៀរស្រស់' },
      category: 'Drinks', 
      price: 5.99, 
      image: '🍺', 
      description: { en: 'Local craft beer on tap', km: 'ស្រាបៀរក្នុងស្រុក' }
    },
    { 
      id: 10, 
      name: { en: 'House Wine', km: 'ស្រាវ៉ាំង' },
      category: 'Drinks', 
      price: 7.99, 
      image: '🍷', 
      description: { en: 'Red or white wine', km: 'ស្រាវ៉ាំងក្រហម ឬស' }
    },
    { 
      id: 11, 
      name: { en: 'Mojito', km: 'ម៉ូជីតូ' },
      category: 'Drinks', 
      price: 8.99, 
      image: '🍹', 
      description: { en: 'Rum, mint, lime, soda', km: 'រ៉ូម ស្លឹកគ្រឿងស្អុយ ក្រូចឆ្មារ និងសូដា' }
    },
    { 
      id: 12, 
      name: { en: 'Soft Drink', km: 'ភេសជ្ជៈ' },
      category: 'Drinks', 
      price: 2.99, 
      image: '🥤', 
      description: { en: 'Cola, Sprite, or Fanta', km: 'កូឡា ស្ព្រាយ ឬហ្វេនតា' }
    },
    { 
      id: 13, 
      name: { en: 'Iced Coffee', km: 'កាហ្វេត្រជាក់' },
      category: 'Drinks', 
      price: 4.99, 
      image: '☕', 
      description: { en: 'Cold brew with milk', km: 'កាហ្វេត្រជាក់ជាមួយទឹកដោះគោ' }
    },
    { 
      id: 14, 
      name: { en: 'Margarita', km: 'ម៉ាហ្គារីតា' },
      category: 'Drinks', 
      price: 9.99, 
      image: '🍸', 
      description: { en: 'Classic tequila cocktail', km: 'ស្រាក្រឡុកតេគីឡា' }
    },
    { 
      id: 15, 
      name: { en: 'Chocolate Cake', km: 'នំកាកាវ' },
      category: 'Desserts', 
      price: 6.99, 
      image: '🍰', 
      description: { en: 'Rich chocolate layer cake', km: 'នំស្រទាប់កាកាវ' }
    },
    { 
      id: 16, 
      name: { en: 'Ice Cream', km: 'ការ៉េម' },
      category: 'Desserts', 
      price: 4.99, 
      image: '🍨', 
      description: { en: 'Vanilla, chocolate, or strawberry', km: 'វ៉ានីឡា កាកាវ ឬស្ត្របឺរី' }
    },
    { 
      id: 17, 
      name: { en: 'Cheesecake', km: 'នំឈីស' },
      category: 'Desserts', 
      price: 7.99, 
      image: '🧁', 
      description: { en: 'New York style cheesecake', km: 'នំឈីសបែបញូវយ៉ក' }
    },
    { 
      id: 18, 
      name: { en: 'Tiramisu', km: 'ទីរ៉ាមីស៊ូ' },
      category: 'Desserts', 
      price: 8.99, 
      image: '🍮', 
      description: { en: 'Italian coffee dessert', km: 'បង្អែមកាហ្វេអ៊ីតាលី' }
    },
  ];

  const categories = [
    { key: 'All', label: t.categories.all },
    { key: 'Food', label: t.categories.food },
    { key: 'Drinks', label: t.categories.drinks },
    { key: 'Desserts', label: t.categories.desserts }
  ];

  const themeColors = {
    orange: {
      gradient: 'from-orange-600 to-red-600',
      bg: 'from-orange-50 to-red-50',
      button: 'from-orange-600 to-red-600',
      buttonHover: 'from-orange-700 to-red-700',
      text: 'text-orange-600',
      bgLight: 'bg-orange-100',
      bgMedium: 'bg-orange-500',
      textLight: 'text-orange-100'
    },
    blue: {
      gradient: 'from-blue-600 to-indigo-600',
      bg: 'from-blue-50 to-indigo-50',
      button: 'from-blue-600 to-indigo-600',
      buttonHover: 'from-blue-700 to-indigo-700',
      text: 'text-blue-600',
      bgLight: 'bg-blue-100',
      bgMedium: 'bg-blue-500',
      textLight: 'text-blue-100'
    },
    green: {
      gradient: 'from-green-600 to-emerald-600',
      bg: 'from-green-50 to-emerald-50',
      button: 'from-green-600 to-emerald-600',
      buttonHover: 'from-green-700 to-emerald-700',
      text: 'text-green-600',
      bgLight: 'bg-green-100',
      bgMedium: 'bg-green-500',
      textLight: 'text-green-100'
    },
    purple: {
      gradient: 'from-purple-600 to-pink-600',
      bg: 'from-purple-50 to-pink-50',
      button: 'from-purple-600 to-pink-600',
      buttonHover: 'from-purple-700 to-pink-700',
      text: 'text-purple-600',
      bgLight: 'bg-purple-100',
      bgMedium: 'bg-purple-500',
      textLight: 'text-purple-100'
    },
    red: {
      gradient: 'from-red-600 to-rose-600',
      bg: 'from-red-50 to-rose-50',
      button: 'from-red-600 to-rose-600',
      buttonHover: 'from-red-700 to-rose-700',
      text: 'text-red-600',
      bgLight: 'bg-red-100',
      bgMedium: 'bg-red-500',
      textLight: 'text-red-100'
    }
  };

  const theme = themeColors[config.primaryColor];

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description[language].toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, language]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const placeOrder = (tableNumber) => {
    if (cart.length === 0) return;
    
    const newOrder = {
      id: Date.now(),
      tableNumber: tableNumber,
      items: [...cart],
      total: totalPrice + config.serviceFee,
      status: 'new', // new, preparing, ready, completed
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setNotifications(prev => prev + 1);
    setCart([]);
    setShowCart(false);
    
    // Show success message
    alert(t.orderPlaced);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (newStatus === 'preparing') {
      setNotifications(prev => Math.max(0, prev - 1));
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Food': return <UtensilsCrossed className="w-4 h-4" />;
      case 'Drinks': return <Beer className="w-4 h-4" />;
      case 'Desserts': return <Cake className="w-4 h-4" />;
      default: return <Coffee className="w-4 h-4" />;
    }
  };

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  // Customer View
  if (viewMode === 'customer') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.bg} pb-24`}>
        <div className={`bg-gradient-to-r ${theme.gradient} text-white shadow-lg sticky top-0 z-40`}>
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img 
                  src={config.logoUrl} 
                  alt="Logo" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-12 h-12 rounded-full bg-white/20 items-center justify-center hidden">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                
                <div>
                  <h1 className="text-xl font-bold">{config.shopName}</h1>
                  <p className={`text-xs ${theme.textLight}`}>{config.shopTagline}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('staff')}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
                  title={t.staffView}
                >
                  <Monitor className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLanguage(language === 'en' ? 'km' : 'en')}
                  className="bg-white/20 hover:bg-white/30 rounded-full px-3 py-2 transition-all flex items-center gap-1 text-sm font-semibold"
                >
                  <Languages className="w-4 h-4" />
                  {language === 'en' ? 'ខ្មែរ' : 'EN'}
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowCart(true)}
                  className={`relative bg-white ${theme.text} px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg text-gray-800 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 text-sm ${
                  selectedCategory === category.key
                    ? 'bg-white ' + theme.text + ' shadow-md'
                    : 'bg-white/20 text-white'
                }`}
              >
                {category.key !== 'All' && getCategoryIcon(category.key)}
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-3 py-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden">
                <div className={`bg-gradient-to-br ${theme.bgLight} to-white p-6 flex items-center justify-center`}>
                  <span className="text-5xl">{item.image}</span>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-1">{item.name[language]}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description[language]}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${theme.text} font-bold text-lg`}>${item.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className={`w-full bg-gradient-to-r ${theme.button} text-white py-2 rounded-lg font-semibold text-sm hover:${theme.buttonHover} transition-all flex items-center justify-center gap-1 shadow-md`}
                  >
                    <Plus className="w-4 h-4" />
                    {t.add}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">{t.noItems}</p>
            </div>
          )}
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowSettings(false)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col">
              <div className={`bg-gradient-to-r ${theme.gradient} text-white p-4 flex items-center justify-between`}>
                <h2 className="text-xl font-bold">{t.settings}</h2>
                <button onClick={() => setShowSettings(false)} className="hover:bg-white/20 rounded-full p-2 transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.language}</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="km">ភាសាខ្មែរ (Khmer)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.shopName}</label>
                  <input
                    type="text"
                    value={config.shopName}
                    onChange={(e) => handleConfigChange('shopName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.tagline}</label>
                  <input
                    type="text"
                    value={config.shopTagline}
                    onChange={(e) => handleConfigChange('shopTagline', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.logoUrl}</label>
                  <input
                    type="text"
                    value={config.logoUrl}
                    onChange={(e) => handleConfigChange('logoUrl', e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter direct image URL</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.shopType}</label>
                  <select
                    value={config.shopType}
                    onChange={(e) => handleConfigChange('shopType', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="restaurant">{t.restaurant}</option>
                    <option value="pub">{t.pub}</option>
                    <option value="cafe">{t.cafe}</option>
                    <option value="fastfood">{t.fastFood}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.themeColor}</label>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.keys(themeColors).map(color => (
                      <button
                        key={color}
                        onClick={() => handleConfigChange('primaryColor', color)}
                        className={`h-12 rounded-lg bg-gradient-to-r ${themeColors[color].gradient} ${
                          config.primaryColor === color ? 'ring-4 ring-offset-2 ring-blue-500' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.serviceFee} ($)</label>
                  <input
                    type="number"
                    step="0.50"
                    value={config.serviceFee}
                    onChange={(e) => handleConfigChange('serviceFee', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="border-t p-4 bg-gray-50">
                <button 
                  onClick={() => setShowSettings(false)}
                  className={`w-full bg-gradient-to-r ${theme.button} text-white py-3 rounded-xl font-bold hover:${theme.buttonHover} transition-all shadow-lg`}
                >
                  {t.saveSettings}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col">
              <div className={`bg-gradient-to-r ${theme.gradient} text-white p-4 flex items-center justify-between`}>
                <h2 className="text-xl font-bold">{t.yourOrder}</h2>
                <button onClick={() => setShowCart(false)} className="hover:bg-white/20 rounded-full p-2 transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">{t.emptyCart}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item: any) => (
                      <div key={item.id} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                        <span className="text-3xl">{item.image}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name[language]}</h3>
                          <p className={`${theme.text} font-bold text-sm`}>${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-white rounded-full p-1 hover:bg-gray-100 shadow"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-white rounded-full p-1 hover:bg-gray-100 shadow"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-1 text-red-500 hover:bg-red-50 rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4 bg-gray-50">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.tableNumber}</label>
                    <input
                      type="number"
                      id="tableNumber"
                      placeholder="1"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>{t.items} ({totalItems})</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>{t.serviceFee}</span>
                      <span>${config.serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-800">
                      <span>{t.total}</span>
                      <span className={theme.text}>${(totalPrice + config.serviceFee).toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const tableNum = document.getElementById('tableNumber').value || '1';
                      placeOrder(tableNum);
                    }}
                    className={`w-full bg-gradient-to-r ${theme.button} text-white py-3 rounded-xl font-bold hover:${theme.buttonHover} transition-all shadow-lg`}
                  >
                    {t.placeOrder}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Staff View
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg}`}>
      <div className={`bg-gradient-to-r ${theme.gradient} text-white shadow-lg sticky top-0 z-40`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold">{t.staffView}</h1>
                <p className={`text-xs ${theme.textLight}`}>{config.shopName}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'km' : 'en')}
                className="bg-white/20 hover:bg-white/30 rounded-full px-3 py-2 transition-all flex items-center gap-1 text-sm font-semibold"
              >
                <Languages className="w-4 h-4" />
                {language === 'en' ? 'ខ្មែរ' : 'EN'}
              </button>
              <button
                onClick={() => setViewMode('customer')}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
                title={t.customerView}
              >
                <Monitor className="w-5 h-5" />
              </button>
              {notifications > 0 && (
                <div className="relative">
                  <Bell className="w-5 h-5 mt-2" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                    {notifications}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t.noOrders}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* New Orders */}
            {getOrdersByStatus('new').length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Bell className="w-6 h-6 text-red-500" />
                  {t.newOrders} ({getOrdersByStatus('new').length})
                </h2>
                <div className="space-y-3">
                  {getOrdersByStatus('new').map(order => (
                    <div key={order.id} className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{t.table} {order.tableNumber}</h3>
                          <p className="text-sm text-gray-500">{t.orderId} #{order.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{t.time}</p>
                          <p className="font-semibold">{order.time}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3 bg-gray-50 rounded-lg p-3">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{item.image}</span>
                              <span className="font-medium">{item.name[language]}</span>
                            </div>
                            <span className={`font-semibold ${theme.text}`}>x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-lg">{t.total}:</span>
                        <span className={`font-bold text-xl ${theme.text}`}>${order.total.toFixed(2)}</span>
                      </div>
                      
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className={`w-full bg-gradient-to-r ${theme.button} text-white py-3 rounded-lg font-bold hover:${theme.buttonHover} transition-all shadow-md`}
                      >
                        {t.acceptOrder}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preparing Orders */}
            {getOrdersByStatus('preparing').length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-yellow-500" />
                  {t.preparing} ({getOrdersByStatus('preparing').length})
                </h2>
                <div className="space-y-3">
                  {getOrdersByStatus('preparing').map(order => (
                    <div key={order.id} className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-yellow-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{t.table} {order.tableNumber}</h3>
                          <p className="text-sm text-gray-500">{t.orderId} #{order.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{t.time}</p>
                          <p className="font-semibold">{order.time}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3 bg-gray-50 rounded-lg p-3">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{item.image}</span>
                              <span className="font-medium">{item.name[language]}</span>
                            </div>
                            <span className={`font-semibold ${theme.text}`}>x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
                      >
                        {t.markReady}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ready Orders */}
            {getOrdersByStatus('ready').length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  {t.ready} ({getOrdersByStatus('ready').length})
                </h2>
                <div className="space-y-3">
                  {getOrdersByStatus('ready').map(order => (
                    <div key={order.id} className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{t.table} {order.tableNumber}</h3>
                          <p className="text-sm text-gray-500">{t.orderId} #{order.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{t.time}</p>
                          <p className="font-semibold">{order.time}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3 bg-gray-50 rounded-lg p-3">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{item.image}</span>
                              <span className="font-medium">{item.name[language]}</span>
                            </div>
                            <span className={`font-semibold ${theme.text}`}>x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                      >
                        {t.complete}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartMenu;