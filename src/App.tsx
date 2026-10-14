import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books/Books";
import BookDetail from "./pages/Books/BookDetail";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import Layout from "./components/Layout";
import HostLayout from "./pages/Host/HostLayout";
import HostBooks from "./pages/Host/HostBooks";
import HostBookDetail from "./pages/Host/HostBookDetail";
import HostBookPhotos from "./pages/Host/HostBookPhotos";
import HostBookPricing from "./pages/Host/HostBookPricing";
import HostBookInfo from "./pages/Host/HostBookInfo";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<BookDetail />} />
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="books" element={<HostBooks />} />
            <Route path="books/:id" element={<HostBookDetail />}>
              <Route index element={<HostBookInfo />} />
              <Route path="pricing" element={<HostBookPricing />} />
              <Route path="photos" element={<HostBookPhotos />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
