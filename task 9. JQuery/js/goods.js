'use strict';
function Goods(id, name, price, count, delivery, supplier) {
    this.id = id;
    this.name = name;
    this.price = Number(price);
    this.count = count;
    this.delivery = delivery;
    this.supplier = supplier;
}

Goods.prototype.edit = function(id, name, price, count, delivery, supplier) {
    this.id = Number(id);
    if (!_.isNull(name) && !_.isUndefined(name)) {
        this.name = name;
    }
    if (!_.isNull(price) && !_.isUndefined(price)) {
        this.price = Number(price);
    }
    if (!_.isNull(count) && !_.isUndefined(count)) {
        this.count = count;
    }
    this.delivery = delivery;
    if (!_.isNull(supplier) && !_.isUndefined(supplier)) {
        this.supplier = supplier;
    }
};
