namespace _EPAM_UsersAndAwards.DAL.DB
{
    using Entities;
    using Interfaceses.DAL;
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using UsersAndAwards.Entities;

    public class AwardDAL : IAwardDAL
    {
        SqlDALconfig config;
        public AwardDAL(SqlDALconfig config)
        {
            this.config = config;
        }
        public bool ChangeAward(int id, string title, string description)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "Award_Change";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", id);
                    command.Parameters.AddWithValue("@Title", title);
                    command.Parameters.AddWithValue("@Description", description);
                    connection.Open();
                    var result = command.ExecuteNonQuery();
                    if (result != 0) return false;
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return true;
        }
        public bool ChangeImage(int id, string imageName, byte[] image, string imageType)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "Award_Image_Update";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Image", image);
                    command.Parameters.AddWithValue("@Id", id);
                    command.Parameters.AddWithValue("@ImageName", imageName);
                    command.Parameters.AddWithValue("@ImageType", imageType);
                    connection.Open();
                    var result = command.ExecuteNonQuery();
                    if (result != 0) return false;
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return true;
        }
        public bool Create(string title, string description, byte[] image, string nameImage, string imageType)
        {
            if (string.IsNullOrWhiteSpace(title) && string.IsNullOrWhiteSpace(description)) return false;
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "Award_add";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Title", title);
                    command.Parameters.AddWithValue("@Description", description);
                    command.Parameters.AddWithValue("@Image", image);
                    command.Parameters.AddWithValue("@ImageName", nameImage);
                    command.Parameters.AddWithValue("@ImageType", imageType);
                    connection.Open();
                    var result = command.ExecuteNonQuery();
                    if (result != 0) return false;
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return true;
        }
        public bool Delete(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "Award_Delete";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", id);
                    connection.Open();
                    var result = command.ExecuteNonQuery();
                    if (result != 0) return false;
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return true;
        }

        public IEnumerable<AwardDTO> GetAllAward()
        {
            List<AwardDTO> awards = new List<AwardDTO>();
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlDataReader reader = null;
                try
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "Award_Get_All";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    connection.Open();
                    reader = command.ExecuteReader();
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
                while (reader.Read())
                {
                    byte[] image = reader["Image"] == DBNull.Value ? null : (byte[])reader["Image"];
                    string imageType = reader["ImageType"] == DBNull.Value ? null : (string)reader["ImageType"];
                    string imageName = reader["ImageName"] == DBNull.Value ? null : (string)reader["ImageName"];

                    yield return new AwardDTO
                    {
                        Id = (int)reader["Id"],
                        Title = (string)reader["Title"],
                        Description = (string)reader["Description"],
                        Image = new ImageDTO(image, imageName, imageType)
                    };
                }
            }
        }

        public AwardDTO GetAward(int id)
        {
            AwardDTO award = null;
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                SqlDataReader reader = null;
                try
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "Award_Get_By_Id";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", id);
                    connection.Open();
                    reader = command.ExecuteReader();
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
                while (reader.Read())
                {
                    int idAward = (int)reader["Id"];
                    string title = (string)reader["Title"];
                    string description = (string)reader["Description"];
                    byte[] image = reader["Image"] == DBNull.Value ? null : (byte[])reader["Image"];
                    string imageType = reader["ImageType"] == DBNull.Value ? null : (string)reader["ImageType"];
                    string imageName = reader["ImageName"] == DBNull.Value ? null : (string)reader["ImageName"];
                    ImageDTO img = new ImageDTO(image, imageName, imageType);
                    award = new AwardDTO(idAward, title, description, img);
                }
            }
            return award;
        }
    }
}
