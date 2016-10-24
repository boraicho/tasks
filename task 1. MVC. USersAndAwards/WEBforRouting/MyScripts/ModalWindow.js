(function () {
    $(".image-award").on("click", $(".image-award"), function () {
        $.ajax({
            type: "GET",
            url: "/Awards/GetAward",
            data: {
                userId: $(this).val(),
            },
            success: function (data, statusText, jqXHR) {
                if (jqXHR.status == 200 && data != "") {
                    $(".modal").html();
                    $(".modal-body").append("<img width='100' height='100'/>");
                    $(".modal-body > img").attr('src', '@Url.Action("GetImage","Awards", new {id = ' + data.Login + '})');
                    $(".modal").modal("show");
                }
            }
        })
    })
})();

