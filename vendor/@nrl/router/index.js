const express = require('express');
const path = require('path')
const route = express.Router()

const Route = (() => ({
    get(path, cb) {
        const callback = cbToFunction(cb)
        route.get(path, callback)
    },
    post(path, cb) {
        const callback = cbToFunction(cb)
        route.post(path, callback)
    },
    put(path, cb) {
        const callback = cbToFunction(cb)
        route.put(path, callback)
    },
    patch(path, cb) {
        const callback = cbToFunction(cb)
        route.patch(path, callback)
    },
    delete(path, cb) {
        const callback = cbToFunction(cb)
        route.delete(path, callback)
    },
    router: route
}))()

const cbToFunction = (cb) => {
    if (cb) {
        const [controller, fn] = cb.split('@')
        const {default: Controller} = require(path.join(__dirname, `../../../app/Http/controllers/${controller}`))
        const cn = new Controller();
        if (cn.__proto__.hasOwnProperty(fn)) {
            return ({req, res}) => cn[fn]({Request: req, Response: res})
        }
        return () => {
            throw new Error("function " + fn + "is not found in controller " + controller)
        }
    } else {
        throw new Error("cb is required")
    }
}

module.exports = Route
