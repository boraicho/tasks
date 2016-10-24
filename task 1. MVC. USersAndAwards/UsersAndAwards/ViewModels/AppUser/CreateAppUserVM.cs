namespace UsersAndAwards.ViewModels.AppUser
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class CreateAppUserVM
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        public DateTime Birthdate { get; set; }
    }
}