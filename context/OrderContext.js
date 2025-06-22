import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (meal) => {
    const orderWithTimestamp = {
      ...meal,
      orderedAt: new Date().toISOString(),
      orderId: Date.now().toString()
    };
    setOrders(prevOrders => [...prevOrders, orderWithTimestamp]);
    return orderWithTimestamp;
  };

  const getLastOrder = () => {
    return orders[orders.length - 1] || null;
  };

  const value = {
    orders,
    addOrder,
    getLastOrder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}; 