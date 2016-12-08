function Storage() {
    'use strict';
    this.store = [];
    this.delivery = [];
}

Storage.prototype.addGoods = function (name, price, count, delivery, supplier) {
    var id,
        product = _.maxBy(this.store, function (product) {
            id = product.id;
        });
    if (_.isUndefined(id)) {
        id = 0;
    } else {
        id += 1;
    }
    this.store.push(new Goods(id, name, price, count, delivery, supplier));
};

Storage.prototype.removeGoods = function (id) {
    this.store = _.filter(this.store, function (product) {
        return product.id !== id;
    });
};

Storage.prototype.edit = function (id, name, price, count, delivery, supplier) {
    var product = _.remove(this.store, function (item) {
        return item.id === Number(id);
    });
    product[0].edit(id, name, price, count, delivery, supplier);
    this.store.push(product[0]);
};

Storage.prototype.addDelivery = function (country, sities) {
    this.delivery.push(new Delivery(country, sities));
}