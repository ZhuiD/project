import { makeAutoObservable, runInAction } from 'mobx';
import { Contact, Message, ChatHistory } from '../types';
import { getContacts, getChatHistory, sendMessage } from '../api';

class ChatStore {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  chatHistory: ChatHistory = {};
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedContact(contact: Contact | null) {
    this.selectedContact = contact;
    if (contact && !this.chatHistory[contact.id]) {
      this.fetchChatHistory(contact.id);
    }
  }

  async fetchContacts() {
    this.loading = true;
    try {
      const contacts = await getContacts();
      runInAction(() => {
        this.contacts = contacts;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.error('Failed to fetch contacts:', error);
    }
  }

  async fetchChatHistory(contactId: number) {
    try {
      const messages = await getChatHistory(contactId);
      runInAction(() => {
        this.chatHistory[contactId] = messages;
      });
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  }

  async sendMessage(content: string) {
    if (!this.selectedContact) return;

    try {
      const message = await sendMessage(this.selectedContact.id, content);
      runInAction(() => {
        const messages = this.chatHistory[this.selectedContact!.id] || [];
        this.chatHistory[this.selectedContact!.id] = [...messages, message];
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }
}

export const chatStore = new ChatStore();