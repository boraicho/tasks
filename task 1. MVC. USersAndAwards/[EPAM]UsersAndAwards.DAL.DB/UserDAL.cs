namespace _EPAM_UsersAndAwards.DAL.DB
{
    using Entities;
    using Interfaceses.DAL;
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using UsersAndAwards.Entities;

    public class UserDAL : IUserDAL
    {
        SqlDALconfig config;
        public UserDAL(SqlDALconfig config)
        {
            this.config = config;
        }
        public bool AddAwardForUser(int idUser, int idAward)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "User_Add_Award";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@IdUser", idUser);
                    command.Parameters.AddWithValue("@IdAward", idAward);
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

        public bool ChangeUser(int id, string name, DateTime birthdate)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "User_Change";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Name", name);
                    command.Parameters.AddWithValue("@Birthdate", birthdate);
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
        public int Create(string name, DateTime birthdate)
        {
            int result =  0;
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "User_Add";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Name", name);
                    command.Parameters.AddWithValue("@Birthdate", birthdate);
                    connection.Open();
                    return result = (int)(decimal)command.ExecuteScalar();                   
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public bool Delete(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "User_Delete";
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

        public bool DeletePhoto(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "User_Photo_Delete";
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

        public bool DeleteUsersAward(int idUser, int idAward)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "User_Delete_Award";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@IdUser", idUser);
                    command.Parameters.AddWithValue("@IdAward", idAward);
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

        public IEnumerable<UserDTO> GetAllUser()
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlDataReader reader = null;
                try
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "User_Get_All";
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
                    byte[] photo = reader["Photo"] == DBNull.Value ? null : (byte[])reader["Photo"];
                    string namePhoto = reader["NamePhoto"] == DBNull.Value ? null : (string)reader["NamePhoto"];
                    string typePhoto = reader["TypePhoto"] == DBNull.Value ? null : (string)reader["TypePhoto"];
                    DateTime birthDate = (DateTime)reader["BirthDate"];
                    yield return new UserDTO
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        BirthDate = (DateTime)reader["BirthDate"],
                        Awards = GetAllUsersAward((int)reader["Id"]),
                        Photo = photo == null ? null : new ImageDTO(photo, namePhoto, typePhoto),
                    };
                }
            }
        }
        public IEnumerable<AwardDTO> GetAllUsersAward(int id)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlDataReader reader = null;
                try
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "User_Get_All_Award";
                    command.Parameters.AddWithValue("@Id", id);
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
                    yield return new AwardDTO
                    {
                        Id = (int)reader["IdAward"],
                        Title = (string)reader["Title"],
                        Description = (string)reader["Description"],
                        Image = null
                    };
                }
            }
        }
        public UserDTO GetUser(int id)
        {
            UserDTO user = null;
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlDataReader reader = null;
                try
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "User_Get_By_Id";
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
                    int _id = (int)reader["Id"];
                    string name = (string)reader["Name"];
                    DateTime birthDate = (DateTime)reader["BirthDate"];
                    string namePhoto = reader["NamePhoto"] == DBNull.Value ? null : (string)reader["NamePhoto"];
                    byte[] photo = reader["Photo"] == DBNull.Value ? null : (byte[])reader["Photo"];
                    string typePhoto = reader["TypePhoto"] == DBNull.Value ? null : (string)reader["TypePhoto"];
                    ImageDTO img = new ImageDTO(photo, namePhoto, typePhoto);
                    user = new UserDTO(id, name, birthDate, GetAllUsersAward(id), img);
                }
                return user;
            }
        }            
        public bool LoadPhoto(int idUser, string photoName, byte[] photo, string photoType)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(config.ConnectionString))
                {
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "User_Photo_Update";
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Photo", photo);
                    command.Parameters.AddWithValue("@Id", idUser);
                    command.Parameters.AddWithValue("@NamePhoto", photoName);
                    command.Parameters.AddWithValue("@TypePhoto", photoType);
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
    }
}
