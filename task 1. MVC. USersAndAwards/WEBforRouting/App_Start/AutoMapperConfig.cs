namespace UsersAndAwards.App_Start
{
    using AutoMapper;
    using Entities;
    using ViewModels.AppUser;

    public class AutoMapperConfig
    {
        public static void RegisterMaps()
        {
            Mapper.Initialize(cfg=>
            {
                cfg.CreateMap<UserDTO, AppUsersVM>();
            });

            Mapper.AssertConfigurationIsValid();
        }
    }
}