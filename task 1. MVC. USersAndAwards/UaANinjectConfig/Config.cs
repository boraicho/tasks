namespace UaANinjectConfig
{
    using _EPAM_UsersAndAwards.DAL.DB;
    using _EPAM_UsersAndAwards.Interfaceses.BLL;
    using _EPAM_UsersAndAwards.Interfaceses.DAL;
    using Ninject;
    using System.Configuration;

    public static class Config
    {
        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        public static void RegisterServices(IKernel kernel)
        {
            kernel
                .Bind<SqlDALconfig>()
                .ToSelf()
                .InSingletonScope()
                .WithConstructorArgument("connectionString", ConfigurationManager.ConnectionStrings["default"].ConnectionString);

            kernel
                .Bind<IUserDAL>()
                .To<UserDAL>()
                .InSingletonScope();

            kernel
                .Bind<IImageDAL>()
                .To<ImageDAL>()
                .InSingletonScope();

            kernel
                .Bind<IAwardDAL>()
                .To<AwardDAL>()
                .InSingletonScope();

            kernel
                .Bind<IAwardBLL>()
                .To< _EPAM_UserAndAwards.BLL.AwardSysLogic.AwardLogic>()
                .InSingletonScope();

            kernel
                .Bind<IUserBLL>()
                .To<_EPAM_UserAndAwards.BLL.AwardSysLogic.UserLogic>()
                .InSingletonScope();

            kernel
                .Bind<IImageBLL>()
                .To<_EPAM_UserAndAwards.BLL.AwardSysLogic.ImageLogic>()
                .InSingletonScope();
        }
    }
}
