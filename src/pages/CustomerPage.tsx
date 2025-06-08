import React, { useState } from 'react';
import { Edit, Trash2, User, Phone, MapPin } from 'lucide-react';
import './CustomerPage.css';

interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
}

const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: 'John Doe', phone: '1234567890', address: '123 Main St, City' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', address: '456 Oak Ave, Town' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (editingId) {
      // Update existing customer
      setCustomers(prev => prev.map(customer => 
        customer.id === editingId 
          ? { ...customer, ...formData }
          : customer
      ));
      setEditingId(null);
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: Date.now(),
        ...formData
      };
      setCustomers(prev => [...prev, newCustomer]);
    }

    // Reset form
    setFormData({ name: '', phone: '', address: '' });
  };

  const handleEdit = (customer: Customer) => {
    setFormData({
      name: customer.name,
      phone: customer.phone,
      address: customer.address
    });
    setEditingId(customer.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(prev => prev.filter(customer => customer.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', phone: '', address: '' });
    setEditingId(null);
  };

  return (
    <div className="customer-page">
      {/* Header */}
      <div className="header">
        <h1 className="dashboard-title">Customer details</h1>
      </div>

      <div className="main-content">
        {/* Left Side - Add Customer Form */}
        <div className="form-section">
          <div className="form-header">
            <h2>{editingId ? 'EDIT CUSTOMER' : 'ADD CUSTOMER'}</h2>
          </div>

          <form onSubmit={handleSubmit} className="customer-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <User className="label-icon" />
                NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter customer name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                <Phone className="label-icon" />
                PHONE NUMBER
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                <MapPin className="label-icon" />
                ADDRESS
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Enter customer address"
                rows={3}
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                {editingId ? 'UPDATE' : 'ADD'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="btn-secondary">
                  CANCEL
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Side - Customer List */}
        <div className="customers-section">
          <div className="customers-header">
            <h2>YOUR CUSTOMERS</h2>
            <span className="customer-count">({customers.length} customers)</span>
          </div>

          <div className="customers-list">
            {customers.length === 0 ? (
              <div className="empty-state">
                <User className="empty-icon" />
                <p>No customers added yet</p>
                <p className="empty-subtitle">Add your first customer to get started</p>
              </div>
            ) : (
              customers.map((customer) => (
                <div key={customer.id} className="customer-card">
                  <div className="customer-info">
                    <div className="customer-name">
                      <User className="customer-icon" />
                      {customer.name}
                    </div>
                    <div className="customer-phone">
                      <Phone className="customer-icon" />
                      {customer.phone}
                    </div>
                    <div className="customer-address">
                      <MapPin className="customer-icon" />
                      {customer.address}
                    </div>
                  </div>
                  <div className="customer-actions">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="action-btn edit-btn"
                      title="Edit customer"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="action-btn delete-btn"
                      title="Delete customer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;