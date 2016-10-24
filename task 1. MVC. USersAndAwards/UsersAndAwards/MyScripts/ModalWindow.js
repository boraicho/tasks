(function () {
    $('.image-award').on('click', $('.image-award'), function () {
        $.ajax({
            type: 'GET',
            url: '/Awards/GetAward/' + $(this).data('id'),
            /*data: {
                userId: $(this).data('id')
            }*/
        })
            .done((data) => {
                $('.modal').html();
                $('.modal-body > #title').text(data.Title);
                $('.modal-body > #description').text(data.Description);
                $('.modal').modal('show');
            });
    })
})();