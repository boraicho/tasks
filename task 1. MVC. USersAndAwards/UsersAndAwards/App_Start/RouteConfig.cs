namespace UsersAndAwards
{
    using System.Web.Mvc;
    using System.Web.Routing;
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


            routes.MapRoute(
                name: "DeleteUsersAward",
                url: "Users/DeleteUsersAward",
                defaults: new { controller = "Users", action = "DeleteUsersAward" }
            );

            routes.MapRoute(
                name: "LoadPhoto",
                url: "user-load-photo",
                defaults: new { controller = "Users", action = "LoadPhoto" }
            );

            routes.MapRoute(
                name: "AddAward",
                url: "user-add-award",
                defaults: new { controller = "Users", action = "AddAward" }
            );

            routes.MapRoute(
                name: "SaveInFile",
                url: "users/SaveUsersInFile",
                defaults: new { controller = "Users", action = "SaveUsersInFile" }
            );
            routes.MapRoute(
                name: "UsersStartOrEndWords",
                url: "users/{word}",
                defaults: new { controller = "Users", action = "GetUserByCrit" },
                constraints: new { word = @"[a-zA-Z]+" }
            );

            routes.MapRoute(
                name: "AwardFofUser",
                url: "award-user/{idUser}_{AllAwards}",
                defaults: new { controller = "Users", action = "AddAward" },
                constraints: new { idUser = @"[0-9]+", AllAwards = @"[0-9]+" }
            );

            routes.MapRoute(
                name: "UsersGetByName",
                url: "user/{name}",
                defaults: new { controller = "Users", action = "GetByName" },
                constraints: new { name = @"[a-zA-Z]+" }
            );

            routes.MapRoute(
                name: "AwardsGetByName",
                url: "award/{title}",
                defaults: new { controller = "Awards", action = "GetAwardByTitle" },
                constraints: new { word = @"[a-zA-Z]+([_]*[a-zA-Z]+)*" }
            );

            routes.MapRoute(
                name: "AwardsStartWord",
                url: "awards/{word}",
                defaults: new { controller = "Awards", action = "GetAwardByCrit" },
                constraints: new { word = @"[a-zA-Z]" }
            );

            routes.MapRoute(
                name: "AwardsStartOrEndWords",
                url: "awards/{word}",
                defaults: new { controller = "Awards", action = "GetAwardByCrit" },
                constraints: new { word = @"[a-zA-Z]+" }
            );

            routes.MapRoute(
                name: "Users",
                url: "users",
                defaults: new { controller = "Users", action = "Index"}
            );

            routes.MapRoute(
                name: "CreateUser",
                url: "create-user",
                defaults: new { controller = "Users", action = "Create" }
            );

            routes.MapRoute(
                name: "DeleteUser",
                url: "user/{id}/delete",
                defaults: new { controller = "Users", action = "Delete" },
                constraints: new { id = @"[0-9]+" }
            );

            routes.MapRoute(
                name: "EditUser",
                url: "user/{id}/edit",
                defaults: new { controller = "Users", action = "Change" },
                constraints: new { id = @"[0-9]+" }
            );

            routes.MapRoute(
                name: "Awards",
                url: "awards",
                defaults: new { controller = "Awards", action = "Index"}
            );

            routes.MapRoute(
                name: "CreateAward",
                url: "create-award",
                defaults: new { controller = "Awards", action = "Create" }
            );
            routes.MapRoute(
                name: "DeleteAward",
                url: "award/{id}/delete",
                defaults: new { controller = "Awards", action = "Delete" },
                constraints: new { id = @"[0-9]+" }
            );

            routes.MapRoute(
                name: "EditAward",
                url: "award/{id}/edit",
                defaults: new { controller = "Awards", action = "Change" },
                constraints: new { id = @"[0-9]+" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Users", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
