namespace UsersAndAwards.Controllers
{
    using _EPAM_UsersAndAwards.Interfaceses.BLL;
    using AutoMapper;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using ViewModels.AppUser;
    using ViewModels.Image;

    public class UsersController : Controller
    {
        private IUserBLL userLogic;
        private IAwardBLL awardLogic;
        private IImageBLL imageLogic;
        public UsersController(IUserBLL userLogic, IAwardBLL awardLogic, IImageBLL imageLogic)
        {
            this.userLogic = userLogic;
            this.awardLogic = awardLogic;
            this.imageLogic = imageLogic;
        }
        [Route("users")]
        [Route("")]
        public ActionResult Index()
        {
            var users = userLogic.GetAllUser().ToList();
            var model = Mapper.Map<IEnumerable<AppUsersVM>>(users);
            return View(model);
        }
        [Route("create-user")]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(CreateAppUserVM model)
        {
            TempData["id"] = userLogic.Create(model.Name, model.Birthdate);
            return RedirectToAction(nameof(LoadPhoto));
        }
        [Route("user/{id:int}/delete")]
        public ActionResult Delete(int id)
        {
            var user = userLogic.GetUser(id);
            var model = Mapper.Map<AppUsersVM>(user);
            return View(model);
        }
        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            userLogic.Delete(id);
            return RedirectToAction(nameof(Index));
        }
        [Route("user/{id:int}/load-photo")]
        public ActionResult LoadPhoto(int id = 0)
        {
            ViewBag.id = id != 0 ? id : TempData["id"];
            return View();
        }
        [Route("user/{id:int}/load-photo")]
        [HttpPost]
        public ActionResult LoadPhoto(LoadImageVM model)
        {
            if (model.Image == null)
            {
                return RedirectToAction("Index", "Users");
            }
            byte[] image = new byte[model.Image.ContentLength];
            model.Image.InputStream.Read(image, 0, model.Image.ContentLength);
            userLogic.LoadPhoto(model.IdUser, model.Image.FileName, image, model.Image.ContentType);
            return RedirectToAction("Index", "Users");
        }
        [Route("user/{id:int}/delete-photo")]
        public ActionResult DeletePhoto(int id)
        {
            userLogic.DeletePhoto(id);
            return RedirectToAction("Index", "Users");
        }
        [Route("user/{id:int}/edit")]
        public ActionResult Change(int id)
        {
            var user = userLogic.GetUser(id);
            var model = Mapper.Map<AppUsersVM>(user);
            return View(model);
        }
        [Route("user/{id:int}/edit")]
        [HttpPost]
        public ActionResult Change(ChangeAppUserVM model)
        {
            userLogic.ChangeUser(model.Id, model.Name, model.Birthdate);
            if (model.Image != null)
            {
                byte[] image = new byte[model.Image.ContentLength];
                model.Image.InputStream.Read(image, 0, model.Image.ContentLength);
                userLogic.LoadPhoto(model.Id, model.Image.FileName, image, model.Image.ContentType);
            }
            return RedirectToAction("Index", "Users");
        }
        public ActionResult GetImage(int id)
        {
            var user = userLogic.GetUser(id);
            if (user.Photo.Image != null)
            {
                return File(user.Photo.Image, user.Photo.ContentType);
            }
            else
            {
                var img = imageLogic.GetNoAvatarImage();
                return File(img.Image, img.ContentType);
            }

        }
        [Route("user/{id:int}/awards")]
        public ActionResult Awards(int id)
        {
            var model = userLogic.GetAllUsersAward(id);
            var awards = awardLogic.GetAllAward();
            ViewBag.AllAwards = new SelectList(awards.Where(a => !model.Any(m => m.Id == a.Id)).Select(a => new { a.Id, a.Title }), "Id", "Title");
            ViewBag.IdUSer = id;
            return View(model);
        }
        [Route("award-user/{idUser:int}_{idAward:int}")]
        [Route("award-user/add")]
        [HttpPost]
        public ActionResult AddAward(int idUser, int AllAwards)
        {
            userLogic.AddAwardForUser(idUser, AllAwards);
            return RedirectToAction("Awards", "Users", new { id = idUser });
        }
        [Route("user/{id:int}/delete-award")]
        public ActionResult DeleteUsersAward(int idUser, int idAward)
        {
            userLogic.DeleteUsersAward(idUser, idAward);
            return RedirectToAction("Awards", "Users", new { id = idUser });
        }
        [Route("users/{word}")]
        public ActionResult GetUserByCrit(string word)
        {
            if (word.Length == 1)
            {
                return View(userLogic.GetAllUser().Where(n => n.Name.StartsWith(word)).ToList());
            }
            else if (word.Length > 1)
            {
                return View(userLogic.GetAllUser().Where(n => n.Name.StartsWith(word) || n.Name.EndsWith(word)).ToList());
            }
            return View();
        }
        [Route("users/{name}")]
        public ActionResult GetByName(string name)
        {
            return View(userLogic.GetAllUser().Where(n => n.Name == name).First());
        }

        public ActionResult SaveUsersInFile()
        {
            var users = userLogic.GetAllUser();
            using (StreamWriter sr = new StreamWriter(@"C:\AppUsers\users.txt", false, Encoding.Default))
            {
                foreach (var item in users)
                {
                    StringBuilder awards = new  StringBuilder();
                    foreach (var award in item.Awards)
                    {
                        awards.Append(award.Title);
                        awards.Append(new char[]{' '});
                    }
                    string _awards;
                    if(awards.Length < 2)
                    {
                        _awards = "No have";
                    }
                    else
                    {
                        _awards = awards.ToString();
                    }
                    string user = item.Name.ToString() + " "
                        + item.BirthDate.Date.ToString("d") + " "
                        + item.Age.ToString() + " "
                        + "Awards: " + _awards;
                    sr.WriteLine(user);
                }
            }
            return RedirectToAction("Index", "Users");
        }
    }
}