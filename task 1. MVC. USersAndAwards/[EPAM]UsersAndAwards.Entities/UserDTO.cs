namespace UsersAndAwards.Entities
{
    using _EPAM_UsersAndAwards.Entities;
    using System;
    using System.Collections.Generic;

    public class UserDTO
    {
        public UserDTO() { }
        public UserDTO(int id ,string name, DateTime birthdate,  IEnumerable<AwardDTO> awards, ImageDTO photo)
        {
            Id = id;
            Name = name;
            BirthDate = birthdate;
            Awards = awards;
            Photo = photo;
        }

        private int id;
        private string name;
        private DateTime birthdate;
        private IEnumerable<AwardDTO> awards;
        private ImageDTO photo;
        public int Id
        {
            get { return id; }
            set { id = value; }
        } 
        public string Name
        {
            get { return name; }
            set { if (!string.IsNullOrWhiteSpace(value)) { name = value; } }
        }
        public DateTime BirthDate
        {
            get { return birthdate; }
            set
            {
                DateTime now = DateTime.Now;
                if (value > now && now.Year - value.Year > 150)
                {
                    throw new Exception();
                }
                else
                {
                    birthdate = value;
                }
            }
        }
        public int Age
        {
            get
            {
                DateTime nowDate = DateTime.Today;
                int age = nowDate.Year - birthdate.Year;
                if (birthdate > nowDate.AddYears(-age)) age--;
                return age;
            }
        }
        public IEnumerable<AwardDTO> Awards
        {
            get { return awards; }
            set { awards = value;  }
        }
        public ImageDTO Photo
        {
            get { return photo; }
            set { photo = value;}
        }
    }
}