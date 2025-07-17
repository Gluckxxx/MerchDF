//App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import './styles.css'; // обовʼязково переконайся, що це підключено


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="site-wrapper">
           <header className="header">
  <div className="header-banner-wrapper">
    <img
      src="/images/DFMerchLogo2.jpg"
      alt="DF Merch Banner"
      className="header-banner-img"
    />
  </div>
</header>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          <footer>
            
            <div className="meregi">
              <h2>Ми у соцмережах</h2>
            </div>
            

            <div className="meregi">
               <a href="https://www.instagram.com/dity.fristaila.official" target="_blank">Instagram</a>
               <a href="https://www.tiktok.com/@dity.fristaila.official?lang=uk-UA" target="_blank">TikTok</a>
               <a href="https://www.youtube.com/@poltava5074" target="_blank">YouTube</a>
               <a href="https://www.facebook.com/profile.php?id=61575678412060" target="_blank">Facebook</a>
            </div>


             <div className="reklama">
               ---
               
            </div>




          </footer>


          </main>
          
        </div>
      </Router>
    </CartProvider>
  );


}

export default App;
