namespace UsersAndAwards.ViewModels.AppUser
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using _EPAM_UsersAndAwards.Entities;
    using Entities;
    using System.Collections.Generic;

    public class AppUsersVM
    {
        public int Id { get; set; }
        public IEnumerable<AwardDTO> Awards { get; set; }
        public string Name { get; set; }
        [Display(Name="Date of birth")]
        [DisplayFormat(DataFormatString = "{0:d}")]
        public DateTime Birthdate { get; set; }
        public int Age { get; set; }
        [Display(Name="Avatar")]
        public ImageDTO Photo { get; set; }
    }
}