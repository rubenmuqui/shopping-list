import { useState } from "react";
import {useShoppingList} from './hooks/useShoppingList';
import {Login} from './components/Login';
import { Item } from "./components/Item";
import { api } from "./services/api";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(api.isLoggedIn());
  const {items, addItem, toggleItem, deleteSelected, getAvatarUrl} = useShoppingList();
  const [showMenu, setShowMenu] = useState(false);
  const [inputText, setInputText] = useState("");
  const currentUser = api.getCurrentUser();

  if (!isAuthenticated) return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;

  const handleAdd = () => {addItem(inputText); setInputText("");};
  const handleLogout = () => {api.logout(); setIsAuthenticated(false); setShowMenu(false);};

  return (
    <div style={{maxWidth:'400px', margin:'0 auto', padding:'20px', backgroundColor:'#000',
      minHeight:'100vh', color:'white', fontFamily:'sans-serif'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        
        {/* Título a la izquierda */}
        <h2 style={{ margin: 0 }}>Lista 🛒</h2>

        {/* Contenedor Perfil a la derecha (Posición relativa para el menú) */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Saludo alineado */}
          <div style={{ textAlign: 'right', lineHeight: '1.2' }}>
            <span style={{ fontSize: '12px', color: '#888' }}>Hola,</span><br />
            <span style={{ color: 'white', fontWeight: 'bold' }}>{currentUser.name}</span>
          </div>

          {/* Foto (Click abre/cierra menú) */}
          <img
            src={api.getAvatarUrl(currentUser)}
            onClick={() => setShowMenu(!showMenu)}
            style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #555', cursor: 'pointer' }}
          />

          {/* Menú Desplegable (Solo visible si showMenu es true) */}
          {showMenu && (
            <div style={{
              position: 'absolute',
              top: '50px',
              right: '0',
              backgroundColor: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              padding: '10px',
              zIndex: 10,
              minWidth: '120px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
            }}>
              <button 
                onClick={handleLogout} 
                style={{
                  background: 'transparent', color: '#ff6b6b', border: 'none', 
                  width: '100%', textAlign: 'left', cursor: 'pointer', fontSize: '14px'
                }}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
        {items.map(item => <Item key={item.id} item={item} onToggle={toggleItem} getAvatarUrl={getAvatarUrl} />)}
      </div>
      <div style={{marginTop:'30px', borderTop:'1px solid #444', paddingTop:'20px'}}>
        <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
          <input value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Añadir algo..." onKeyDown={(e) => e.key === 'Enter' && handleAdd()} style={{flex:1, padding:'10px', borderRadius:'5px',border:'none'}} />
          <button onClick={handleAdd} style={{padding:'10px 20px', background:'#fff',color:'#000', border:'none', borderRadius:'5px', fontSize:'20px'}}>+</button>
        </div>
        <button onClick={deleteSelected} style={{width:'100%', padding:'10px', background:'transparent', color:'#fff', border:'1px solid #fff', borderRadius:'5px'}}>Eliminar tachados</button>
      </div>
    </div>
  )
}