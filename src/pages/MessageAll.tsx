import React, { useState } from 'react';
import './MessageAll.css';

interface Message {
  id: number;
  content: string;
  timestamp: Date;
  customerCount: number;
  status: 'sent';
}

interface MessageAllProps {}

const MessageAll: React.FC<MessageAllProps> = () => {
  const [message, setMessage] = useState<string>('');
  const [showPastMessages, setShowPastMessages] = useState<boolean>(false);
  const [pastMessages, setPastMessages] = useState<Message[]>([]);

  const totalCustomers = 1247;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const timestamp = new Date();

      const newMessage: Message = {
        id: Date.now(),
        content: message.trim(),
        timestamp,
        customerCount: totalCustomers,
        status: 'sent',
      };

      setPastMessages((prev) => [newMessage, ...prev]);
      alert(`Message sent to all customers!`);

      setMessage('');
    }
  };

  const handlePastMessageSelect = (pastMessage: Message) => {
    setMessage(pastMessage.content);
    setShowPastMessages(false);
  };

  const getPreviewMessage = () => {
    return message || '';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="message-all-container">
      <div className="message-all-header">
        <div className="header-content">
          <h1>MESSAGE ALL CUSTOMERS</h1>
        </div>
        <div className="customer-count">
          <span className="count-number">{totalCustomers.toLocaleString()}</span>
          <span className="count-label">Total Customers</span>
        </div>
      </div>

      <div className="message-all-content">
        <div className="message-input-section">
          <div className="input-container">
            <div className="input-header">
              <div className="header-with-icon">
                <div className="dashboard-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                </div>
                <h2>COMPOSE MESSAGE</h2>
              </div>
              <button
                className="history-button"
                onClick={() => setShowPastMessages(!showPastMessages)}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                </svg>
                Message History
              </button>
            </div>

            <div className="message-form">
              <div className="textarea-container">
                <textarea
                  className="message-textarea"
                  placeholder="TYPE YOUR MESSAGE HERE..."
                  value={message}
                  onChange={handleMessageChange}
                  rows={8}
                />
                <div className="character-count">{message.length}/500 characters</div>
              </div>

              <div className="send-options">
                <button className="send-button" onClick={handleSendMessage}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                  SEND NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="preview-section">
          <div className="preview-container">
            <div className="preview-header">
              <h3>MESSAGE PREVIEW</h3>
              <div className="recipient-info">
                <span>📱 {totalCustomers.toLocaleString()} recipients</span>
              </div>
            </div>
            <div className="preview-content">
              <div className="preview-message-box">
                <div className="message-header">
                  <div className="sender-info">
                    <div className="sender-avatar">📱</div>
                    <div className="sender-details">
                      <div className="sender-name">Shop's name</div>
                      <div className="message-type">SMS Message</div>
                    </div>
                  </div>
                  <div className="message-time">Now</div>
                </div>
                <div
                  className="message-content"
                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                >
                  {getPreviewMessage()}
                </div>

                <div className="message-footer">
                  <span className="delivery-status">✓ Ready to send</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPastMessages && (
        <div className="modal-overlay" onClick={() => setShowPastMessages(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Message History</h3>
              <button className="close-button" onClick={() => setShowPastMessages(false)}>
                ×
              </button>
            </div>
            <div className="past-messages-list">
              {pastMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="past-message-item"
                  onClick={() => handlePastMessageSelect(msg)}
                >
                  <div className="past-message-content">
                    <p>{msg.content}</p>
                  </div>
                  <div className="past-message-meta">
                    <div className="message-stats">
                      <span className="customer-count">👥 {msg.customerCount}</span>
                      <span className="message-status">● {msg.status.toUpperCase()}</span>
                    </div>
                    <span className="message-date">{formatDate(msg.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageAll;
