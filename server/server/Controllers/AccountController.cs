using Microsoft.AspNetCore.Mvc;
using server.Dto;
using server.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("account")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody]LoginDto login)
        {
            return Ok(_accountService.GetUser(login.Username, login.Password));
        }

        [HttpPost("register-seller")]
        public IActionResult Register([FromBody]SellerDto sellerDto)
        {
            return Ok(_accountService.AddSeller(sellerDto));
        }

        [HttpPost("register-buyer")]
        public IActionResult Register([FromBody]BuyerDto buyerDto)
        {
            return Ok(_accountService.AddBuyer(buyerDto));
        }

        [HttpPost("edit-administrator")]
        public IActionResult EditAdmin([FromBody]AdministratorDto administratorDto)
        {
            return Ok(_accountService.EditAdmin(administratorDto));
        }

        [HttpPost("edit-seller")]
        public IActionResult EditSeller([FromBody]SellerDto sellerDto)
        {
            return Ok(_accountService.EditSeller(sellerDto));
        }

        [HttpPost("edit-buyer")]
        public IActionResult EditBuyer([FromBody]BuyerDto buyerDto)
        {
            return Ok(_accountService.EditBuyer(buyerDto));
        }

        [HttpPost("approve-seller/{sellerId}")]
        public IActionResult ApproveSeller(long sellerId, [FromBody]bool approval)
        {
            return Ok(_accountService.ApproveSeller(sellerId, approval));
        }

        [HttpGet("get-sellers")]
        public IActionResult GetSellers()
        {
            return Ok(_accountService.GetSellers());
        }
    }
}
