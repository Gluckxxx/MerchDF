import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Завантажуємо кошик з localStorage або починаємо з порожнього масиву
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // При зміні cart оновлюємо localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Додаємо товар у кошик або збільшуємо кількість, якщо він уже є
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Видаляємо товар повністю з кошика
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Оновлюємо кількість конкретного товару (мінімум 1)
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // щоб не було 0 або від’ємної кількості
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  // Очищаємо весь кошик
  const clearCart = () => setCart([]);

  // Обчислюємо загальну ціну
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
