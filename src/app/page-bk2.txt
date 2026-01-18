'use client';

import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, Statistic, Row, Col, Tag, Space, Tabs, Descriptions, Typography, message } from 'antd';
import { DollarOutlined, UserOutlined, FileTextOutlined, BarChartOutlined, PlusOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [isLoanModalVisible, setIsLoanModalVisible] = useState(false);
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedArea, setSelectedArea] = useState('all');
  const [form] = Form.useForm();
  const [customerForm] = Form.useForm();
  const [paymentForm] = Form.useForm();

  // Sample data
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Sok Dara', phone: '012345678', idCard: '123456789', address: 'Phnom Penh', occupation: 'Business Owner', area: 'Phnom Penh' },
    { id: 2, name: 'Chan Srey', phone: '098765432', idCard: '987654321', address: 'Siem Reap', occupation: 'Teacher', area: 'Siem Reap' },
  ]);

  const loanAreas = [
    'Phnom Penh',
    'Siem Reap',
    'Battambang',
    'Sihanoukville',
    'Kampong Cham',
    'Kampong Speu',
    'Kandal',
    'Prey Veng',
    'Takeo',
    'Kampot',
    'Pursat',
    'Banteay Meanchey',
    'Svay Rieng',
    'Kampong Thom',
    'Kampong Chhnang',
    'Koh Kong',
    'Kratie',
    'Preah Vihear',
    'Oddar Meanchey',
    'Pailin',
    'Ratanakiri',
    'Mondulkiri',
    'Stung Treng',
    'Kep',
    'Preah Sihanouk'
  ];

  const [loans, setLoans] = useState([
    {
      id: 1,
      customerId: 1,
      customerName: 'Sok Dara',
      principal: 10000,
      interestRate: 2.5,
      interestType: 'flat',
      term: 12,
      disbursementDate: '2024-01-15',
      status: 'active',
      remainingBalance: 7500,
      paidAmount: 2500,
      nextPaymentDate: '2024-12-15',
      monthlyPayment: 1042,
      area: 'Phnom Penh'
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'Chan Srey',
      principal: 5000,
      interestRate: 3,
      interestType: 'flat',
      term: 6,
      disbursementDate: '2024-06-01',
      status: 'active',
      remainingBalance: 3500,
      paidAmount: 1500,
      nextPaymentDate: '2024-12-01',
      monthlyPayment: 1083,
      area: 'Siem Reap'
    },
  ]);

  const [payments, setPayments] = useState([
    { id: 1, loanId: 1, amount: 1042, date: '2024-11-15', type: 'monthly', status: 'completed' },
    { id: 2, loanId: 1, amount: 1042, date: '2024-10-15', type: 'monthly', status: 'completed' },
    { id: 3, loanId: 2, amount: 1083, date: '2024-11-01', type: 'monthly', status: 'completed' },
  ]);

  // Calculate loan statistics
  const filteredLoans = selectedArea === 'all' ? loans : loans.filter(l => l.area === selectedArea);
  
  const calculateInterest = (principal, rate, term, type) => {
    if (type === 'flat') {
      return (principal * rate * term) / 100;
    } else if (type === 'reducing') {
      // Simplified reducing balance calculation
      return (principal * rate * term) / 200;
    }
    return 0;
  };

  const calculateMonthlyPayment = (principal, rate, term, type) => {
    const interest = calculateInterest(principal, rate, term, type);
    return (principal + interest) / term;
  };

  const generateRepaymentSchedule = (loan) => {
    const schedule = [];
    const monthlyPayment = calculateMonthlyPayment(loan.principal, loan.interestRate, loan.term, loan.interestType);
    const totalInterest = calculateInterest(loan.principal, loan.interestRate, loan.term, loan.interestType);
    const monthlyInterest = totalInterest / loan.term;
    const monthlyPrincipal = loan.principal / loan.term;

    for (let i = 1; i <= loan.term; i++) {
      const paymentDate = new Date(loan.disbursementDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);
      
      schedule.push({
        month: i,
        paymentDate: paymentDate.toISOString().split('T')[0],
        principal: monthlyPrincipal,
        interest: monthlyInterest,
        totalPayment: monthlyPayment,
        balance: loan.principal - (monthlyPrincipal * i),
        status: i <= (loan.paidAmount / monthlyPayment) ? 'paid' : 'pending'
      });
    }
    return schedule;
  };

  const stats = {
    totalLoans: filteredLoans.length,
    activeLoans: filteredLoans.filter(l => l.status === 'active').length,
    totalDisbursed: filteredLoans.reduce((sum, l) => sum + l.principal, 0),
    totalCollected: payments.filter(p => {
      const loan = filteredLoans.find(l => l.id === p.loanId);
      return loan !== undefined;
    }).reduce((sum, p) => sum + p.amount, 0),
    totalOutstanding: filteredLoans.reduce((sum, l) => sum + l.remainingBalance, 0),
  };

  const areaStats = loanAreas.map(area => {
    const areaLoans = loans.filter(l => l.area === area);
    return {
      area,
      totalLoans: areaLoans.length,
      activeLoans: areaLoans.filter(l => l.status === 'active').length,
      totalDisbursed: areaLoans.reduce((sum, l) => sum + l.principal, 0),
      totalOutstanding: areaLoans.reduce((sum, l) => sum + l.remainingBalance, 0),
    };
  }).filter(stat => stat.totalLoans > 0).sort((a, b) => b.totalDisbursed - a.totalDisbursed);

  const handleAddLoan = (values) => {
    const customer = customers.find(c => c.id === values.customerId);
    const monthlyPayment = calculateMonthlyPayment(
      values.principal,
      values.interestRate,
      values.term,
      values.interestType
    );

    const disbursementDate = values.disbursementDate.format('YYYY-MM-DD');
    const nextPaymentDate = values.disbursementDate.add(1, 'month').format('YYYY-MM-DD');

    const newLoan = {
      id: loans.length + 1,
      customerId: values.customerId,
      customerName: customer.name,
      principal: values.principal,
      interestRate: values.interestRate,
      interestType: values.interestType,
      term: values.term,
      disbursementDate: disbursementDate,
      status: 'active',
      remainingBalance: values.principal + calculateInterest(values.principal, values.interestRate, values.term, values.interestType),
      paidAmount: 0,
      nextPaymentDate: nextPaymentDate,
      monthlyPayment: monthlyPayment,
      area: customer.area
    };

    setLoans([...loans, newLoan]);
    message.success('Loan created successfully!');
    setIsLoanModalVisible(false);
    form.resetFields();
  };

  const handleAddCustomer = (values) => {
    const newCustomer = {
      id: customers.length + 1,
      ...values
    };
    setCustomers([...customers, newCustomer]);
    message.success('Customer added successfully!');
    setIsCustomerModalVisible(false);
    customerForm.resetFields();
  };

  const handlePayment = (values) => {
    const loan = loans.find(l => l.id === selectedLoan.id);
    const newPayment = {
      id: payments.length + 1,
      loanId: selectedLoan.id,
      amount: values.amount,
      date: values.date.format('YYYY-MM-DD'),
      type: values.type,
      status: 'completed'
    };

    setPayments([...payments, newPayment]);

    // Update loan
    const updatedLoans = loans.map(l => {
      if (l.id === selectedLoan.id) {
        return {
          ...l,
          paidAmount: l.paidAmount + values.amount,
          remainingBalance: l.remainingBalance - values.amount,
          status: (l.remainingBalance - values.amount) <= 0 ? 'completed' : 'active'
        };
      }
      return l;
    });

    setLoans(updatedLoans);
    message.success('Payment recorded successfully!');
    setIsPaymentModalVisible(false);
    paymentForm.resetFields();
  };

  const generateAndDownloadSchedule = (loan) => {
    const schedule = generateRepaymentSchedule(loan);
    const customer = customers.find(c => c.id === loan.customerId);
    const totalInterest = calculateInterest(loan.principal, loan.interestRate, loan.term, loan.interestType);
    const totalRepayment = loan.principal + totalInterest;

    // Create CSV content
    let csvContent = "Repayment Schedule\n\n";
    csvContent += `Loan ID:,${loan.id}\n`;
    csvContent += `Customer:,${customer.name}\n`;
    csvContent += `Phone:,${customer.phone}\n`;
    csvContent += `Principal Amount:,${loan.principal.toLocaleString()}\n`;
    csvContent += `Interest Rate:,${loan.interestRate}% (${loan.interestType})\n`;
    csvContent += `Loan Term:,${loan.term} months\n`;
    csvContent += `Monthly Payment:,${loan.monthlyPayment.toFixed(2)}\n`;
    csvContent += `Total Interest:,${totalInterest.toFixed(2)}\n`;
    csvContent += `Total Repayment:,${totalRepayment.toFixed(2)}\n`;
    csvContent += `Disbursement Date:,${loan.disbursementDate}\n\n`;
    
    csvContent += "Month,Payment Date,Principal,Interest,Total Payment,Balance,Status\n";
    
    schedule.forEach(row => {
      csvContent += `${row.month},${row.paymentDate},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.totalPayment.toFixed(2)},${row.balance.toFixed(2)},${row.status}\n`;
    });

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `repayment_schedule_loan_${loan.id}_${customer.name.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    message.success('Repayment schedule downloaded!');
  };

  const printSchedule = (loan) => {
    const schedule = generateRepaymentSchedule(loan);
    const customer = customers.find(c => c.id === loan.customerId);
    const totalInterest = calculateInterest(loan.principal, loan.interestRate, loan.term, loan.interestType);
    const totalRepayment = loan.principal + totalInterest;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Repayment Schedule - Loan #${loan.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #1890ff; }
            h2 { color: #333; border-bottom: 2px solid #1890ff; padding-bottom: 5px; }
            .info-section { margin: 20px 0; }
            .info-row { display: flex; margin: 5px 0; }
            .info-label { font-weight: bold; width: 200px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #1890ff; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .paid { background-color: #d4edda; }
            .pending { background-color: #fff3cd; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>🏦 Loan Repayment Schedule</h1>
          
          <div class="info-section">
            <h2>Loan Information</h2>
            <div class="info-row"><span class="info-label">Loan ID:</span><span>#${loan.id}</span></div>
            <div class="info-row"><span class="info-label">Customer Name:</span><span>${customer.name}</span></div>
            <div class="info-row"><span class="info-label">Phone:</span><span>${customer.phone}</span></div>
            <div class="info-row"><span class="info-label">ID Card:</span><span>${customer.idCard}</span></div>
            <div class="info-row"><span class="info-label">Address:</span><span>${customer.address}</span></div>
            <div class="info-row"><span class="info-label">Loan Area:</span><span>${loan.area}</span></div>
          </div>

          <div class="info-section">
            <h2>Loan Details</h2>
            <div class="info-row"><span class="info-label">Principal Amount:</span><span>${loan.principal.toLocaleString()}</span></div>
            <div class="info-row"><span class="info-label">Interest Rate:</span><span>${loan.interestRate}% (${loan.interestType})</span></div>
            <div class="info-row"><span class="info-label">Loan Term:</span><span>${loan.term} months</span></div>
            <div class="info-row"><span class="info-label">Monthly Payment:</span><span>${loan.monthlyPayment.toFixed(2)}</span></div>
            <div class="info-row"><span class="info-label">Total Interest:</span><span>${totalInterest.toFixed(2)}</span></div>
            <div class="info-row"><span class="info-label">Total Repayment:</span><span>${totalRepayment.toFixed(2)}</span></div>
            <div class="info-row"><span class="info-label">Disbursement Date:</span><span>${loan.disbursementDate}</span></div>
          </div>

          <h2>Payment Schedule</h2>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Payment Date</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Total Payment</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${schedule.map(row => `
                <tr class="${row.status}">
                  <td>${row.month}</td>
                  <td>${row.paymentDate}</td>
                  <td>${row.principal.toFixed(2)}</td>
                  <td>${row.interest.toFixed(2)}</td>
                  <td>${row.totalPayment.toFixed(2)}</td>
                  <td>${row.balance.toFixed(2)}</td>
                  <td>${row.status.toUpperCase()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Cambodia Private Loan Management System</p>
          </div>

          <div style="margin-top: 20px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Print</button>
            <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; cursor: pointer; margin-left: 10px;">Close</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    message.success('Print preview opened!');
  };

  const loanColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Area', dataIndex: 'area', key: 'area', render: (area) => <Tag color="blue">{area}</Tag> },
    { title: 'Principal (USD)', dataIndex: 'principal', key: 'principal', render: (val) => `${val.toLocaleString()}` },
    { title: 'Interest (%)', dataIndex: 'interestRate', key: 'interestRate', render: (val, record) => `${val}% (${record.interestType})` },
    { title: 'Term', dataIndex: 'term', key: 'term', render: (val) => `${val} months` },
    { title: 'Monthly Payment', dataIndex: 'monthlyPayment', key: 'monthlyPayment', render: (val) => `${val.toFixed(2)}` },
    { title: 'Outstanding', dataIndex: 'remainingBalance', key: 'remainingBalance', render: (val) => `${val.toFixed(2)}` },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : status === 'completed' ? 'blue' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => {
            setSelectedLoan(record);
            setSelectedMenu('loan-details');
          }}>View</Button>
          <Button size="small" type="primary" onClick={() => {
            setSelectedLoan(record);
            setIsPaymentModalVisible(true);
          }}>Pay</Button>
        </Space>
      )
    }
  ];

  const customerColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Area', dataIndex: 'area', key: 'area', render: (area) => <Tag color="purple">{area}</Tag> },
    { title: 'ID Card', dataIndex: 'idCard', key: 'idCard' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Occupation', dataIndex: 'occupation', key: 'occupation' },
    {
      title: 'Loans',
      key: 'loans',
      render: (_, record) => {
        const customerLoans = loans.filter(l => l.customerId === record.id);
        return <Tag>{customerLoans.length} loan(s)</Tag>;
      }
    }
  ];

  const paymentColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { 
      title: 'Loan ID', 
      dataIndex: 'loanId', 
      key: 'loanId',
      render: (loanId) => {
        const loan = loans.find(l => l.id === loanId);
        return `#${loanId} - ${loan?.customerName}`;
      }
    },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (val) => `$${val.toFixed(2)}` },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (val) => <Tag>{val}</Tag> },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      )
    }
  ];

  const renderDashboard = () => (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Dashboard Overview</Title>
        <Space>
          <Text>Filter by Area:</Text>
          <Select
            value={selectedArea}
            onChange={setSelectedArea}
            style={{ width: 200 }}
          >
            <Option value="all">All Areas</Option>
            {loanAreas.map(area => (
              <Option key={area} value={area}>{area}</Option>
            ))}
          </Select>
        </Space>
      </div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Loans"
              value={stats.totalLoans}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Loans"
              value={stats.activeLoans}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Disbursed"
              value={stats.totalDisbursed}
              prefix="$"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Outstanding"
              value={stats.totalOutstanding}
              prefix="$"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Card title="Performance by Area">
            <Table
              dataSource={areaStats}
              rowKey="area"
              pagination={false}
              columns={[
                { title: 'Area', dataIndex: 'area', key: 'area', render: (area) => <Tag color="blue">{area}</Tag> },
                { title: 'Total Loans', dataIndex: 'totalLoans', key: 'totalLoans' },
                { title: 'Active Loans', dataIndex: 'activeLoans', key: 'activeLoans' },
                { 
                  title: 'Total Disbursed', 
                  dataIndex: 'totalDisbursed', 
                  key: 'totalDisbursed',
                  render: (val) => `${val.toLocaleString()}`,
                  sorter: (a, b) => a.totalDisbursed - b.totalDisbursed
                },
                { 
                  title: 'Outstanding', 
                  dataIndex: 'totalOutstanding', 
                  key: 'totalOutstanding',
                  render: (val) => `${val.toLocaleString()}`,
                  sorter: (a, b) => a.totalOutstanding - b.totalOutstanding
                },
                {
                  title: 'Collection Rate',
                  key: 'collectionRate',
                  render: (_, record) => {
                    const rate = record.totalDisbursed > 0 
                      ? ((record.totalDisbursed - record.totalOutstanding) / record.totalDisbursed * 100).toFixed(1)
                      : 0;
                    return <Tag color={rate > 50 ? 'green' : 'orange'}>{rate}%</Tag>;
                  }
                }
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Recent Loans" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsLoanModalVisible(true)}>New Loan</Button>}>
            <Table
              dataSource={filteredLoans.slice(-5)}
              columns={loanColumns.slice(0, 6)}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Payments">
            <Table
              dataSource={payments.slice(-5)}
              columns={paymentColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderLoans = () => (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Loan Management</Title>
        <Space>
          <Select
            value={selectedArea}
            onChange={setSelectedArea}
            style={{ width: 200 }}
            placeholder="Filter by area"
          >
            <Option value="all">All Areas</Option>
            {loanAreas.map(area => (
              <Option key={area} value={area}>{area}</Option>
            ))}
          </Select>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsLoanModalVisible(true)}>
            New Loan Application
          </Button>
        </Space>
      </div>
      <Card>
        <Table
          dataSource={filteredLoans}
          columns={loanColumns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );

  const renderCustomers = () => (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>Customer Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCustomerModalVisible(true)}>
          Add Customer
        </Button>
      </div>
      <Card>
        <Table
          dataSource={customers}
          columns={customerColumns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );

  const renderPayments = () => (
    <div>
      <Title level={2}>Payment History</Title>
      <Card>
        <Table
          dataSource={payments}
          columns={paymentColumns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );

  const renderLoanDetails = () => {
    if (!selectedLoan) return <div>Select a loan to view details</div>;

    const schedule = generateRepaymentSchedule(selectedLoan);
    const customer = customers.find(c => c.id === selectedLoan.customerId);
    const totalInterest = calculateInterest(selectedLoan.principal, selectedLoan.interestRate, selectedLoan.term, selectedLoan.interestType);
    const totalRepayment = selectedLoan.principal + totalInterest;

    return (
      <div>
        <Button onClick={() => setSelectedMenu('loans')} style={{ marginBottom: 16 }}>← Back to Loans</Button>
        <Title level={2}>Loan Details - #{selectedLoan.id}</Title>
        
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Card>
              <Statistic title="Loan Amount" value={selectedLoan.principal} prefix="$" />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Total Interest" value={totalInterest.toFixed(2)} prefix="$" />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Total Repayment" value={totalRepayment.toFixed(2)} prefix="$" />
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Loan Information" key="1">
            <Card>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Customer">{customer?.name}</Descriptions.Item>
                <Descriptions.Item label="Phone">{customer?.phone}</Descriptions.Item>
                <Descriptions.Item label="Area"><Tag color="blue">{selectedLoan.area}</Tag></Descriptions.Item>
                <Descriptions.Item label="Address">{customer?.address}</Descriptions.Item>
                <Descriptions.Item label="Principal Amount">${selectedLoan.principal.toLocaleString()}</Descriptions.Item>
                <Descriptions.Item label="Interest Rate">{selectedLoan.interestRate}% ({selectedLoan.interestType})</Descriptions.Item>
                <Descriptions.Item label="Loan Term">{selectedLoan.term} months</Descriptions.Item>
                <Descriptions.Item label="Monthly Payment">${selectedLoan.monthlyPayment.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Disbursement Date">{selectedLoan.disbursementDate}</Descriptions.Item>
                <Descriptions.Item label="Next Payment">{selectedLoan.nextPaymentDate}</Descriptions.Item>
                <Descriptions.Item label="Paid Amount">${selectedLoan.paidAmount.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Outstanding">${selectedLoan.remainingBalance.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={selectedLoan.status === 'active' ? 'green' : 'blue'}>
                    {selectedLoan.status.toUpperCase()}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </TabPane>
          
          <TabPane tab="Repayment Schedule" key="2">
            <Card>
              <Table
                dataSource={schedule}
                rowKey="month"
                pagination={false}
                columns={[
                  { title: 'Month', dataIndex: 'month', key: 'month' },
                  { title: 'Payment Date', dataIndex: 'paymentDate', key: 'paymentDate' },
                  { title: 'Principal', dataIndex: 'principal', key: 'principal', render: (val) => `$${val.toFixed(2)}` },
                  { title: 'Interest', dataIndex: 'interest', key: 'interest', render: (val) => `$${val.toFixed(2)}` },
                  { title: 'Total Payment', dataIndex: 'totalPayment', key: 'totalPayment', render: (val) => `$${val.toFixed(2)}` },
                  { title: 'Balance', dataIndex: 'balance', key: 'balance', render: (val) => `$${val.toFixed(2)}` },
                  {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => (
                      <Tag color={status === 'paid' ? 'green' : 'orange'}>
                        {status.toUpperCase()}
                      </Tag>
                    )
                  }
                ]}
              />
            </Card>
          </TabPane>

          <TabPane tab="Payment History" key="3">
            <Card>
              <Table
                dataSource={payments.filter(p => p.loanId === selectedLoan.id)}
                columns={paymentColumns}
                rowKey="id"
                pagination={false}
              />
            </Card>
          </TabPane>
        </Tabs>

        <Space style={{ marginTop: 16 }}>
          <Button 
            type="primary" 
            size="large"
            onClick={() => setIsPaymentModalVisible(true)}
          >
            Record Payment
          </Button>
          <Button 
            size="large"
            onClick={() => generateAndDownloadSchedule(selectedLoan)}
          >
            Download Schedule
          </Button>
          <Button 
            size="large"
            onClick={() => printSchedule(selectedLoan)}
          >
            Print Schedule
          </Button>
        </Space>
      </div>
    );
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return renderDashboard();
      case 'loans':
        return renderLoans();
      case 'customers':
        return renderCustomers();
      case 'payments':
        return renderPayments();
      case 'loan-details':
        return renderLoanDetails();
      default:
        return renderDashboard();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} theme="dark">
        <div style={{ height: 64, margin: 16, color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          🏦 Loan System
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="dashboard" icon={<BarChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="loans" icon={<DollarOutlined />}>
            Loans
          </Menu.Item>
          <Menu.Item key="customers" icon={<UserOutlined />}>
            Customers
          </Menu.Item>
          <Menu.Item key="payments" icon={<FileTextOutlined />}>
            Payments
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>Cambodia Private Loan Management System</Title>
          <Text>Admin User</Text>
        </Header>
        <Content style={{ margin: 24 }}>
          {renderContent()}
        </Content>
      </Layout>

      {/* New Loan Modal */}
      <Modal
        title="New Loan Application"
        open={isLoanModalVisible}
        onCancel={() => setIsLoanModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleAddLoan} layout="vertical">
          <Form.Item name="customerId" label="Customer" rules={[{ required: true }]}>
            <Select placeholder="Select customer">
              {customers.map(c => (
                <Option key={c.id} value={c.id}>{c.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="principal" label="Loan Amount (USD)" rules={[{ required: true }]}>
            <InputNumber min={100} style={{ width: '100%' }} placeholder="5000" />
          </Form.Item>
          <Form.Item name="interestRate" label="Interest Rate (%)" rules={[{ required: true }]}>
            <InputNumber min={0} max={20} step={0.5} style={{ width: '100%' }} placeholder="2.5" />
          </Form.Item>
          <Form.Item name="interestType" label="Interest Type" rules={[{ required: true }]} initialValue="flat">
            <Select>
              <Option value="flat">Flat Rate</Option>
              <Option value="reducing">Reducing Balance</Option>
            </Select>
          </Form.Item>
          <Form.Item name="term" label="Loan Term (months)" rules={[{ required: true }]}>
            <InputNumber min={1} max={60} style={{ width: '100%' }} placeholder="12" />
          </Form.Item>
          <Form.Item name="disbursementDate" label="Disbursement Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Create Loan</Button>
              <Button onClick={() => setIsLoanModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Customer Modal */}
      <Modal
        title="Add New Customer"
        open={isCustomerModalVisible}
        onCancel={() => setIsCustomerModalVisible(false)}
        footer={null}
      >
        <Form form={customerForm} onFinish={handleAddCustomer} layout="vertical">
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input placeholder="Sok Dara" />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
            <Input placeholder="012345678" />
          </Form.Item>
          <Form.Item name="idCard" label="ID Card Number" rules={[{ required: true }]}>
            <Input placeholder="123456789" />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input placeholder="Phnom Penh" />
          </Form.Item>
          <Form.Item name="occupation" label="Occupation" rules={[{ required: true }]}>
            <Input placeholder="Business Owner" />
          </Form.Item>
          <Form.Item name="area" label="Loan Area" rules={[{ required: true }]}>
            <Select placeholder="Select area">
              {loanAreas.map(area => (
                <Option key={area} value={area}>{area}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Add Customer</Button>
              <Button onClick={() => setIsCustomerModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Payment Modal */}
      <Modal
        title="Record Payment"
        open={isPaymentModalVisible}
        onCancel={() => setIsPaymentModalVisible(false)}
        footer={null}
      >
        <Form form={paymentForm} onFinish={handlePayment} layout="vertical">
          <Form.Item label="Loan">
            <Input value={selectedLoan ? `#${selectedLoan.id} - ${selectedLoan.customerName}` : ''} disabled />
          </Form.Item>
          <Form.Item name="amount" label="Payment Amount (USD)" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} placeholder={selectedLoan?.monthlyPayment.toFixed(2)} />
          </Form.Item>
          <Form.Item name="date" label="Payment Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="type" label="Payment Type" rules={[{ required: true }]} initialValue="monthly">
            <Select>
              <Option value="monthly">Monthly Payment</Option>
              <Option value="partial">Partial Payment</Option>
              <Option value="full">Full Settlement</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Record Payment</Button>
              <Button onClick={() => setIsPaymentModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default App;