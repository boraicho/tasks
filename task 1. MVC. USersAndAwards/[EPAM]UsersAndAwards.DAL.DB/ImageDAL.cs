namespace _EPAM_UsersAndAwards.DAL.DB
{
    using Interfaceses.DAL;
    using System;
    using Entities;
    using System.Data.SqlClient;
    using System.Configuration;

    public class ImageDAL : IImageDAL
    {
        SqlDALconfig config;
        public ImageDAL(SqlDALconfig config)
        {
            this.config = config;
        }
        public ImageDTO GetNoAvatarImage()
        {
            ImageDTO img = null;
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlDataReader reader = null;
                try
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "Image_Get_No_Avatar";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", 0);
                    connection.Open();
                    reader = command.ExecuteReader();
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
                while (reader.Read())
                {
                    string namePhoto = reader["ImageName"] == DBNull.Value ? null : (string)reader["ImageName"];
                    byte[] photo = reader["Image"] == DBNull.Value ? null : (byte[])reader["Image"];
                    string typePhoto = reader["ImageType"] == DBNull.Value ? null : (string)reader["ImageType"];
                    img = new ImageDTO(photo, namePhoto, typePhoto);
                }
                return img;
            }
        }
    }
}
