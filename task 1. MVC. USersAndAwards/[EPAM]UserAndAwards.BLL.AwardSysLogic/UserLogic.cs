namespace _EPAM_UserAndAwards.BLL.AwardSysLogic
{
    using _EPAM_UsersAndAwards.Interfaceses.BLL;
    using _EPAM_UsersAndAwards.Interfaceses.DAL;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using UsersAndAwards.Entities;

    public class UserLogic : IUserBLL
    {
        private IUserDAL UserDAL;

        public UserLogic(IUserDAL userDAL)
        {
            this.UserDAL = userDAL;
        }

        public bool AddAwardForUser(int idUser, int idAward)
        {
            return UserDAL.AddAwardForUser(idUser, idAward);
        }

        public bool ChangeUser(int id, string name, DateTime birthdate)
        {
            return UserDAL.ChangeUser(id, name, birthdate);
        }

        public int Create(string name, DateTime birthdate)
        {
            return UserDAL.Create(name, birthdate);
        }

        public bool Delete(int id)
        {
            return UserDAL.Delete(id);
        }

        public bool DeletePhoto(int id)
        {
            return UserDAL.DeletePhoto(id);
        }

        public bool DeleteUsersAward(int idUser, int idAward)
        {
            return UserDAL.DeleteUsersAward(idUser, idAward);
        }

        public IEnumerable<UserDTO> GetAllUser()
        {
            return UserDAL.GetAllUser().ToList();
        }

        public IEnumerable<AwardDTO> GetAllUsersAward(int id)
        {
            return UserDAL.GetAllUsersAward(id).ToList();
        }

        public UserDTO GetUser(int id)
        {
            return UserDAL.GetUser(id);
        }

        public bool LoadPhoto(int id, string photoName, byte[] photo, string photoType)
        {
            return UserDAL.LoadPhoto(id, photoName, photo, photoType);
        }
    }
}
