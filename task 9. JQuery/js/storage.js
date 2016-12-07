'use strict';
function Storage() {
    this.storage = [];
    this.delivery = [];
}

Storage.prototype.addGoods = function(name, price, count, delivery, supplier) {
    var id,
        product = _.maxBy(this.storage, function(product) {
            id = product.id;
        });
    if (_.isUndefined(id)) {
        id = 0;
    } else {
        id += 1;
    }
    this.storage.push(new Goods(id, name, price, count, delivery, supplier));
};

Storage.prototype.removeGoods = function(id) {
    this.storage = _.filter(this.storage, function(product) {
        return product.id !== id;
    });
};

Storage.prototype.edit = function(id, name, price, count, delivery, supplier) {
    var product = _.remove(this.storage, function(item) {
        return item.id === Number(id);
    });
    product[0].edit(id, name, price, count, delivery, supplier);
    this.storage.push(product[0]);
};

Storage.prototype.addDelivery = function(country, sities) {
    this.delivery.push(new Delivery(country, sities));
}