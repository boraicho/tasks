namespace UsersAndAwards.ViewModels.Awards
{
    using System.ComponentModel.DataAnnotations;
    using System.Web;

    public class CreateAwardVM
    {
        [Required]
        [StringLength(50)]
        public string Title { get; set; }
        [Required]
        [StringLength(250)]
        public string Description { get; set; }
        [Required]
        public HttpPostedFileBase Image { get; set; }
    }
}