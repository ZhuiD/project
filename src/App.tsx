import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { chatStore } from './store/ChatStore';
import './App.css';  // 直接导入 CSS

const App = observer(() => {
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    chatStore.fetchContacts();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    await chatStore.sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="app">
      {/* 左侧联系人列表 */}
      <div className="contacts">
        <h2>联系人列表</h2>
        {chatStore.contacts.map(contact => (
          <div
            key={contact.id}
            className={`contact-item ${
              chatStore.selectedContact?.id === contact.id ? 'active' : ''
            }`}
            onClick={() => chatStore.setSelectedContact(contact)}
          >
            {contact.name}
          </div>
        ))}
      </div>

      {/* 右侧聊天窗口 */}
      <div className="chat-window">
        {chatStore.selectedContact ? (
          <>
            <div className="chat-header">
              <h2>{chatStore.selectedContact.name}</h2>
            </div>
            <div className="message-list">
              {(chatStore.chatHistory[chatStore.selectedContact.id] || []).map(
                message => (
                  <div
                    key={message.id}
                    className={`message ${
                      message.senderId === 0 ? 'self' : 'other'
                    }`}
                  >
                    <div className="message-content">
                      {message.content}
                    </div>
                  </div>
                )
              )}
            </div>
            <form className="message-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="输入消息..."
              />
              <button type="submit" disabled={chatStore.loading}>
                {chatStore.loading ? '发送中...' : '发送'}
              </button>
            </form>
          </>
        ) : (
          <div className="no-contact">
            请选择联系人开始聊天
          </div>
        )}
      </div>
    </div>
  );
});

export default App;