using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
