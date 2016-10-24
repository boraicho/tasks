namespace _EPAM_UserAndAwards.BLL.AwardSysLogic
{
    using _EPAM_UsersAndAwards.Interfaceses.BLL;
    using _EPAM_UsersAndAwards.Interfaceses.DAL;
    using System.Collections.Generic;
    using System.Linq;
    using UsersAndAwards.Entities;

    public class AwardLogic : IAwardBLL
    {
        private IAwardDAL AwardDAL;
        public AwardLogic(IAwardDAL awardDAL)
        {
            this.AwardDAL = awardDAL;
        }

        public bool ChangeAward(int id, string title, string description)
        {
            return AwardDAL.ChangeAward(id, title, description);
        }

        public bool ChangeImage(int id, string nameImage, byte[] image, string contentType)
        {
            return AwardDAL.ChangeImage(id, nameImage, image, contentType);
        }

        public bool Create(string title, string description, byte[] image, string imageName, string imageType)
        {
            return AwardDAL.Create(title, description, image, imageName, imageType);
        }

        public bool Delete(int id)
        {
            return AwardDAL.Delete(id);
        }

        public IEnumerable<AwardDTO> GetAllAward()
        {
            return AwardDAL.GetAllAward().ToList();
        }

        public AwardDTO GetAward(int id)
        {
            return AwardDAL.GetAward(id);
        }
    }
}
