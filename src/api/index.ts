import { Contact, Message } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟获取联系人列表
export async function getContacts(): Promise<Contact[]> {
  await delay(500); // 模拟网络延迟
  return [
    { id: 1, name: "张三" },
    { id: 2, name: "李四" },
    { id: 3, name: "王五" },
  ];
}

// 模拟不同联系人的历史消息
export async function getChatHistory(contactId: number): Promise<Message[]> {
  await delay(300);
  
  const histories: { [key: number]: Message[] } = {
    1: [
      {
        id: 1,
        senderId: 1,
        content: "在吗？我有个技术问题想请教你",
        timestamp: new Date(Date.now() - 100000),
      },
      {
        id: 2,
        senderId: 0,
        content: "在的，什么问题？",
        timestamp: new Date(Date.now() - 80000),
      },
      {
        id: 3,
        senderId: 1,
        content: "React 的 useEffect 怎么用啊？",
        timestamp: new Date(Date.now() - 60000),
      },
    ],
    2: [
      {
        id: 4,
        senderId: 2,
        content: "今天下班一起吃饭吗？",
        timestamp: new Date(Date.now() - 200000),
      },
      {
        id: 5,
        senderId: 0,
        content: "好啊，去哪吃？",
        timestamp: new Date(Date.now() - 180000),
      },
      {
        id: 6,
        senderId: 2,
        content: "新开的那家火锅怎么样？",
        timestamp: new Date(Date.now() - 160000),
      },
    ],
    3: [
      {
        id: 7,
        senderId: 3,
        content: "项目进度怎么样了？",
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: 8,
        senderId: 0,
        content: "已经完成了 80%",
        timestamp: new Date(Date.now() - 280000),
      },
      {
        id: 9,
        senderId: 3,
        content: "很好，继续保持",
        timestamp: new Date(Date.now() - 260000),
      },
    ],
  };

  return histories[contactId] || [];
}

// 模拟发送消息
export async function sendMessage(contactId: number, content: string): Promise<Message> {
  await delay(200);
  return {
    id: Date.now(),
    senderId: 0,
    content,
    timestamp: new Date(),
  };
}