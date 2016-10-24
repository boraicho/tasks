namespace _EPAM_UsersAndAwards.DAL.DB
{
    public class SqlDALconfig
    {
        public SqlDALconfig(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
        public string ConnectionString { get; }
    }
}
