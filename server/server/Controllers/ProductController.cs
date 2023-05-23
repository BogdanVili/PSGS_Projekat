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

        [HttpGet("getAllProducts")]
        public IActionResult GetAllProducts()
        {
            return Ok(_productService.GetAllProducts());
        }

        [HttpPost("getSellerProducts")]
        public IActionResult GetSellerProducts([FromBody]long sellerId)
        {
            return Ok(_productService.GetSellerProducts(sellerId));
        }

        [HttpPost("addProduct")]
        public IActionResult AddProduct([FromBody]ProductDto productDto) 
        {
            return Ok(_productService.AddProduct(productDto));
        }

        [HttpPost("editProduct")]
        public IActionResult EditProduct([FromBody]ProductDto productDto)
        {
            return Ok(_productService.EditProduct(productDto));
        }

        [HttpPost("deleteProduct/{id}")]
        public IActionResult DeleteProduct(long id, [FromBody]long sellerId) 
        {
            _productService.DeleteProduct(id, sellerId);
            return Ok();
        }
    }
}
