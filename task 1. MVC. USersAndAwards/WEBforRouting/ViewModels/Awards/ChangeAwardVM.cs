namespace UsersAndAwards.ViewModels.Awards
{
    using System.ComponentModel.DataAnnotations;
    using System.Web;
    public class ChangeAwardVM
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Title { get; set; }
        [Required]
        [StringLength(250)]
        public string Description { get; set; }
        public HttpPostedFileBase Image { get; set; }
    }
}