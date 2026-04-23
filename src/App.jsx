import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import InvoiceView from './pages/InvoiceView'; // We will build this next

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoice/:id" element={<InvoiceView />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
