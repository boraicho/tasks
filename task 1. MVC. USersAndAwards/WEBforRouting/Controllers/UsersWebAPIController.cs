
namespace WEBforRouting.Controllers
{
    using _EPAM_UsersAndAwards.Interfaceses.BLL;
    using System.Linq;
    using System.Web.Http;
    using UsersAndAwards.Entities;

    public class UsersWebAPIController : ApiController
    {
        private IUserBLL userLogic;
        private IAwardBLL awardLogic;
        private IImageBLL imageLogic;
        public UsersWebAPIController(IUserBLL userLogic, IAwardBLL awardLogic, IImageBLL imageLogic)
        {
            this.userLogic = userLogic;
            this.awardLogic = awardLogic;
            this.imageLogic = imageLogic;
        }
        [Route("users")]
        public IHttpActionResult Get()
        {
            return Json(userLogic.GetAllUser().ToList());
        }
        [Route("users/{words:alpha}")]
        public IHttpActionResult Get(string words)
        {
            if (words.Length == 1)
            {
                return Json(userLogic.GetAllUser().Where(n => n.Name.StartsWith(words)).ToList());
            }
            else
            {
                return Json(userLogic.GetAllUser().Where(n => n.Name.StartsWith(words) || n.Name.EndsWith(words)).ToList());
            }
        }
        [Route("user/{name:length(1)}")]
        public IHttpActionResult Get(string name, int a = 0)
        {
            var user = userLogic.GetAllUser().Where(n => n.Name == name);
            if (user == null)
            {
                return NotFound();
            }
            return Json(user.ElementAt(0));
        }
        [Route("user/{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var user = userLogic.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            return Json(user);
        }
        [Route("create-user")]
        public IHttpActionResult Post([FromBody] UserDTO user)
        {
            if (user == null)
            {
                return BadRequest("User should be defined in request body");
            }
            var result = userLogic.Create(user.Name, user.BirthDate);
            return Created($"/api/UsersWebAPI/{result}", user);
        }
        [Route("user/{id:int}/edit")]
        public IHttpActionResult Put(int id, [FromBody]UserDTO user)
        {
            var _user = userLogic.GetUser(id);
            if(_user == null)
            {
                return NotFound();
            }
            userLogic.ChangeUser(id, user.Name, user.BirthDate);
            return Ok();
        }
        [Route("user/{id:int}/delete")]
        public IHttpActionResult Delete(int id)
        {
            var _user = userLogic.GetUser(id);
            if (_user == null)
            {
                return NotFound();
            }
            userLogic.Delete(id);
            return Ok();
        }
        [Route("award-user/{idUser:int}_{idAward:int}")]
        public IHttpActionResult Put(int idUser, int idAward)
        {
            var user = userLogic.GetUser(idUser);
            var award = awardLogic.GetAward(idAward);
            if (user == null || award == null)
            {
                return NotFound();
            }
            userLogic.AddAwardForUser(idUser, idAward);
            return Ok();
        }
    }
}
