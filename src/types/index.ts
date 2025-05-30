export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar?: string;
  createdAt: Date;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'lost' | 'found';
  location: string;
  date: string;
  imageUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'resolved';
  userId: string;
  userName: string;
  userAvatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ItemFormData = Omit<Item, 'id' | 'status' | 'userId' | 'userName' | 'userAvatar' | 'createdAt' | 'updatedAt'>;

export interface ItemFilters {
  search?: string;
  category?: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export interface ItemsContextType {
  items: Item[];
  addItem: (item: ItemFormData) => Promise<void>;
  updateItem: (id: string, item: Partial<Item>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  markAsResolved: (id: string) => Promise<void>;
  approveItem: (id: string) => Promise<void>;
  rejectItem: (id: string) => Promise<void>;
  getItemById: (id: string) => Item | undefined;
  getLostItems: (filters?: ItemFilters) => Item[];
  getFoundItems: (filters?: ItemFilters) => Item[];
  getPendingItems: () => Item[];
  getResolvedItems: () => Item[];
  isLoading: boolean;
  error: string | null;
}