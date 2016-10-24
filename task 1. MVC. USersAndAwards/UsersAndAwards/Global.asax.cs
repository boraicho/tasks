namespace UsersAndAwards
{
    using System.Web.Mvc;
    using System.Web.Routing;
    using App_Start;

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            AutoMapperConfig.RegisterMaps();
        }
    }
}
