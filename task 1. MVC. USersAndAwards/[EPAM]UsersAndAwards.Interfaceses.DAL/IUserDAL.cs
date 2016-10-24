namespace _EPAM_UsersAndAwards.Interfaceses.DAL
{
    using System;
    using System.Collections.Generic;
    using UsersAndAwards.Entities;

    public interface IUserDAL
    {
        IEnumerable<UserDTO> GetAllUser();
        IEnumerable<AwardDTO> GetAllUsersAward(int id);
        UserDTO GetUser(int id);
        int Create(string name, DateTime birthdate);
        bool ChangeUser(int id, string name, DateTime birthdate);
        bool LoadPhoto(int id, string photoName, byte[] photo, string photoType);
        bool DeletePhoto(int id);
        bool Delete(int id);
        bool AddAwardForUser(int idUser, int idAward);
        bool DeleteUsersAward(int idUser, int idAward);
    }
}
