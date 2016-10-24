namespace _EPAM_UsersAndAwards.Interfaceses.BLL
{
    using System;
    using System.Collections.Generic;
    using UsersAndAwards.Entities;

    public interface IAwardBLL
    {
        IEnumerable<AwardDTO> GetAllAward();
        AwardDTO GetAward(int id);
        bool Create(string title, string description, byte[] image, string imageName, string imageType);
        bool ChangeImage(int id, string nameImage, byte[] image, string contentType);
        bool ChangeAward(int id, string title, string description);
        bool Delete(int id);
    }
}
