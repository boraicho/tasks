namespace UsersAndAwards.MyHelpers
{
    using System.Web.Mvc;

    public static class LinksMenu
    {
        public static MvcHtmlString LinksMenuHelper(this HtmlHelper html)
        {
            TagBuilder div = new TagBuilder("div");
            div.AddCssClass("container");
            TagBuilder ul = new TagBuilder("ul");
            ul.AddCssClass("breadcrumb");
            foreach (var item in html.ViewContext.RouteData.Values)
            {
                TagBuilder li = new TagBuilder("li");
                TagBuilder a = new TagBuilder("a");
                a.MergeAttribute("href", item.Value.ToString());
                a.SetInnerText(item.Value.ToString());
                li.InnerHtml += a.ToString();
                ul.InnerHtml += li.ToString();
            }
            div.InnerHtml += ul.ToString();
            return new MvcHtmlString(div.ToString());
        }
    }
}