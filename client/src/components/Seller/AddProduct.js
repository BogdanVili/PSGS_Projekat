const AddProduct = () => {
    return ( 
        <form className="addProductForm">
            <label>Name:</label>
            <input type="text"></input>
            <br/>
            <label>Price:</label>
            <input type="number"></input>
            <br/>
            <label>Amount:</label>
            <input type="number"></input>
            <br/>
            <label>Description:</label>
            <input type="text"></input>
            <br/>
            <label>Image:</label>
            <input type="file"></input>
            <br/>
            <button>Add</button>
        </form>
     );
}
 
export default AddProduct;