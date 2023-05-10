import {useState} from 'react';

const ApproveSellers = () => {
    const [sellers, setSellers] = useState([
        {id: 1, username: 'username1', email: 'mail1@mail.com'},
        {id: 2, username: 'verylongusername', email: 'mail2@mail.com'},
        {id: 3, username: 'username3', email: 'mail3@mail.com'},
    ])

    return ( 
        <div className="approveSellersShow">
            {sellers.map((seller) => (
                <div className="approveSellerPreview">
                    <p>{seller.username}</p>
                    <p>{seller.email}</p>
                    <button className='approveButton'>Approve</button>
                    <button className='denyButton'>Deny</button>
                </div>
            ))}
        </div>
     );
}
 
export default ApproveSellers;