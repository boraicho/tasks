namespace _EPAM_UserAndAwards.BLL.AwardSysLogic
{
    using _EPAM_UsersAndAwards.Interfaceses.BLL;
    using _EPAM_UsersAndAwards.Interfaceses.DAL;
    using _EPAM_UsersAndAwards.Entities;

    public class ImageLogic : IImageBLL
    {
        private IImageDAL ImageDAL;
        public ImageLogic(IImageDAL imageDAL)
        {
            this.ImageDAL = imageDAL;
        }

        public ImageDTO GetNoAvatarImage()
        {
            return ImageDAL.GetNoAvatarImage();
        }
    }
}
