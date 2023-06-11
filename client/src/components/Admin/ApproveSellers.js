import {useEffect, useState} from 'react';
import { ApproveSeller, GetSellers } from '../../services/AccountService';

const ApproveSellers = () => {
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        GetSellers()
            .then(data => {
                setSellers(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }, []);

    const handleApprove = (sellerId) => {
        ApproveSeller(sellerId, true)
        .then(data => {
            const updatedSellers = sellers.map(seller => {
                if (seller.id === data.id) {
                  return { ...seller, approval: data.approval };
                }
                return seller;
              });
            setSellers(updatedSellers);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleDeny = (sellerId) => {
        ApproveSeller(sellerId, false);
    }

    const disableButtons = (approval) => {
        if(approval === null)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

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
                <div className="approveSellerPreview" key={seller.id}>
                    <p>{seller.username}</p>
                    <p>{seller.email}</p>
                    <p>{seller.approved !== null ? JSON.stringify(seller.approval) : null}</p>
                    <button className='approveButton' onClick={() => handleApprove(seller.id)} disabled={disableButtons(seller.approval)}>Approve</button>
                    <button className='denyButton' onClick={() => handleDeny(seller.id)} disabled={disableButtons(seller.approval)}>Deny</button>
                </div>
            ))}
        </div>
     );
}
 
export default ApproveSellers;