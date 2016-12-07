(function () {
    'use strict';
    var storage = new Storage(),
        $add = $('#add-goods'),
        $table = $('#table'),
        $popUp = $('#pop-up'),
        $html = $('#grid-template').html().trim(),
        $selection = $('#selection').html().trim(),
        $country,
        errors = [],
        country,
        idDelete,
        $blockScreen = $('#block-screen');
    $html = _.template($html);
    $selection = _.template($selection);
    addFake();
    getAllGoods();

    $popUp.on('submit', '#add-form', function (e) {
        $("#add-form").find("input,select").not('[type="submit"]').each(function () {
            validation(this);
        });
        if (errors.length === 0) {
            var $id = $('#id').val(),
                $name = $('#name').val(),
                $price = moneyToNumber($('#price').val()),
                $count = $('#count').val(),
                $supplier = $('#email').val(),
                citiesChecked = [],
                delivery;
            $('input:checkbox:checked').each(function () {
                if (this.name !== 'All') {
                    citiesChecked.push(this.name);
                }
            });
            modalHide();
            delivery = new Delivery(country, citiesChecked);
            if ($id !== '') {
                storage.edit($id, $name, $price, $count, delivery, $supplier);
            }
            else {
                storage.addGoods($name, $price, $count, delivery, $supplier);
            }
            getAllGoods();
        }
        else {
            $(".danger-alert").first().focus();
        }
        e.preventDefault();
    });

    $popUp.on('click', function (e) {
        if (e.target.id === 'delete') {
            modalHide();
            storage.removeGoods(idDelete);
            getAllGoods();
        }
        else if(e.target.id === 'dont-delete') {
            modalHide();
        }
    });

    $popUp.on('change', function (e) {
        var select = $("select option:selected").val(),
            data;
        if (e.target.id === 'list') {
            switch (select) {
                case 'countries':
                    data = $selection({
                        attribute: 'countries',
                        storage: storage.delivery
                    });
                    $('#select').html(data);
                    break;
                case 'cities':
                    break;
            }
        }
        else if (e.target.name === 'radiobutton') {
            var cities;
            country = e.target.value;
            storage.delivery.forEach(function (delivery) {
                if (delivery.country === country) {
                    cities = delivery.cities;
                }
            });
            data = $selection({
                attribute: 'cities',
                cities: cities
            });
            $('#select').html(data);
        }
        else if (e.target.type === 'checkbox') {
            if (e.target.name === 'All') {
                $('input:checkbox').each(function () {
                    this.checked = true;
                });
            }
        }
    });

    $popUp.on('focus', '#price', function () {
        $('#price').val('');
    });

    $add.on('click', function () {
        var data = $html({
            attribute: 'add',
            id: undefined,
            name: undefined,
            price: undefined,
            count: undefined,
            delivery: undefined,
            supplier: undefined
        });
        modalShow();
        $popUp.html(data);
    });

    $table.on('click', function (event) {
        var e = event.target;
        idDelete = Number($(e).attr('data-id'));
        if (e.className === 'delete') {
            data = $html({
                attribute: 'delete'
            });
            modalShow();
            $popUp.html(data);
        }
        else if (e.className === 'edit' || e.tagName === 'A') {
            if(e.tagName === 'A'){
                event.preventDefault();
            }
            var product = _.filter(storage.storage, function (product) {
                return product.id === idDelete;
            }),
                data;
            data = $html({
                attribute: 'add',
                id: product[0].id,
                name: product[0].name,
                price: getMoney(product[0].price + ''),
                count: product[0].count,
                delivery: product[0].delivery,
                supplier: product[0].supplier
            });
            modalShow();
            $popUp.html(data);
        }
        else if (e.id === 'sort-name') {
            storage.storage = _.sortBy(storage.storage, ['goods', 'name']);
            if (e.className === 'glyphicon glyphicon-triangle-top') {
                storage.storage.reverse();
            }
            $('#sort-name').toggleClass('glyphicon-triangle-top');
            $('#sort-name').toggleClass('glyphicon-triangle-bottom');
            getAllGoods();
        }
        else if (e.id === 'sort-price') {
            storage.storage = _.sortBy(storage.storage, function (item) {
                return item.price;
            });
            if (e.className === 'glyphicon glyphicon-triangle-top') {
                storage.storage.reverse();
            }
            $('#sort-price').toggleClass('glyphicon-triangle-top');
            $('#sort-price').toggleClass('glyphicon-triangle-bottom');
            getAllGoods();
        }
    });

    $blockScreen.on('click', function () {
        modalHide();
    });

    $popUp.on('input', '#count', '#price', function (e) {
        var val = e.target.value,
            pattern = /^[\D]/g;
        if (val.match(pattern)) {
            e.target.value = val.replace(pattern, '');
        }
    });

    $popUp.on('blur', '#add-form', function (e) {
        validation(e.target);
    });

    $('#filter').on('input', '#filter-text', function (e) {
        var val = e.target.value;
        getAllGoods(val);
    })

    function validation(target) {
        switch (target.id) {
            case 'name':
                if (target.value.length > 15 || target.value.length === 0) {
                    $('#name-error').html('Name must be between 1 and 15 characters');
                    $(target).addClass('danger-alert');
                    if (errors.indexOf('name') < 0) {
                        errors.push('name');
                    }
                }
                else if (validationString(target.value)) {
                    $('#name-error').html('Name field must not be empty');
                    $(target).addClass('danger-alert');
                    if (errors.indexOf('name') < 0) {
                        errors.push('name');
                    }
                }
                else {
                    $('#name-error').html('');
                    $(target).removeClass('danger-alert');
                    errors = _.filter(errors, function (item) {
                        return item !== 'name';
                    });
                }
                break;
            case 'email':
                if (target.value.length === 0) {
                    $('#email-error').html('Email field must not be empty');
                    $(target).addClass('danger-alert');
                    if (errors.indexOf('email') < 0) {
                        errors.push('email');
                    }
                }
                else if (!validationEmail(target.value)) {
                    $('#email-error').html('Email is incorrect');
                    $(target).addClass('danger-alert');
                    if (errors.indexOf('email') < 0) {
                        errors.push('email');
                    }
                }
                else {
                    $('#email-error').html('');
                    $(target).removeClass('danger-alert');
                    errors = _.filter(errors, function (item) {
                        return item !== 'email';
                    });
                }
                break;
            case 'count':
                if (target.value.length === 0) {
                    $('#count-error').html('Count field must not be empty');
                    $(target).addClass('danger-alert');
                    if (errors.indexOf('count') < 0) {
                        errors.push('count');
                    }
                }
                else {
                    $('#count-error').html('');
                    $(target).removeClass('danger-alert');
                    errors = _.filter(errors, function (item) {
                        return item !== 'count';
                    });
                }
                break;
            case 'price':
                if (target.value.length === 0) {
                    $('#price-error').html('Price field must not be empty');
                    $(target).addClass('danger-alert');
                    if (errors.indexOf('price') < 0) {
                        errors.push('price');
                    }
                }
                else {
                    $(target).removeClass('danger-alert');
                    target.value = getMoney(target.value);
                    errors = _.filter(errors, function (item) {
                        return item !== 'price';
                    });
                }
                break;
        }
    }

    function getMoney(string) {
        var m = string.split('.');
        if (string.match(/^[$]/g)) {
            return string;
        }
        if (m[0].length % 3 === 0) {
            m[0] = '$' + m[0].match(/.{3}/g).join(',');
        }
        else {
            m[0] = '$' + m[0].substr(0, m[0].length % 3) + m[0].substr(m[0].length % 3).replace(/(\d{3})/g, ',\$1');
        }
        if (typeof m[1] == 'undefined') { return m; }
        return m.join('.');
    };

    function moneyToNumber(string) {
        var number = string.substr(1).split(',');
        return Number(number.join(''));
    }

    function validationEmail(email) {
        var pattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
        return pattern.test(email);
    }

    function validationString(string) {
        var pattern = / +/;
        return pattern.test(string);
    }

    function modalShow() {
        $blockScreen.show();
        $popUp.show();
    }

    function modalHide() {
        $blockScreen.hide();
        $popUp.hide();
    }

    function getAllGoods(string) {
        var newStorage = _.cloneDeep(storage.storage);
        _.each(newStorage, function (product) {
            product.price = getMoney(product.price + '');
        });
        if (string) {
            newStorage = _.filter(newStorage, function (item) {
                return item.name.toLowerCase().indexOf(string) !== -1;
            });
        }
        var data = $html({
            attribute: 'getAll',
            storage: newStorage
        });
        $('#goods').html(data);
    }

    function addFake() {
        storage.addGoods('Book1', '123321', 5);
        storage.addGoods('Book2', '113248', 4);
        storage.addGoods('Book3', '4564', 10);
        storage.addDelivery('USA', ['New York', 'Los Angeles', 'Chicago']);
        storage.addDelivery('Russia', ['Saratov', 'Moscow', 'Samara']);
        storage.addDelivery('Japan', ['Tokyo ', 'Funabashi', 'Kagoshima']);
    }
})();