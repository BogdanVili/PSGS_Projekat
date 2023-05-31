using server.Dto;

namespace server.Interfaces
{
    public interface IProductService
    {
        ProductDto AddProduct(ProductDto productDto);
        bool DeleteProduct(long productId, long sellerId);
        ProductDto EditProduct(ProductDto productDto);
        List<ProductDto> GetAllProducts();
        List<ProductDto> GetSellerProducts(long sellerId);
        bool CanDeleteProduct(long productId);
    }
}
