namespace UsersAndAwards.ViewModels.AppUser
{
    using System;
    using System.Web;
    using System.ComponentModel.DataAnnotations;
    public class ChangeAppUserVM
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        public DateTime Birthdate { get; set; }
        public HttpPostedFileBase Image { get; set; }
    }
}