namespace UsersAndAwards.ViewModels.Image
{
    using System.Web;

    public class LoadImageVM
    {
        public int IdUser { get; set; }
        public HttpPostedFileBase Image { get; set; }
    }
}