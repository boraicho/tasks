namespace UsersAndAwards.Controllers
{
    using _EPAM_UsersAndAwards.Interfaceses.BLL;
    using System.Linq;
    using System.Web.Mvc;
    using ViewModels.Awards;
    public class AwardsController : Controller
    {
        private IAwardBLL awardLogic;

        public AwardsController(IAwardBLL awardLogic)
        {
            this.awardLogic = awardLogic;
        }
        public ActionResult GetAward(int id)
        {
            var model = awardLogic.GetAward(id);
            if (Request.IsAjaxRequest())
            {
                return Json(new { Id = model.Id, Title = model.Title, Description = model.Description }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return View(model);
            }
        }
        [Route("awards")]
        public ActionResult Index()
        {
            var awards = awardLogic.GetAllAward();
            return View(awards);
        }
        [Route("create-award")]
        public ActionResult Create()
        {
            return View();
        }
        [Route("create-award")]
        [HttpPost]
        public ActionResult Create(CreateAwardVM model)
        {
            byte[] image = new byte[model.Image.ContentLength];
            model.Image.InputStream.Read(image, 0, model.Image.ContentLength);
            awardLogic.Create(model.Title, model.Description, image, model.Image.FileName, model.Image.ContentType);
            return RedirectToAction(nameof(Index));
        }
        public ActionResult Delete(int id)
        {
            var model = awardLogic.GetAward(id);
            return View(model);
        }
        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            awardLogic.Delete(id);
            return RedirectToAction(nameof(Index));
        }
        [Route("award/{id:int}/edit")]
        public ActionResult Change(int id)
        {
            var model = awardLogic.GetAward(id);
            return View(model);
        }
        [Route("award/{id:int}/edit")]
        [HttpPost]
        public ActionResult Change(ChangeAwardVM model)
        {
            awardLogic.ChangeAward(model.Id, model.Title, model.Description);
            if (model.Image != null)
            {
                byte[] image = new byte[model.Image.ContentLength];
                awardLogic.ChangeImage(model.Id, model.Image.FileName, image, model.Image.ContentType);
            }
            return RedirectToAction("Index", "Awards");
        }
        public ActionResult GetImage(int id)
        {
            var award = awardLogic.GetAward(id);
            return File(award.Image.Image, award.Image.ContentType);
        }
        public ActionResult GetAllAward()
        {
            var awards = awardLogic.GetAllAward();
            var _awards = new AllAwardsVM();
            foreach (var item in awards)
            {
                _awards.Awards.Add(item.Title);
            }
            ViewBag.Awards = _awards;
            return View();
        }
        [Route("users/{word:alpha}")]
        public ActionResult GetAwardByCrit(string word)
        {
            if (word.Length == 1)
            {
                return View(awardLogic.GetAllAward().Where(n => n.Title.StartsWith(word)).ToList());
            }
            else if (word.Length > 1)
            {
                return View(awardLogic.GetAllAward().Where(n => n.Title.Contains(word)).ToList());
            }
            return View();
        }
        [Route("awards/{title:alpha}")]
        public ActionResult GetAwardByTitle(string title)
        {
            return View(awardLogic.GetAllAward().Where(n => n.Title == title).ElementAt(0));
        }
    }
}