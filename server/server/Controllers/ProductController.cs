using Microsoft.AspNetCore.Mvc;
using server.Dto;
using server.Interfaces;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("product")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("get-all-products")]
        public IActionResult GetAllProducts()
        {
            return Ok(_productService.GetAllProducts());
        }

        [HttpPost("get-seller-products")]
        public IActionResult GetSellerProducts([FromBody]long sellerId)
        {
            return Ok(_productService.GetSellerProducts(sellerId));
        }

        [HttpPost("add-product")]
        public IActionResult AddProduct([FromBody]ProductDto productDto) 
        {
            return Ok(_productService.AddProduct(productDto));
        }

        [HttpPost("edit-product")]
        public IActionResult EditProduct([FromBody]ProductDto productDto)
        {
            return Ok(_productService.EditProduct(productDto));
        }

        [HttpPost("delete-product/{productId}")]
        public IActionResult DeleteProduct(long productId, [FromBody]long sellerId) 
        {
            _productService.DeleteProduct(productId, sellerId);
            return Ok();
        }
    }
}
