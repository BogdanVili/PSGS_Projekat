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

        [HttpPost("registerSeller")]
        public IActionResult Register([FromBody]SellerDto sellerDto)
        {
            return Ok(_accountService.AddSeller(sellerDto));
        }

        [HttpPost("registerBuyer")]
        public IActionResult Register([FromBody]BuyerDto buyerDto)
        {
            return Ok(_accountService.AddBuyer(buyerDto));
        }

        [HttpPost("editAdministrator")]
        public IActionResult EditAdmin([FromBody]AdministratorDto administratorDto)
        {
            return Ok(_accountService.EditAdmin(administratorDto));
        }

        [HttpPost("editSeller")]
        public IActionResult EditSeller([FromBody]SellerDto sellerDto)
        {
            return Ok(_accountService.EditSeller(sellerDto));
        }

        [HttpPost("editBuyer")]
        public IActionResult EditBuyer([FromBody]BuyerDto buyerDto)
        {
            return Ok(_accountService.EditBuyer(buyerDto));
        }
    }
}
