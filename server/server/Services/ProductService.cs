using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using server.Infrastructure;
using server.Interfaces;
using server.Models;

namespace server.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly StorePSGSDbContext _dbContext;

        public ProductService(IMapper mapper, StorePSGSDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public List<ProductDto> GetAllProducts()
        {
            List<ProductDto> productsDto = _mapper.Map<List<ProductDto>>(_dbContext.Products.Include(p => p.Seller).ToList());

            return productsDto;
        }

        public List<ProductDto> GetSellerProducts(long sellerId)
        {
            List<Product> products = _dbContext.Products.Include(p => p.Seller).Where(p => p.SellerId == sellerId).ToList();

            return _mapper.Map<List<ProductDto>>(products);
        }

        public ProductDto AddProduct(ProductDto productDto)
        {
            Product product = _mapper.Map<Product>(productDto);

            _dbContext.Products.Attach(product);

            _dbContext.SaveChanges();

            return _mapper.Map<ProductDto>(product);
        }

        public ProductDto EditProduct(ProductDto productDto)
        {
            Product product = _dbContext.Products.Find(productDto.Id);

            if (product == null)
            {
                return null;
            }

            product.Name = productDto.Name;
            product.Price = productDto.Price;
            product.Amount = productDto.Amount;
            product.Description = productDto.Description;
            product.Image = productDto.Image;

            _dbContext.SaveChanges();

            return _mapper.Map<ProductDto>(product);
        }

        public void DeleteProduct(long productId, long sellerId)
        {
            Product product = _dbContext.Products.Where(p => p.Id == productId && p.SellerId == sellerId).FirstOrDefault();

            _dbContext.Products.Remove(product);

            _dbContext.SaveChanges();
        }
    }
}
