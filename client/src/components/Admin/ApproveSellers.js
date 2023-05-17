import {useState} from 'react';

const ApproveSellers = () => {
    const [sellers, setSellers] = useState([
        {id: 1, username: 'username1', email: 'mail1@mail.com', approved: null},
        {id: 2, username: 'verylongusername', email: 'mail2@mail.com', approved: true},
        {id: 3, username: 'username3', email: 'mail3@mail.com', approved: false},
    ])

    return ( 
        <div className="approveSellersShow">
            <div className="approveSellerPreview">
                <p>Username</p>
                <p>Email</p>
                <p>Approved</p>
                <p></p>
                <p></p>
            </div>
            {sellers.map((seller) => (
                <div className="approveSellerPreview">
                    <p>{seller.username}</p>
                    <p>{seller.email}</p>
                    <p>{seller.approved !== null ? JSON.stringify(seller.approved) : null}</p>
                    <button className='approveButton'>Approve</button>
                    <button className='denyButton'>Deny</button>
                </div>
            ))}
        </div>
     );
}
 
export default ApproveSellers;