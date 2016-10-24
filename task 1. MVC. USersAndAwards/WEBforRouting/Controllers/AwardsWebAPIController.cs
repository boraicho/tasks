namespace WEBforRouting.Controllers
{
    using _EPAM_UsersAndAwards.Interfaceses.BLL;
    using System.Linq;
    using System.Web.Http;
    using UsersAndAwards.Entities;

    public class AwardsWebAPIController : ApiController
    {
        private IAwardBLL awardLogic;
        public AwardsWebAPIController(IAwardBLL awardLogic)
        {
            this.awardLogic = awardLogic;
        }
        [Route("awards")]
        public IHttpActionResult Get()
        {
            return Json(awardLogic.GetAllAward().ToList());
        }
        [Route("award/{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var user = awardLogic.GetAward(id);
            if (user == null)
            {
                return NotFound();
            }
            return Json(user);
        }
        [Route("awards/{word:length(1)}")]
        public IHttpActionResult Get(string word)
        {
            var awards = awardLogic.GetAllAward().Where(n => n.Title.StartsWith(word)).ToList();
            if (awards == null)
            {
                return NotFound();
            }
            return Json(awards);
        }
        [Route("awards/{words:alpha}")]
        public IHttpActionResult Get(string words, bool a = true)
        {
            var awards = awardLogic.GetAllAward().Where(n => n.Title.Equals(words)).ToList();
            if (awards == null)
            {
                return NotFound();
            }
            return Json(awards);
        }
        [Route("award/{title:alpha}")]
        public IHttpActionResult Get(string title, int a = 0)
        {
            var awards = awardLogic.GetAllAward().Where(n => n.Title == title);
            if (awards == null)
            {
                return NotFound();
            }
            return Json(awards.First());
        }
        [Route("create-award")]
        public IHttpActionResult Post([FromBody] AwardDTO award)
        {
            if (award == null)
            {
                return BadRequest("User should be defined in request body");
            }
            var result = awardLogic.Create(award.Title, award.Description, award.Image.Image, award.Image.NamePhoto, award.Image.ContentType);
            return Created($"/api/UsersWebAPI/{result}", award);
        }
        [Route("award/{id:int}/edit")]
        public IHttpActionResult Put(int id, [FromBody] AwardDTO award)
        {
            var _award = awardLogic.GetAward(id);
            if (_award == null)
            {
                return NotFound();
            }
            awardLogic.ChangeAward(id, award.Title, award.Description);
            return Ok();
        }
        [Route("award/{id:int}/delete")]
        public IHttpActionResult Delete(int id)
        {
            var award = awardLogic.GetAward(id);
            if (award == null)
            {
                return NotFound();
            }
            awardLogic.Delete(id);
            return Ok();
        }
    }
}
