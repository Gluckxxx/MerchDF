import { useCart } from '../context/CartContext';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

function Checkout() {
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    branch: '',
    delivery: 'НоваПошта',
    comment: '', // 🆕 додано коментар
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      name: form.name,
      phone: form.phone,
      city: form.city,
      branch: form.branch,
      delivery: form.delivery,
      comment: form.comment, // 🆕
      total: totalPrice,
      cart: cart
        .map(item => `${item.name} × ${item.quantity} = ${item.price * item.quantity} грн`)
        .join('\n'),
    };

    emailjs
      .send('service_2v5q1p9', 'template_c5e6tpo', orderData, 'Dhu05mWLGyjLcpdNE')
      .then((response) => {
        console.log('Лист надіслано!', response.status, response.text);
        setSubmitted(true);
        clearCart();
      }, (err) => {
        console.log('Помилка надсилання:', err);
        alert('Не вдалося надіслати замовлення. Спробуйте ще раз.');
      });
  };

  if (submitted) {
    return (
      <div style={{ padding: '1rem' }}>
        <center>Дякуємо за замовлення!</center>
      </div>
    );
  }

  return (
    <div className="cart-item">
      <div style={{ padding: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Ваш кошик
        </h2>
        {cart.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <div className="cart-list">
            {cart.map(item => (
              <div key={item.id} className="checkout-item">
                <div className="item-name">{item.name}</div>
                <div className="item-details-row">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="quantity-input"
                  />
                  <div className="item-price">{item.price * item.quantity} грн</div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            ))}
            <div style={{ fontWeight: 'bold' }}>
              Загальна вартість: {totalPrice} грн
            </div>
          </div>
        )}

        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Оформлення замовлення
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#3a3a3a',
            padding: '1rem',
            borderRadius: '0.5rem',
            maxWidth: '400px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
            margin: '0 auto',
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem' }}>
              Ім’я та прізвище:
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.25rem' }}>
              Мобільний телефон:
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Доставка:</div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ marginRight: '1rem' }}>
              <input
                type="radio"
                name="delivery"
                value="НоваПошта"
                checked={form.delivery === 'НоваПошта'}
                onChange={e => setForm({ ...form, delivery: e.target.value })}
              />{' '}
              НоваПошта
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="УкрПошта"
                checked={form.delivery === 'УкрПошта'}
                onChange={e => setForm({ ...form, delivery: e.target.value })}
              />{' '}
              УкрПошта
            </label>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="city" style={{ display: 'block', marginBottom: '0.25rem' }}>
              Місто:
            </label>
            <input
              id="city"
              type="text"
              required
              value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="branch" style={{ display: 'block', marginBottom: '0.25rem' }}>
              Номер відділення, або індекс:
            </label>
            <input
              id="branch"
              type="text"
              required
              value={form.branch}
              onChange={e => setForm({ ...form, branch: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="comment" style={{ display: 'block', marginBottom: '0.25rem' }}>
              Коментар:
            </label>
            <textarea
              id="comment"
              rows="3"
              value={form.comment}
              onChange={e => setForm({ ...form, comment: e.target.value })}
              className="form-input"
              placeholder="Ваші побажання або коментар"
            />
          </div>

          <button type="submit" className="btn-red">Надіслати замовлення</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
