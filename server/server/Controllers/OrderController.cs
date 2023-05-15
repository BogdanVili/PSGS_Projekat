using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
