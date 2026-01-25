import { useState } from "react";
import {useShoppingList} from './hooks/useShoppingList';
import {Login} from './components/Login';
import { Item } from "./components/Item";
import { api } from "./services/api";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(api.isLoggedIn());
  const {items, addItem, toggleItem, deleteSelected, getAvatarUrl} = useShoppingList();
  const [inputText, setInputText] = useState("");
  const currentUser = api.getCurrentUser();

  if (!isAuthenticated) return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;

  const handleAdd = () => {addItem(inputText); setInputText("");};
  const handleLogout = () => {api.logout(); setIsAuthenticated(false);};

  return (
    <div style={{maxWidth:'400px', margin:'0 auto', padding:'20px', backgroundColor:'#000',
      minHeight:'100vh', color:'white', fontFamily:'sans-serif'}}>
        <h2>Lista de la compra</h2>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
          <div style={{textAlign:'right', fontSize:'12px', color:'#888'}}>Hola,<br/><span style={{color:'white', fontWeight:'bold'}}>{currentUser.name}</span></div>
          <img src={api.getAvatarUrl(currentUser)} onClick={handleLogout} style={{width:'40px', height:'40px', borderRadius: '50%', border:'2px solid #555', cursor:'pointer'}} />
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