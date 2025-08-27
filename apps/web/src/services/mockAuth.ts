import { jwtDecode } from 'jwt-decode';

// This is a mock auth service for demonstration purposes
// In a real app, this would be replaced with actual API calls

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'viewer' | 'developer';
}

// Simulated users database
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    password: 'password',
    role: 'admin',
  },
  {
    id: '2',
    email: 'viewer@example.com',
    name: 'Viewer User',
    password: 'password',
    role: 'viewer',
  },
  {
    id: '3',
    email: 'dev@example.com',
    name: 'Developer User',
    password: 'password',
    role: 'developer',
  },
];

// Create a mock JWT token
const createToken = (user: User): string => {
  // In a real app, we would use a library like jsonwebtoken to create a real JWT
  // For demo purposes, we're creating a fake token
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    // Set expiration to 1 hour from now
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  // Convert the payload to a Base64-encoded string
  const base64Payload = btoa(JSON.stringify(payload));
  const base64Header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  
  // Normally we would sign this with a secret key
  // For demo, we're just concatenating parts
  return `${base64Header}.${base64Payload}.FAKE_SIGNATURE`;
};

// Mock login function
export const mockLogin = async (email: string, password: string): Promise<{ token: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const token = createToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'admin' | 'viewer' | 'developer',
  });

  return { token };
};

// Mock register function
export const mockRegister = async (name: string, email: string, password: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const userExists = users.some(u => u.email === email);
  
  if (userExists) {
    throw new Error('User already exists');
  }

  // In a real app, we would save the user to the database
  // For demo, we're just pretending it worked
  return;
};

// Mock validate token function
export const validateToken = (token: string): User | null => {
  try {
    // In a real app, we would verify the signature
    // For demo, we're just decoding the token
    const decoded = jwtDecode<User & { exp: number }>(token);
    
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }
    
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
};