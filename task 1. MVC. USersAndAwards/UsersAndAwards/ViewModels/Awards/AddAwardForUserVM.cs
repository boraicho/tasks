namespace UsersAndAwards.ViewModels.Awards
{
    using Entities;
    using System.Collections.Generic;

    public class AddAwardForUserVM
    {
        public IEnumerable<AwardDTO> UserAwards { get; set; }
        public IEnumerable<AwardDTO> AllAwards { get; set; }
    }
}