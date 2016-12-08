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

    $popUp
        .on('submit', '#add-form', function (e) {
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
        })

        .on('click', '#delete', function () {
            modalHide();
            storage.removeGoods(idDelete);
            getAllGoods();
        })

        .on('click', '#dont-delete', function () {
            modalHide();
        })

        .on('change', '#list', function () {
            var select = $("select option:selected").val(),
                data;
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
        })

        .on('change', '.radio-button', function () {
            var cities;
            country = $(this).val();
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
        })

        .on('change', '.all-checkbox', function () {
            $('input:checkbox').each(function () {
                this.checked = true;
            });
        })

        .on('focus', '#price', function () {
            $('#price').val('');
        })

        .on('input', '.only-number', function (e) {
            var val = $(this).val(),
                pattern = /[\D]/g;
            if (val.match(pattern)) {
                e.target.value = val.replace(pattern, '');
            }
        })

        .on('blur', '#add-form', function (e) {
            validation(e.target);
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

    $table.on('click', '.delete', function (e) {
        var data;
        idDelete = Number($(e.target).attr('data-id'));
        data = $html({
            attribute: 'delete'
        });
        modalShow();
        $popUp.html(data);
    })

        .on('click', '.edit', function (e) {
            idDelete = Number($(e.target).attr('data-id'));
            if (e.target.tagName === 'A') {
                e.preventDefault();
            }
            var product = _.filter(storage.store, function (product) {
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
        })

        .on('click', '#sort-name', function (e) {
            var $class = e.target.className;
            storage.store = _.sortBy(storage.store, ['goods', 'name']);
            if ($class === 'glyphicon glyphicon-triangle-top') {
                storage.store.reverse();
            }
            $('#sort-name').toggleClass('glyphicon-triangle-top');
            $('#sort-name').toggleClass('glyphicon-triangle-bottom');
            getAllGoods();
        })

        .on('click', '#sort-price', function (e) {
            var $class = e.target.className;
            storage.store = _.sortBy(storage.store, function (item) {
                return item.price;
            });
            if ($class === 'glyphicon glyphicon-triangle-top') {
                storage.store.reverse();
            }
            $('#sort-price').toggleClass('glyphicon-triangle-top');
            $('#sort-price').toggleClass('glyphicon-triangle-bottom');
            getAllGoods();
        });

    $blockScreen.on('click', function () {
        modalHide();
    });


    $('#filter').on('input', '#filter-text', function () {
        var val = $(this).val();
        getAllGoods(val);
    });

    function validation(target) {
        var $target = $(target),
            $dangerAlertClass = 'danger-alert',
            $nameError = $('#name-error'),
            $emailError = $('#email-error'),
            $countError = $('#count-error'),
            $priceError = $('#price-error');
        switch (target.id) {
            case 'name':
                if (target.value.length > 15) {
                    $nameError.html('Name must be between 1 and 15 characters');
                    $target.addClass($dangerAlertClass);
                    if (errors.indexOf('name') < 0) {
                        errors.push('name');
                    }
                }
                else if (target.value.trim() === '') {
                    $nameError.html('Name field must not be empty');
                    $target.addClass($dangerAlertClass);
                    if (errors.indexOf('name') < 0) {
                        errors.push('name');
                    }
                }
                else {
                    $nameError.html('');
                    $target.removeClass($dangerAlertClass);
                    errors = _.filter(errors, function (item) {
                        return item !== 'name';
                    });
                }
                break;
            case 'email':
                if (target.value.length === 0) {
                    $emailError.html('Email field must not be empty');
                    $target.addClass($dangerAlertClass);
                    if (errors.indexOf('email') < 0) {
                        errors.push('email');
                    }
                }
                else if (!validationEmail(target.value)) {
                    $emailError.html('Email is incorrect');
                    $target.addClass($dangerAlertClass);
                    if (errors.indexOf('email') < 0) {
                        errors.push('email');
                    }
                }
                else {
                    $emailError.html('');
                    $target.removeClass($dangerAlertClass);
                    errors = _.filter(errors, function (item) {
                        return item !== 'email';
                    });
                }
                break;
            case 'count':
                if (target.value.length === 0) {
                    $countError.html('Count field must not be empty');
                    $target.addClass($dangerAlertClass);
                    if (errors.indexOf('count') < 0) {
                        errors.push('count');
                    }
                }
                else {
                    $countError.html('');
                    $target.removeClass($dangerAlertClass);
                    errors = _.filter(errors, function (item) {
                        return item !== 'count';
                    });
                }
                break;
            case 'price':
                if (target.value.length === 0) {
                    $priceError.html('Price field must not be empty');
                    $target.addClass($dangerAlertClass);
                    if (errors.indexOf('price') < 0) {
                        errors.push('price');
                    }
                }
                else {
                    $target.removeClass($dangerAlertClass);
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

    function modalShow() {
        $('html').addClass('pop-up-show');
    }

    function modalHide() {
        $('html').removeClass('pop-up-show');
    }

    function getAllGoods(string) {
        var newStorage = _.cloneDeep(storage.store);
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
        storage.addGoods('Book1', '123321', 5, null, 'boraicho@epam.com');
        storage.addGoods('Book2', '113248', 4, null, 'boraicho@epam.com');
        storage.addGoods('Book3', '4564', 10, null, 'boraicho@epam.com');
        storage.addGoods('Book4', '4564124124', 10, null, 'boraicho@epam.com');
        storage.addDelivery('USA', ['New York', 'Los Angeles', 'Chicago']);
        storage.addDelivery('Russia', ['Saratov', 'Moscow', 'Samara']);
        storage.addDelivery('Japan', ['Tokyo ', 'Funabashi', 'Kagoshima']);
    }
})();