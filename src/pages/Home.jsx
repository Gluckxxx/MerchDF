//Home.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Листівка 1 - 210х150', price: 50, image: '/images/Flayer1.jpg', inStock: true },
  { id: 2, name: 'Листівка 2 - 300х210', price: 50, image: '/images/Flayer2.jpg', inStock: true },
  { id: 3, name: 'Календар 2026', price: 100, image: '/images/2026.jpg', inStock: true },
  { id: 4, name: 'Флешка з піснями DF', price: 400, image: '/images/Flashka.jpg', inStock: true },
];

function Home() {
  const { cart, addToCart, totalPrice, removeFromCart } = useCart();
  const [popupImage, setPopupImage] = useState(null);

  const openPopup = (imgSrc) => {
    setPopupImage(imgSrc);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  return (
    <div className="site-wrapper">
      <meta name="google-adsense-account" content="ca-pub-8203685269637046"></meta>
      <div className="main-layout">
        {/* Кошик */}
        <div className="cart-column">
          <h2 style={{ textAlign: 'center', marginTop: '0.1rem', backgroundColor: '#1886cf' }}>Кошик</h2>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center' }}>Кошик порожній</p>
          ) : (
            <>
              {cart.map(item => (
              <div
               key={item.id}
                className="cart-item"
                style={{
                  position: 'relative',
                  padding: '0.5rem 1rem 0.1rem 1rem',
                  /*marginBottom: '0.75rem',*/
                  borderBottom: '1px solid #444'
                }}
                
              >
                {/* Кнопка-хрестик */}
                

    {/* Назва товару і кількість */}
                <div>{item.name} × {item.quantity}</div>
                <div>{item.price * item.quantity} грн</div>
                   <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                    /*position: 'absolute',*/
                    position: 'relative',
                    padding: '0.01rem 0.01rem 0.01rem 0.01rem',
                    margin: '0.01rem 0.01rem 0.01rem 0.01rem',
                    /*left: '50%',*/
                    /*transform: 'translateX(-50%)',*/
                    background: 'transparent',
                    border: 'none',
                    color: '#e50914',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    lineHeight: 0.75,
                  }}
                  title="Видалити"
                  >
                  &times;
                  </button>
  </div>
))}
              <div style={{ fontWeight: 'bold', marginTop: '0.5rem', textAlign: 'center' }}>
                <div>Загальна вартість:</div>
                <div style={{ fontSize: '1rem', marginTop: '0.10rem' }}>{totalPrice} грн</div>
              </div>
              <a href="/checkout" className="btn-red" style={{ display: 'inline-block', marginTop: '1rem' }}>
                Оформити замовлення
              </a>
            </>
          )}
        </div>

        {/* Товари */}
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem',
                  cursor: 'pointer'
                }}
                onClick={() => openPopup(product.image)}
              />
              <h2>{product.name}</h2>
              <p>{product.price} грн</p>
              <button
                className="btn-red"
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                style={{
                  opacity: product.inStock ? 1 : 0.5,
                  cursor: product.inStock ? 'pointer' : 'not-allowed'
                }}
              >
                {product.inStock ? 'Додати в кошик' : 'Немає в наявності'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Попап */}
      {popupImage && (
        <div className="popup" onClick={closePopup}>
          <span className="close-btn" onClick={e => { e.stopPropagation(); closePopup(); }}>&times;</span>
          <img src={popupImage} alt="Товар" className="popup-img" />
        </div>
      )}
    </div>
  );
}


export default Home;
