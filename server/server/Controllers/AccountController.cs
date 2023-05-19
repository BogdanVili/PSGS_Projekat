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
        public IActionResult Register(SellerDto sellerDto)
        {
            return Ok(_accountService.AddSeller(sellerDto));
        }

        [HttpPost("registerBuyer")]
        public IActionResult Register(BuyerDto buyerDto)
        {
            return Ok(_accountService.AddBuyer(buyerDto));
        }

        [HttpPost("editAdministrator")]
        public IActionResult EditAdmin(AdministratorDto administratorDto)
        {
            return Ok(EditAdmin(administratorDto));
        }

        [HttpPost("editSeller")]
        public IActionResult EditSeller(SellerDto sellerDto)
        {
            return Ok(EditSeller(sellerDto));
        }

        [HttpPost("editBuyer")]
        public IActionResult EditBuyer(BuyerDto buyerDto)
        {
            return Ok(EditBuyer(buyerDto));
        }
    }
}
