import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Register from './components/Register';
import PrediosList from './components/PrediosList';
import OnePredio from './components/OnePredio';
import PredioForm from './components/PredioForm';
import ProcessTrack from './components/ProcessTrack';
import Inventario from './components/Inventario';
import ProductForm from './components/ProductForm';
import EditProducto from './components/EditProducto';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/predios' element={<PrediosList />} />
        <Route path='/predios/:id' element={<OnePredio />} />
        <Route path='/predios/create' element={<PredioForm />} />
        <Route path='/predios/process/:id' element={<ProcessTrack />} />
        <Route path='/inventario' element={<Inventario />} />
        <Route path='/inventario/addproducto' element={<ProductForm />} />
        <Route path='/inventario/editproducto/:id' element={<EditProducto />} />
      </Routes>
    </div>
  );
}

export default App;
