export function Item({item, onToggle, getAvatarUrl}){
    const user = item.expand?.user || {};
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px',
            border: '1px solid #fff', marginBottom: '8px', backgroundColor: '#222', color: 'white'}}>
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <img src={getAvatarUrl(user)} alt="User" style={{width:'30px', height:'30px', borderRadius:'50%',
                        objectFit:'cover'}} />
                        <span style={{textDecoration: item.comprado ? 'line-through' : 'none', color: item.comprado ? 
                            '#888' : '#fff'}}>{item.producto}</span>
                </div>
                <input type='checkbox' checked={item.comprado} onChange={() => onToggle(item.id, item.comprado)} 
                style= {{width:'20px', height:'20px'}} />
            </div>
        
    );
}